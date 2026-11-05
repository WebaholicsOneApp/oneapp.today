import type { Metadata } from "next";
import { PricingPageContent } from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "OneApp platform plans from $199/month. Choose Starter, Growth or Scale capacity for contacts, AI usage, AI voice minutes and synced products. Setup and growth services are separate.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return <PricingPageContent />;
}
