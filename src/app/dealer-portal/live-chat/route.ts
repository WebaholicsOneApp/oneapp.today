import { PUBLIC_DZONE_CHAT_KEY } from './embed-config';

// Isolate the existing widget in this page-owned frame, so leaving the dealer
// portal disposes its UI, timers and listeners. No new assistant or catalog.
export function GET() {
  return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>OneApp fitment chat</title><style>html,body{margin:0;height:100%;background:#f7f5f9;font-family:system-ui,sans-serif}p{padding:24px;color:#5c4968;font-size:14px;line-height:1.7}a{color:#8b26ca}</style></head><body><p id="loading" role="status">Opening OneApp’s fitment assistant…</p><script src="/dealer-portal/chat-widget.js" data-api-key="${PUBLIC_DZONE_CHAT_KEY}" data-title="OneApp Assistant" data-accent="#8b26ca" data-toolset="commerce" data-greeting="Hi! Tell me your bike’s year, make and model, and what parts you’re looking for. I’ll check the fitment data and help you find matching parts." data-placeholder="e.g. Brake pads for a 2022 Yamaha YZ250F" data-product-url-template="https://thed.zone/products/{slug}" data-teaser="off" onload="document.getElementById('loading').hidden=true;window.OneAppChat.open()" onerror="document.getElementById('loading').textContent='Chat is temporarily unavailable. Switch back to the example or try again shortly.'"></script></body></html>`, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
