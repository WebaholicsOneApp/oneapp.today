import { EXISTING_WIDGET_URL } from '../live-chat/embed-config';

// Serve the unchanged, first-party widget from this origin. Its existing API
// paths then use the fixed server-to-server transport below. UI, AI, catalog
// tools, fitment logic and sessions all remain the existing D-Zone chatbot.
export async function GET() {
  try {
    const response = await fetch(EXISTING_WIDGET_URL, { signal: AbortSignal.timeout(10_000), next: { revalidate: 3600 } });
    if (!response.ok || !response.headers.get('content-type')?.includes('javascript')) throw new Error('Widget unavailable');
    const source = await response.text();
    if (source.length > 200_000) throw new Error('Unexpected widget response');
    return new Response(source, { headers: { 'Content-Type': 'application/javascript; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=3600' } });
  } catch { return new Response('/* The chat widget is temporarily unavailable. */', { status: 502, headers: { 'Content-Type': 'application/javascript', 'Cache-Control': 'no-store' } }); }
}
