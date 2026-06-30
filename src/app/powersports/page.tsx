import type { Metadata } from "next";
import { PowersportsPageContent } from "./PowersportsClient";

export const metadata: Metadata = {
  title: "OneApp for Powersports Shops — One Parts Counter for Every Supplier",
  description:
    "Search parts, compare dealer cost, check availability, build quotes, and order across every distributor in one place. Smart restock, real lead times, and simple pricing for powersports shops.",
  keywords: [
    "powersports parts counter",
    "motorcycle parts software",
    "dealer cost comparison",
    "WPS Parts Unlimited Turn 14",
    "powersports shop management",
    "parts inventory restock",
  ],
};

export default function PowersportsPage() {
  return <PowersportsPageContent />;
}
