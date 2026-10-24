import '~/styles/globals.css';

import { type Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { AnalyticsConsent } from '~/components/AnalyticsConsent';
import { OneAppLiveChat } from '~/components/OneAppLiveChat';

const BASE_URL = 'https://www.oneapp.today';

function validTrackingId(value: string | undefined, pattern: RegExp) {
  const normalized = value?.trim();
  return normalized && pattern.test(normalized) ? normalized : undefined;
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'OneApp | An AI Workforce Platform for Business Growth',
    template: '%s | OneApp',
  },
  description:
    'An AI workforce platform built around your business. Connect customers, performance and daily work. Included for every Webaholics client.',
  keywords: [
    'AI workforce platform',
    'AI ecommerce platform',
    'business growth platform',
    'marketplace automation',
    'service business software',
    'product data automation',
    'business AI assistance',
    'multi-channel commerce platform',
    'OneApp',
    'Webaholics client platform',
  ],
  authors: [{ name: 'OneApp', url: BASE_URL }],
  creator: 'OneApp',
  publisher: 'OneApp',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'OneApp | An AI Workforce Platform for Business Growth',
    description:
      'Your business, your team and AI in one connected platform. Built for service businesses and commerce brands, with Webaholics support.',
    url: BASE_URL,
    siteName: 'OneApp',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/social/oneapp-ai-growth-engine-v2.png`,
        width: 1200,
        height: 630,
        alt: 'OneApp. AI Growth Engine for Commerce.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OneApp | An AI Workforce Platform for Business Growth',
    description:
      'Grow your business with an AI workforce platform built around your customers, performance and daily work.',
    images: [{ url: `${BASE_URL}/social/oneapp-ai-growth-engine-v2.png`, alt: 'OneApp. AI Growth Engine for Commerce.' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/Facebook-Profile.jpg', type: 'image/jpeg' }],
    shortcut: '/Facebook-Profile.jpg',
    apple: [{ url: '/Facebook-Profile.jpg' }],
  },
  alternates: {
    canonical: BASE_URL,
  },
  other: {
    'ai-content-declaration': 'This website describes OneApp, an AI workforce platform for service businesses and commerce brands.',
  },
};

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'OneApp',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/oneapp-logo.png`,
      },
      description:
        'OneApp is an AI workforce platform connecting websites, customers, performance and daily work for service businesses and commerce brands.',
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'OneApp',
      publisher: { '@id': `${BASE_URL}/#organization` },
      description:
        'An AI workforce platform built around your business, included for every Webaholics client.',
    },
    {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/#webpage`,
      url: BASE_URL,
      name: 'OneApp | An AI Workforce Platform for Business Growth',
      isPartOf: { '@id': `${BASE_URL}/#website` },
      about: { '@id': `${BASE_URL}/#organization` },
      description:
        'OneApp brings customers, analytics, goals and daily work into one workspace for your team and AI.',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'OneApp',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: BASE_URL,
      description:
        'An AI workforce platform combining business analytics, customer relationships, goals and AI-assisted workflows.',
      featureList: [
        'Analytics for sales, leads, marketing and business performance',
        'Goals and workflows for teams with AI assistance',
        'Websites, leads and customer relationship management',
        'AI-assisted conversations and customer follow-up',
      ],
      provider: { '@id': `${BASE_URL}/#organization` },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is OneApp?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OneApp is an AI workforce platform that connects your website, customers, performance and daily work so your team and AI can move growth forward together.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does OneApp help businesses grow?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OneApp helps your team see performance, manage customer relationships and coordinate work. AI assists with insights, content and next steps while your team guides decisions.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is OneApp software or a managed service?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OneApp is the platform. Webaholics is the team that helps configure it around your business and supports your team. Every Webaholics client gets access to OneApp.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who is OneApp built for?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OneApp is built for service businesses and commerce brands. The workspace adapts to the customers, performance measures and workflows that matter to each business.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gtmId = validTrackingId(process.env.NEXT_PUBLIC_GTM_ID, /^GTM-[A-Z0-9]+$/);
  const gaMeasurementId = validTrackingId(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, /^G-[A-Z0-9]+$/);

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrains.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <OneAppLiveChat />
        <AnalyticsConsent gtmId={gtmId} gaMeasurementId={gaMeasurementId} />
      </body>
    </html>
  );
}
