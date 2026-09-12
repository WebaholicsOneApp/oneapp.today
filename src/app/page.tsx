import type { Metadata } from "next";
import { OneAppPageContent } from "./HomeClient";
export const metadata: Metadata = {
 title: "OneApp | Connected Sites, Storefronts, Applications & AI",
 description: "Connect your sites, storefronts and custom applications to business data, workflows and AI. OneApp brings customer experiences and operations together.",
 openGraph: { title: "OneApp | Your business. Connected to AI.", description: "Sites, storefronts, applications and operations. One connected business platform." },
 twitter: { title: "OneApp | Your business. Connected to AI.", description: "Sites, storefronts, applications and operations. One connected business platform." }
};
export default function Home() { return <OneAppPageContent />; }
