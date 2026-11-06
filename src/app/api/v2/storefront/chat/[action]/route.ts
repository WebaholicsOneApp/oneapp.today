import { EXISTING_CHAT_API, PUBLIC_DZONE_CHAT_KEY } from '~/app/dealer-portal/live-chat/embed-config';
import { allowedChatAction, boundedBody, chatHeaders, sameOrigin } from '../transport';

export const maxDuration = 60;
type Context = { params: Promise<{ action: string }> };

async function relay(request: Request, context: Context) {
  const { action } = await context.params;
  if (!allowedChatAction(action, request.method)) return Response.json({ error: 'Unknown chat action' }, { status: 404 });
  if (!sameOrigin(request)) return Response.json({ error: 'Origin not allowed' }, { status: 403 });
  if (request.headers.get('x-storefront-api-key') !== PUBLIC_DZONE_CHAT_KEY) return Response.json({ error: 'Unknown chat widget' }, { status: 403 });
  let body: string | undefined;
  let headers: Headers;
  try {
    headers = chatHeaders(request, PUBLIC_DZONE_CHAT_KEY);
    if (request.method === 'POST') {
      body = await boundedBody(request);
      JSON.parse(body);
    }
  } catch { return Response.json({ error: 'Invalid chat message' }, { status: 400 }); }
  const target = new URL(action, EXISTING_CHAT_API);
  const after = new URL(request.url).searchParams.get('after');
  if (action === 'history' && after && /^\d{1,16}$/.test(after)) target.searchParams.set('after', after);
  try {
    const upstream = await fetch(target, {
      method: request.method, headers, body, cache: 'no-store', redirect: 'error',
      signal: AbortSignal.any([request.signal, AbortSignal.timeout(request.method === 'POST' ? 55_000 : 15_000)]),
    });
    return new Response(upstream.body, {
      status: upstream.status,
      headers: { 'Content-Type': upstream.headers.get('content-type') || 'application/json', 'Cache-Control': 'no-store, no-transform', 'X-Accel-Buffering': 'no' },
    });
  } catch { return Response.json({ error: 'Chat is temporarily unavailable. Please try again.' }, { status: 502 }); }
}

export { relay as GET, relay as POST };
