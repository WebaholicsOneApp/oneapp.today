import assert from 'node:assert/strict';
import test from 'node:test';
import { catalogRequest, imageFile, publicProducts } from '../src/app/api/dealer-fitment/catalog.ts';

const bike = { year: '2022', make: 'Yamaha', model: 'YZ250 F (4-Stroke)' };
const valid = { name: 'Brake pads', slug: 'brake-pads-123', imageUrl: 'https://oneappprodcentral.blob.core.windows.net/oneapp-images/brake-pads.png', selectedFitment: { ...bike, year: 2022, price: 3517, variation: 'Rear pads' }, supplierCost: 1000 };

test('catalog proxy fixes the host, exact fitment and result limit', () => {
  const { url } = catalogRequest(new URLSearchParams({ ...bike, action: 'products', search: 'brake pads', host: 'https://evil.example', limit: '1000', fitmentMode: 'all' }));
  assert.equal(url.origin, 'https://prod.oneapp.today');
  assert.equal(url.pathname, '/api/v2/storefront/products');
  assert.equal(url.searchParams.get('fitmentMode'), 'exact');
  assert.equal(url.searchParams.get('limit'), '6');
  assert.equal(url.searchParams.get('model'), bike.model);
});

test('rejects arbitrary routes and incomplete or oversized bike queries', () => {
  for (const params of [{ action: '../checkout' }, { action: 'products', year: '2022', make: 'Yamaha' }, { action: 'makes', year: '1800' }, { action: 'products', ...bike, search: 'a'.repeat(81) }]) assert.throws(() => catalogRequest(new URLSearchParams(params)));
});

test('only publishes confirmed fits for the selected bike', () => {
  const products = publicProducts([valid, { ...valid, selectedFitment: null }, { ...valid, selectedFitment: { ...valid.selectedFitment, year: 2021 } }, { ...valid, selectedFitment: { ...valid.selectedFitment, model: 'YZ 450 F' } }, { ...valid, selectedFitment: { ...valid.selectedFitment, make: 'Honda' } }], bike);
  assert.equal(products.length, 1);
  assert.equal(products[0].price, 3517);
  assert.equal('supplierCost' in products[0], false);
  const link = new URL(products[0].url);
  assert.equal(link.origin, 'https://thed.zone');
  assert.equal(link.searchParams.get('model'), bike.model);
  assert.equal(products[0].image, valid.imageUrl);
  assert.equal(publicProducts([{ ...valid, imageUrl: 'https://oneappprodcentral.blob.core.windows.net/oneapp-images/vortex_3727.png' }], bike)[0].image, '/dealer-portal/dzone-brake-pads.png');
});

test('never returns unsafe links or universal substitutes', () => {
  assert.deepEqual(publicProducts([{ ...valid, slug: '//evil.example' }, { name: 'Universal item', slug: 'item' }], bike), []);
  assert.deepEqual(publicProducts(null, bike), []);
  assert.equal(publicProducts(Array(30).fill(valid), bike).length, 6);
});

test('catalog cards accept only raster filenames under the fixed asset origin', () => {
  assert.equal(imageFile(valid.imageUrl), 'brake-pads.png');
  for (const url of ['https://evil.example/oneapp-images/a.png', 'https://oneappprodcentral.blob.core.windows.net/oneapp-images/../private/a.png', 'https://oneappprodcentral.blob.core.windows.net/oneapp-images/a.svg', 'https://oneappprodcentral.blob.core.windows.net/oneapp-images/%2e%2e/a.png', 'data:image/png;base64,aaa']) assert.equal(imageFile(url), null);
});
