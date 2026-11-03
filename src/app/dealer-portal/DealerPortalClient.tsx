'use client';

import { useEffect, useRef } from 'react';
import { dealerPortalMarkup } from './content';
import { initializeDealerPortal } from './interactions';

export function DealerPortalClient() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    return initializeDealerPortal(root.current);
  }, []);

  return (
    <div
      ref={root}
      className="dealer-portal-page"
      dangerouslySetInnerHTML={{ __html: dealerPortalMarkup }}
    />
  );
}
