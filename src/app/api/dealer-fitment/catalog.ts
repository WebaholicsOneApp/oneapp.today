const API_ROOT = 'https://prod.oneapp.today/api/v2/storefront/';
export const IMAGE_ROOT = 'https://oneappprodcentral.blob.core.windows.net/oneapp-images/';

export type Bike = { year: string; make: string; model: string };
export type FitmentProduct = { name: string; url: string; image: string | null; brand: string; variant: string; price: number | null };

export function catalogRequest(params: URLSearchParams) {
  const action = params.get('action') || 'products';
  if (!['years', 'makes', 'models', 'products'].includes(action)) throw new Error('Choose a valid search.');
  const year = params.get('year') || '';
  const make = (params.get('make') || '').trim();
  const model = (params.get('model') || '').trim();
  const search = (params.get('search') || '').trim();
  if (action !== 'years' && (!/^\d{4}$/.test(year) || +year < 1900 || +year > 2100)) throw new Error('Choose a valid year.');
  if (['models', 'products'].includes(action) && (!make || make.length > 80)) throw new Error('Choose a make.');
  if (action === 'products' && (!model || model.length > 120)) throw new Error('Choose a model.');
  if (search.length > 80) throw new Error('Keep the part search under 80 characters.');
  // Fixed read-only endpoints and tenant; callers cannot supply a host, key,
  // product IDs, price settings, or write operations.
  const url = new URL(action === 'products' ? 'products' : `fitment/${action}`, API_ROOT);
  url.searchParams.set('type', 'dirt_bike');
  if (action !== 'years') url.searchParams.set('year', year);
  if (['models', 'products'].includes(action)) url.searchParams.set('make', make);
  if (action === 'products') {
    url.searchParams.set('model', model);
    url.searchParams.set('fitmentMode', 'exact');
    url.searchParams.set('limit', '6');
    if (search) url.searchParams.set('search', search);
  }
  return { action, url, bike: { year, make, model } };
}

export function imageFile(value: unknown) {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    const file = url.pathname.slice('/oneapp-images/'.length);
    return url.href.startsWith(IMAGE_ROOT) && /^[a-zA-Z0-9_-][a-zA-Z0-9_. -]{0,220}\.(png|jpe?g|webp)$/i.test(file) && !file.includes('..') ? file : null;
  } catch { return null; }
}

export function publicProducts(data: unknown, bike: Bike): FitmentProduct[] {
  if (!Array.isArray(data)) return [];
  return data.slice(0, 6).flatMap(product => {
    const fit = product?.selectedFitment;
    // Fail closed if a catalogue version omits the confirmed fitment overlay.
    // Never relabel universal items or an unrelated vehicle as an exact fit.
    if (!fit || String(fit.year) !== bike.year || typeof fit.make !== 'string' || fit.make.toLowerCase() !== bike.make.toLowerCase() || typeof fit.model !== 'string' || fit.model.toLowerCase() !== bike.model.toLowerCase()) return [];
    if (typeof product.name !== 'string' || typeof product.slug !== 'string' || !/^[a-zA-Z0-9_-]{1,240}$/.test(product.slug)) return [];
    const url = new URL(`/products/${product.slug}`, 'https://thed.zone');
    Object.entries(bike).forEach(([key, value]) => url.searchParams.set(key, value));
    url.searchParams.set('type', 'dirt_bike');
    const image = imageFile(product.imageUrl);
    const savedImages: Record<string, string> = { 'vortex_3727.png': '/dealer-portal/dzone-brake-pads.png', 'import_vor_19_520_ste_fro_spr_1791322989697.jpg': '/dealer-portal/dzone-front-sprocket.jpg' };
    return [{ name: product.name.slice(0, 180), url: url.href, image: image ? savedImages[image] || `${IMAGE_ROOT}${encodeURIComponent(image)}` : null, brand: String(product.brandName || '').slice(0, 60), variant: String(fit.variation || '').slice(0, 150), price: typeof fit.price === 'number' && Number.isFinite(fit.price) && fit.price > 0 ? fit.price : null }];
  });
}
