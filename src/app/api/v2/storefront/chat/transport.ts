const METHODS: Record<string, string> = { message: 'POST', history: 'GET', availability: 'GET', 'request-human': 'POST', 'page-view': 'POST' };

export function allowedChatAction(action: string, method: string) {
  return Object.hasOwn(METHODS, action) && METHODS[action] === method;
}

export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  return !origin || origin === new URL(request.url).origin;
}

export function chatHeaders(request: Request, publicKey: string) {
  const headers = new Headers({ 'Content-Type': 'application/json', 'X-Storefront-Api-Key': publicKey });
  const session = request.headers.get('x-chat-session');
  if (session) {
    if (!/^[A-Za-z0-9._~-]{1,512}$/.test(session)) throw new Error('Invalid chat session');
    headers.set('X-Chat-Session', session);
  }
  // Do not forward browser cookies, OneApp account authorization, or other
  // tenant keys. The existing API authenticates this server client with the
  // same public storefront embed key; visitor sessions remain separate.
  return headers;
}

export async function boundedBody(request: Request) {
  if (!request.body) return '';
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.length;
      if (length > 16_384) { await reader.cancel(); throw new Error('Message is too long'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return Buffer.concat(chunks).toString('utf8');
}
