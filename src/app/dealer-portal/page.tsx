import type { Metadata } from 'next';
import { DealerPortalClient } from './DealerPortalClient';
import './dealer-portal.css';

const title = 'OneApp Dealer Portal | Dropshipping for Your Dealer Network';
const description =
  'Explore a OneApp dealer portal pilot: branded retail and wholesale ordering, direct customer delivery, fulfillment workflows, and an editable growth forecast.';
const url = 'https://www.oneapp.today/dealer-portal';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
};

export default function DealerPortalPage() {
  return <DealerPortalClient />;
}
