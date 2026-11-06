import assert from 'node:assert/strict';
import test from 'node:test';
import { allowedChatAction, boundedBody, chatHeaders, sameOrigin } from '../src/app/api/v2/storefront/chat/transport.ts';

test('transport only accepts the existing chatbot actions and methods', () => {
  assert.equal(allowedChatAction('message', 'POST'), true);
  assert.equal(allowedChatAction('history', 'GET'), true);
  assert.equal(allowedChatAction('availability', 'GET'), true);
  for (const [action, method] of [['message', 'GET'], ['checkout', 'POST'], ['../config', 'GET'], ['constructor', 'GET']]) assert.equal(allowedChatAction(action, method), false);
});

test('cross-site browser requests are rejected', () => {
  const url = 'https://www.oneapp.today/api/v2/storefront/chat/message';
  assert.equal(sameOrigin(new Request(url, { headers: { Origin: 'https://www.oneapp.today' } })), true);
  assert.equal(sameOrigin(new Request(url, { headers: { Origin: 'https://other.example' } })), false);
});

test('only the fixed public embed key and visitor session reach the chatbot', () => {
  const request = new Request('https://www.oneapp.today', { headers: { Authorization: 'private-account-token', Cookie: 'private-cookie', 'X-Storefront-Api-Key': 'another-store', 'X-Chat-Session': 'visitor-session' } });
  const headers = chatHeaders(request, 'existing-public-widget-id');
  assert.equal(headers.get('X-Storefront-Api-Key'), 'existing-public-widget-id');
  assert.equal(headers.get('X-Chat-Session'), 'visitor-session');
  assert.equal(headers.has('Authorization'), false);
  assert.equal(headers.has('Cookie'), false);
});

test('invalid visitor sessions are rejected', () => {
  assert.throws(() => chatHeaders(new Request('https://www.oneapp.today', { headers: { 'X-Chat-Session': 'x'.repeat(513) } }), 'public-widget-id'));
});

test('message bodies are bounded before forwarding', async () => {
  assert.equal(await boundedBody(new Request('https://www.oneapp.today', { method: 'POST', body: '{"message":"2022 Yamaha YZ250F"}' })), '{"message":"2022 Yamaha YZ250F"}');
  await assert.rejects(boundedBody(new Request('https://www.oneapp.today', { method: 'POST', body: 'x'.repeat(16_385) })), /too long/);
});
