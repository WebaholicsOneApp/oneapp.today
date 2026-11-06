import { NextResponse } from 'next/server';
import { catalogRequest, publicProducts } from './catalog';

export async function GET(request: Request) {
  let query;
  try { query = catalogRequest(new URL(request.url).searchParams); }
  catch (error) { return NextResponse.json({ error: (error as Error).message }, { status: 400 }); }
  const key = process.env.ONEAPP_DEALER_FITMENT_API_KEY?.trim();
  if (!key || !/^sf_[a-f0-9]{64}$/.test(key)) {
    return NextResponse.json({ error: 'Live fitment search is temporarily unavailable. Please try again shortly.' }, { status: 503 });
  }
  try {
    const response = await fetch(query.url, {
      headers: { 'X-Storefront-Api-Key': key, Accept: 'application/json' },
      signal: AbortSignal.timeout(15_000), cache: 'no-store',
    });
    if (!response.ok) throw new Error('Catalog unavailable');
    const data = await response.json();
    if (query.action === 'products') {
      if (!Array.isArray(data.data)) throw new Error('Invalid catalog response');
      return NextResponse.json({ products: publicProducts(data.data, query.bike) });
    }
    const values = data[query.action];
    if (!Array.isArray(values)) throw new Error('Invalid options response');
    const options = query.action === 'years'
      ? values.filter((v: unknown) => Number.isInteger(v) && Number(v) >= 1900 && Number(v) <= 2100).map(String)
      : values.filter((v: unknown) => typeof v === 'string' && v.length <= 120);
    return NextResponse.json({ options: options.slice(0, 500) });
  } catch {
    return NextResponse.json({ error: 'The catalog is taking a little longer. Please try again.' }, { status: 502 });
  }
}
