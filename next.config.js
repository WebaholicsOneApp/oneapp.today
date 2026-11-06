const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://staging.oneapp.today https://prod.oneapp.today",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://images.unsplash.com https://www.google-analytics.com https://www.googletagmanager.com",
      "font-src 'self' data:",
      "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://staging.oneapp.today https://prod.oneapp.today",
      "frame-src https://www.googletagmanager.com",
      'upgrade-insecure-requests',
    ].join('; '),
  },
];

/** @type {import("next").NextConfig} */
const config = {
  trailingSlash: false,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        source: '/api/(.*)',
        headers: [{ key: 'Cache-Control', value: 'no-store, max-age=0' }],
      },
      {
        source: '/dealer-portal',
        headers: securityHeaders.filter(header => header.key === 'Content-Security-Policy').map(header => ({
          ...header, value: header.value.replace('frame-src https:', "frame-src 'self' https:"),
        })),
      },
      {
        source: '/dealer-portal/live-chat',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy', value: "default-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'; font-src 'self' data:; frame-ancestors 'self'; base-uri 'none'; object-src 'none'; form-action 'none'" },
        ],
      },
    ];
  },

  images: {
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'oneapp.today',
      },
      {
        protocol: 'https',
        hostname: 'www.oneapp.today',
      },
    ],
  },
};

export default config;
