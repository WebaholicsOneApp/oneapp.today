import Script from 'next/script';

const DEFAULT_WIDGET_URL = 'https://prod.oneapp.today/widgets/storefront-chat.js';
const ALLOWED_WIDGET_URLS = new Set([
  DEFAULT_WIDGET_URL,
  'https://staging.oneapp.today/widgets/storefront-chat.js',
]);

function validWidgetUrl(value: string | undefined) {
  const candidate = value?.trim() || DEFAULT_WIDGET_URL;
  return ALLOWED_WIDGET_URLS.has(candidate) ? candidate : null;
}

function validStorefrontKey(value: string | undefined) {
  const candidate = value?.trim();
  return candidate && /^sf_[a-f0-9]{64}$/.test(candidate) ? candidate : null;
}

/**
 * Loads OneApp's own storefront assistant only when a valid, environment-bound
 * public widget key is configured. Preview and Production use separate keys.
 */
export function OneAppLiveChat() {
  const apiKey = validStorefrontKey(process.env.NEXT_PUBLIC_ONEAPP_CHAT_API_KEY);
  const widgetUrl = validWidgetUrl(process.env.NEXT_PUBLIC_ONEAPP_CHAT_WIDGET_URL);

  if (!apiKey || !widgetUrl) return null;

  return (
    <Script
      id="oneapp-live-chat"
      src={widgetUrl}
      strategy="afterInteractive"
      data-api-key={apiKey}
      data-accent="#8b26ca"
      data-title="Chat with OneApp"
      data-toolset="agency"
      data-placeholder="Ask about OneApp..."
      data-greeting="Hi! I'm OneApp's AI assistant. I can help explain the platform and how to get started with Webaholics. What would you like to know?"
      data-offset-bottom="20"
      data-offset-bottom-mobile="88"
    />
  );
}
