'use client';

import { useEffect, useRef } from 'react';
import { dealerPortalMarkup } from './content';
import { initializeDealerPortal } from './interactions';
import { DZoneFitmentShowcase } from './DZoneFitmentShowcase';

const mainTag = '<main id="main">';
const mainStart = dealerPortalMarkup.indexOf(mainTag);
const mainEnd = dealerPortalMarkup.indexOf('</main>');
const showcaseStart = dealerPortalMarkup.indexOf('<section class="visual-section board-section"');
const header = dealerPortalMarkup.slice(0, mainStart);
const storefront = dealerPortalMarkup.slice(mainStart + mainTag.length, showcaseStart);
const fulfillmentAndPilot = dealerPortalMarkup.slice(showcaseStart, mainEnd);
const footer = dealerPortalMarkup.slice(mainEnd + '</main>'.length);

export function DealerPortalClient() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    return initializeDealerPortal(root.current);
  }, []);

  return (
    <div ref={root} className="dealer-portal-page">
      <div dangerouslySetInnerHTML={{ __html: header }} />
      <main id="main">
        <div dangerouslySetInnerHTML={{ __html: storefront }} />
        <DZoneFitmentShowcase />
        <div dangerouslySetInnerHTML={{ __html: fulfillmentAndPilot }} />
      </main>
      <div dangerouslySetInnerHTML={{ __html: footer }} />
    </div>
  );
}
