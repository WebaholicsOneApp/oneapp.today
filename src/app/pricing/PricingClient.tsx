"use client";

import {
  ArrowRight, CalendarDays, Check, ChevronDown, CreditCard, FileText, Globe, LayoutGrid,
  MessageCircle, MessagesSquare, Package, Phone, Receipt, Search, Smartphone, Sparkles,
  Store, Truck, UserPlus, Users, Workflow, type LucideIcon,
} from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { FinalCta, Navigation, SiteFooter } from "../HomeClient";

type Offer = "service" | "ecommerce" | "custom-app";

const offers: { key: Offer; label: string }[] = [
  { key: "service", label: "Service" },
  { key: "ecommerce", label: "Ecommerce" },
  { key: "custom-app", label: "Custom App" },
];

const plans = [
  { name: "Starter", price: 199, contacts: 5000, skus: 1000, ai: 1000, voice: 100, sites: 1, support: "Email support" },
  { name: "Growth", price: 299, contacts: 25000, skus: 5000, ai: 3000, voice: 300, sites: 3, support: "Priority support" },
  { name: "Scale", price: 499, contacts: 100000, skus: 20000, ai: 10000, voice: 750, sites: 10, support: "Priority support" },
];

const subtitles: Record<Offer, string[]> = {
  service: ["Connect your daily work", "Room for a growing client base", "Keep a busy business connected"],
  ecommerce: ["Start selling with confidence", "Room for a growing catalog", "Keep a busy business connected"],
  "custom-app": ["A home for your custom app", "Room for a growing user base", "Capacity for a busier app"],
};

const capacityNotes: Record<Offer, string> = {
  service: "Same software prices. Choose capacity for your customer base and AI usage.",
  ecommerce: "*SKU allowances count active, synchronized products. Stored supplier catalogs are separate.",
  "custom-app": "*SKU allowances apply when ecommerce is enabled. Custom builds are quoted separately.",
};

const overviews: Record<Offer, { title: string; copy: string; features: [LucideIcon, string, string][] }> = {
  service: {
    title: "Your service business, connected.",
    copy: "From the first enquiry to bookings, payments and follow-up.",
    features: [
      [UserPlus, "Leads", "See the next step for every enquiry."],
      [Users, "Clients", "Keep customer details together."],
      [CalendarDays, "Bookings", "Make it easier to book a time."],
      [MessagesSquare, "Messages", "Email and text in one place."],
      [Receipt, "Invoices", "Connect the work and the payment."],
      [Sparkles, "AI workforce", "Help with replies and follow-ups."],
    ],
  },
  ecommerce: {
    title: "Your store, connected.",
    copy: "Bring your storefront, team and customers into one workspace.",
    features: [
      [Store, "Storefront", "Your brand. Your online store."],
      [Package, "Products", "Keep your catalog organized."],
      [Truck, "Orders", "Follow each order through delivery."],
      [Users, "Customers", "Know who you’re selling to."],
      [MessagesSquare, "Messages", "Keep customer conversations together."],
      [Sparkles, "AI workforce", "Help with content and everyday tasks."],
    ],
  },
  "custom-app": {
    title: "Your app, connected.",
    copy: "OneApp beneath your own customer experience. Custom builds are scoped separately.",
    features: [
      [LayoutGrid, "Custom screens", "Designed around your workflow."],
      [Smartphone, "Mobile web app", "Your app, wherever customers are."],
      [Globe, "Your website", "A home for your brand."],
      [MessageCircle, "AI texting", "Helpful replies and follow-ups."],
      [CreditCard, "Payments", "Let customers pay in your app."],
      [CalendarDays, "Bookings", "Connect appointments and calendars."],
    ],
  },
};

const essentials = ["Live AI chat", "AI assistant", "Reports & insights", "Customer CRM", "Unified inbox", "Tasks & teamwork", "Invoices & payments", "Business knowledge"];

const toolkits: Record<Offer, { title: string; items: string[]; note?: string }[]> = {
  service: [{ title: "For your service business", items: ["Website & content", "Lead pipeline", "Bookings & forms", "Follow-up workflows", "Service reports"] }],
  ecommerce: [{ title: "For your online business", items: ["Store & checkout", "Products & inventory", "Orders, shipping & returns", "Marketplace listings", "Pricing tools", "Sales & margin reports"] }],
  "custom-app": [
    { title: "Choose your business tools", note: "Service, ecommerce, or both.", items: ["Service toolkit", "Ecommerce toolkit"] },
    { title: "Custom implementation · separate proposal", items: ["Branded portal", "Custom screens", "Mobile web app", "Tailored workflows", "Connected systems", "Custom reporting"] },
  ],
};

const aiExamples: { icon: LucideIcon; title: string; copy: string; scene: string[] }[] = [
  { icon: Phone, title: "Handle a call", copy: "Answer common questions and capture the details for follow-up.", scene: ["“I’d like to book a consultation.”", "✓ Booking request captured"] },
  { icon: MessageCircle, title: "Reply to a message", copy: "Help customers with a quick answer based on your business information.", scene: ["What time do you open tomorrow?", "We open at 9am. How can we help?"] },
  { icon: Workflow, title: "Run an automation", copy: "Turn a new enquiry into a follow-up draft and a task for your team.", scene: ["New enquiry → Draft a follow-up", "✓ Add a task for your team"] },
  { icon: Globe, title: "Update your site", copy: "Prepare a change to your hours, services or homepage for review.", scene: ["“Add our new Saturday hours.”", "Now open Saturdays · 9am–1pm"] },
  { icon: Search, title: "Improve product SEO", copy: "Suggest clearer product titles, descriptions and search snippets.", scene: ["Before: Trail Bottle", "After: Trail Bottle | 750ml Insulated Water Bottle"] },
  { icon: FileText, title: "Draft a blog post", copy: "Turn an idea into a first draft, ready for your review and finishing touches.", scene: ["Draft", "How to choose your everyday water bottle"] },
];

const countingRules: [string, string][] = [
  ["Active synced SKUs", "sellable products whose listings, prices or inventory are actively managed by OneApp. Each variant counts once across channels. Archived items and stored, reference-only supplier catalogs do not count. This is software activity; human catalog work is separately scoped."],
  ["Orders", "there is no monthly order-count quota. AI, messaging and specialist processing still have their own allowances or agreed terms."],
  ["Contacts", "unique stored customer records, including past customers. Merged duplicates count once."],
  ["AI", "monthly weighted usage units across chat, content and workflows. More demanding models can use more units; one unit does not equal one finished task. Voice has its own minute allowance; SMS and other provider charges are separate."],
];

const voiceNotes: [string, string][] = [
  ["Additional standard minutes: $0.35/minute.", "Extra usage requires an agreed budget or top-up before it is enabled. Monthly allowances reset without rollover."],
  ["What a minute covers:", "standard AI conversation processing and standard US local call time while the AI agent is active. Phone numbers, SMS, international or premium destinations, human transfers and premium voice/model options are separate. Setup and managed call-flow work are separately scoped."],
  ["One voice conversation, one voice meter.", "The live conversation counts in minutes without also charging text AI units for that same processing. Separate follow-up automations can use their own AI units."],
];

const faqs: [string, string][] = [
  ["How do new customers get started?", "New customers start through Webaholics onboarding. You choose your OneApp plan, then review any setup or migration costs. An ongoing agency agreement is optional."],
  ["Is a custom app build included in $199 / $299 / $499?", "These prices cover OneApp platform access and capacity. Custom design, screens, integrations, migration and development have a separate proposal. Choosing Custom App shows the capabilities that can be configured or built, not an included development allowance."],
  ["What is separate from the monthly platform price?", "Setup, bespoke development, ongoing growth services, site hosting, voice above the included allowance, SMS and external provider charges. AI usage beyond the included allowance also needs an agreed overage rate. No unlimited usage is implied."],
  ["Does a higher software plan change my agency fee?", "No. The platform plan follows your usage. Webaholics pricing follows your agreed scope and results. You can have a higher agency fee while using Starter software, or Scale software without ongoing agency services."],
];

const count = (value: number) => value.toLocaleString("en-US");
const offerLabel = (offer: Offer) => offers.find((item) => item.key === offer)?.label;

function OfferPicker({ offer, onChange }: { offer: Offer; onChange: (offer: Offer) => void }) {
  return (
    <div role="group" aria-label="Choose your business type" className="mt-10 inline-flex rounded-full border border-white/15 bg-white/[0.04] p-1">
      {offers.map(({ key, label }) => (
        <button key={key} type="button" aria-pressed={offer === key} onClick={() => onChange(key)} className={`rounded-full px-4 py-2.5 text-sm font-semibold transition sm:px-6 ${offer === key ? "bg-white text-[#0b0a10]" : "text-white/60 hover:text-white"}`}>{label}</button>
      ))}
    </div>
  );
}

function PlanItem({ children }: { children: ReactNode }) {
  return <li className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#69f7d3]" /><span>{children}</span></li>;
}

function PlanCards({ offer }: { offer: Offer }) {
  const commerce = offer !== "service";
  const linkClass = "underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white/60";
  return (
    <div className="mt-14 grid gap-5 text-left lg:grid-cols-3">
      {plans.map((plan, index) => {
        const featured = index === 1;
        return (
          <article key={plan.name} className={`flex flex-col rounded-[28px] border p-7 sm:p-9 ${featured ? "border-[#c153ff]/50 bg-gradient-to-b from-[#24163a] to-[#15121b] shadow-[0_0_90px_rgba(184,80,255,.18)]" : "border-white/10 bg-[#15121b]"}`}>
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-2xl font-bold tracking-[-.04em]">{plan.name}</h3>
              {featured && <span className="rounded-full bg-[#c153ff]/15 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[.15em] text-[#e0a3ff]">Room to grow</span>}
            </div>
            <p className="mt-2 text-sm text-white/50">{subtitles[offer][index]}</p>
            <p className="mt-8 flex items-baseline gap-1"><span className="text-6xl font-bold tracking-[-.06em]">${plan.price}</span><span className="text-sm font-semibold text-white/45">/month</span></p>
            <ul className="mt-8 space-y-3.5 border-t border-white/10 pt-7 text-sm text-white/65">
              {commerce && <PlanItem><strong className="text-white">{count(plan.skus)}</strong> active synced SKUs*</PlanItem>}
              <PlanItem><strong className="text-white">{count(plan.contacts)}</strong> stored contacts</PlanItem>
              <PlanItem><a href="#ai-workforce" className={linkClass}><strong className="text-white">{count(plan.ai)}</strong> AI usage units / month</a></PlanItem>
              <PlanItem><a href="#voice" className={linkClass}><strong className="text-white">{count(plan.voice)}</strong> AI voice minutes / month</a></PlanItem>
              <PlanItem>Live AI chat, CRM &amp; reports</PlanItem>
            </ul>
            <div className="mt-auto pt-8">
              <p className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs"><span className="text-white/45">Platform help</span><strong className="font-semibold text-white">{plan.support}</strong></p>
              <a href="#demo" className={`group mt-5 flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-bold transition ${featured ? "bg-white text-[#0b0a10] hover:bg-[#d7ff7b]" : "border border-white/20 text-white hover:border-white/45 hover:bg-white/[0.06]"}`}>Choose {plan.name} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></a>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function PricingHero({ offer, onOfferChange }: { offer: Offer; onOfferChange: (offer: Offer) => void }) {
  return (
    <section aria-labelledby="pricing-title" className="relative overflow-hidden border-b border-white/[0.06] bg-[#0b0a10] pt-20 text-white">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-[#b34cff]/60 to-transparent" />
      <div className="absolute left-1/2 top-[40%] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[#7232df]/20 blur-[130px]" />
      <div className="relative mx-auto max-w-[1380px] px-5 pb-24 pt-16 text-center sm:px-8 sm:pb-32 sm:pt-24">
        <p className="mb-7 font-mono text-[10px] font-bold uppercase tracking-[.22em] text-[#ce7bff]">OneApp platform pricing</p>
        <h1 id="pricing-title" className="mx-auto max-w-5xl text-[2.6rem] font-bold leading-[.92] tracking-[-.065em] sm:text-[clamp(3.4rem,5.6vw,5.6rem)]">Your business, connected.<br /><span className="bg-gradient-to-r from-[#d46fff] via-[#ad4bff] to-[#6e5cff] bg-clip-text text-transparent">Your AI workforce, ready.</span></h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/55 sm:text-xl">Customers, conversations, orders and reports in one workspace. Choose the capacity your business needs.</p>
        <OfferPicker offer={offer} onChange={onOfferChange} />
        <p className="mt-5 text-sm text-white/45">{offer === "custom-app" ? "Custom App = OneApp access + a separately scoped build." : "OneApp is the software. Setup and ongoing growth services are separate."}</p>
        <PlanCards offer={offer} />
        {offer !== "service" && <p className="mt-6 flex flex-col gap-1 rounded-2xl border border-[#69f7d3]/20 bg-[#69f7d3]/[0.06] px-5 py-4 text-left text-sm sm:flex-row sm:items-center sm:gap-3"><strong className="text-[#69f7d3]">No order-based upgrades.</strong><span className="text-white/65">Your sales can grow without a monthly order quota.</span><small className="text-white/40 sm:ml-auto">AI and specialist processing priced separately</small></p>}
        <div className="mt-6 space-y-2 text-sm text-white/45"><p>{capacityNotes[offer]}</p><p>Monthly software subscription · Setup, hosting and usage charges separate</p></div>
      </div>
    </section>
  );
}

function ToolList({ title, items, note }: { title: string; items: string[]; note?: string }) {
  return (
    <div className="rounded-[28px] border border-black/10 bg-white p-7">
      <h3 className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#8b26ca]">{title}</h3>
      {note && <p className="mt-2 text-sm text-black/50">{note}</p>}
      <ul className="mt-5 flex flex-wrap gap-2">{items.map((item) => <li key={item} className="rounded-full border border-black/10 bg-[#f7f5f9] px-3 py-2 text-sm text-black/70">{item}</li>)}</ul>
    </div>
  );
}

function Included({ offer }: { offer: Offer }) {
  const overview = overviews[offer];
  const kits = [{ title: "Every plan includes", items: essentials }, ...toolkits[offer]];
  return (
    <section id="included" className="scroll-mt-20 bg-[#f3f1f5] py-24 text-[#17131d] sm:py-32">
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8">
        <div className="grid gap-8 border-b border-black/10 pb-14 lg:grid-cols-[1fr_.75fr] lg:items-end">
          <div><p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#8b26ca]">{offerLabel(offer)} · What you get</p><h2 className="max-w-4xl text-5xl font-bold leading-[.95] tracking-[-.06em] sm:text-7xl">{overview.title}</h2></div>
          <p className="max-w-xl text-lg leading-relaxed text-black/55 lg:justify-self-end">{overview.copy} Features and limits follow your plan and setup.</p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {overview.features.map(([Icon, title, copy]) => (
            <article key={title} className="rounded-[28px] border border-black/10 bg-white p-7 shadow-[0_20px_70px_rgba(20,10,30,.06)]">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#f2e7fb] text-[#8b26ca]"><Icon className="h-6 w-6" /></span>
              <h3 className="mt-7 text-2xl font-bold tracking-[-.04em]">{title}</h3>
              <p className="mt-2 leading-relaxed text-black/55">{copy}</p>
            </article>
          ))}
        </div>
        <div className={`mt-5 grid gap-5 ${kits.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>{kits.map((kit) => <ToolList key={kit.title} {...kit} />)}</div>
      </div>
    </section>
  );
}

function Limits({ offer }: { offer: Offer }) {
  const commerce = offer !== "service";
  const rows = [
    { label: "Customer contacts", values: plans.map((plan) => count(plan.contacts)) },
    { label: "Active synced SKUs*", values: plans.map((plan) => count(plan.skus)), commerce: true },
    { label: "AI usage units / month", values: plans.map((plan) => count(plan.ai)) },
    { label: "AI voice minutes / month", values: plans.map((plan) => count(plan.voice)) },
    { label: "Connected website slots†", values: plans.map((plan) => String(plan.sites)) },
    { label: "Technical support", values: plans.map((plan) => plan.support) },
  ].filter((row) => commerce || !row.commerce);
  return (
    <section id="limits" className="scroll-mt-20 bg-[#f3f1f5] pb-24 text-[#17131d] sm:pb-32">
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8">
        <div className="overflow-hidden rounded-[32px] border border-black/10 bg-white shadow-[0_20px_70px_rgba(20,10,30,.08)]">
          <div className="flex flex-col gap-5 border-b border-black/10 p-7 sm:p-10 lg:flex-row lg:items-end lg:justify-between">
            <div><p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#8b26ca]">Compare platform limits · {offerLabel(offer)}</p><h2 className="text-4xl font-bold leading-[1] tracking-[-.05em] sm:text-5xl">Choose capacity for the work you use.</h2></div>
            <p className="max-w-md text-sm leading-relaxed text-black/55">Orders do not trigger a plan upgrade. Active catalog synchronization, contacts and AI usage shape the platform tiers.</p>
          </div>
          <div role="region" aria-label="Plan capacity comparison" tabIndex={0} className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">OneApp platform limits by plan</caption>
              <thead><tr className="border-b border-black/10 bg-[#faf9fb]"><th scope="col" className="px-7 py-5 font-mono text-[10px] font-bold uppercase tracking-[.16em] text-black/45 sm:px-10">Recommended capacity</th>{plans.map((plan) => <th key={plan.name} scope="col" className="px-5 py-5 text-base font-bold">{plan.name} · ${plan.price}</th>)}</tr></thead>
              <tbody>{rows.map((row) => <tr key={row.label} className="border-b border-black/[0.06] last:border-0"><th scope="row" className="px-7 py-5 font-semibold sm:px-10">{row.label}</th>{row.values.map((value, index) => <td key={index} className="px-5 py-5 text-black/65">{value}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <div className="border-t border-black/10 p-7 sm:p-10">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold [&::-webkit-details-marker]:hidden">What counts toward my plan?<ChevronDown className="h-5 w-5 shrink-0 text-[#8b26ca] transition group-open:rotate-180" /></summary>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-black/60">{countingRules.map(([term, rule]) => <li key={term}><strong className="text-[#17131d]">{term}:</strong> {rule}</li>)}</ul>
              <p className="mt-4 text-sm leading-relaxed text-black/60">Additional AI usage or specialist integrations are priced and agreed before they are enabled. There is no automatic overage billing.</p>
            </details>
            <p className="mt-6 text-xs leading-relaxed text-black/45">{commerce && "*SKU allowances count active, synchronized products. "}† Website slots exclude hosting.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AiUsage() {
  return (
    <section id="ai-workforce" className="scroll-mt-20 relative overflow-hidden border-y border-white/[0.07] bg-[#0b0a10] py-24 text-white sm:py-32">
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="relative mx-auto max-w-[1380px] px-5 sm:px-8">
        <div className="grid gap-8 border-b border-white/10 pb-14 lg:grid-cols-[1fr_.72fr] lg:items-end">
          <div><p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#ce7bff]">AI usage units</p><h2 className="max-w-4xl text-5xl font-bold leading-[.94] tracking-[-.06em] sm:text-7xl">Your AI workforce. A little help with everyday work.</h2></div>
          <p className="max-w-xl text-lg leading-relaxed text-white/55 lg:justify-self-end">AI work draws from your plan’s monthly allowance, and usage varies by task. Your setup defines the workflows available to you.</p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {aiExamples.map(({ icon: Icon, title, copy, scene }) => (
            <article key={title} className="rounded-[28px] border border-white/10 bg-[#15121b] p-6 sm:p-7">
              <div className="rounded-2xl border border-white/10 bg-[#1b1627] p-4 font-mono text-[11px] leading-relaxed text-white/55">{scene.map((line) => <p key={line}>{line}</p>)}</div>
              <span className="mt-7 grid h-11 w-11 place-items-center rounded-2xl bg-[#c153ff]/15 text-[#ce7bff]"><Icon className="h-5 w-5" /></span>
              <h3 className="mt-5 text-2xl font-bold tracking-[-.04em]">{title}</h3>
              <p className="mt-2 leading-relaxed text-white/55">{copy}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/45">These are illustrative examples. AI voice has a separate minute allowance; SMS and other provider charges are separate.</p>
        <details className="group mt-5 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold [&::-webkit-details-marker]:hidden">What counts as an AI action?<ChevronDown className="h-4 w-4 shrink-0 transition group-open:rotate-180" /></summary>
          <p className="mt-3 text-sm leading-relaxed text-white/55">An AI action is a metered unit of AI usage, not one finished task. A call, reply or article can use different amounts. These examples show what AI can help with; they do not promise a number of completed tasks. AI phone usage is metered separately in minutes; SMS, site hosting and other provider charges are separate.</p>
        </details>
        <div id="voice" className="scroll-mt-24 mt-20 grid gap-10 rounded-[32px] border border-[#69f7d3]/20 bg-[#11171a] p-7 sm:p-12 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="mb-5 flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#69f7d3]"><Phone className="h-4 w-4" /> AI voice</p>
            <h3 className="text-4xl font-bold leading-[1] tracking-[-.05em] sm:text-5xl">AI voice minutes, made clear.</h3>
            <p className="mt-6 leading-relaxed text-white/55">A separate voice allowance alongside your chat, content and workflow AI units.</p>
            <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">{plans.map((plan) => <div key={plan.name} className="bg-[#11171a] px-3 py-5 text-center"><p className="text-3xl font-bold tracking-[-.05em]">{plan.voice}</p><p className="mt-1 text-xs font-semibold text-white/70">{plan.name}</p><p className="font-mono text-[9px] uppercase tracking-[.14em] text-white/40">min / month</p></div>)}</div>
          </div>
          <ul className="space-y-6 text-sm leading-relaxed text-white/60 sm:text-base">{voiceNotes.map(([lead, copy]) => <li key={lead}><strong className="text-white">{lead}</strong> {copy}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}

function PlanQuestions() {
  return (
    <section id="faq" className="scroll-mt-20 bg-[#f3f1f5] pt-24 text-[#17131d] sm:pt-32">
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[32px] border border-black/10 bg-white p-8 sm:p-12">
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#8b26ca]">Included in your subscription</p>
            <h2 className="text-4xl font-bold leading-[1] tracking-[-.05em] sm:text-5xl">The tools to run your business.</h2>
            <p className="mt-6 text-lg leading-relaxed text-black/55">OneApp provides your workspace, enabled features, AI allowance and technical platform help. Your plan grows with your usage.</p>
          </div>
          <div className="rounded-[32px] bg-[#1265c4] p-8 text-white sm:p-12">
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[.2em]">Optional · Webaholics</p>
            <h2 className="text-4xl font-bold leading-[1] tracking-[-.05em] sm:text-5xl">A team to help you grow.</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/90">Need setup, a custom build or someone to lead the improvement plan? Webaholics scopes that work with you, separately from your software subscription.</p>
            <a href="https://www.webaholics.ai/" target="_blank" rel="noreferrer" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold text-[#1265c4] transition hover:scale-[1.02]">Explore working with Webaholics <ArrowRight className="h-5 w-5 shrink-0 transition group-hover:translate-x-1" /></a>
          </div>
        </div>
        <div className="mt-20 grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div><p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#8b26ca]">Plan questions</p><h2 className="text-4xl font-bold leading-[1] tracking-[-.05em] sm:text-5xl">Questions about OneApp plans.</h2></div>
          <div className="space-y-3">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group rounded-2xl border border-black/10 bg-white px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold [&::-webkit-details-marker]:hidden">{question}<ChevronDown className="h-5 w-5 shrink-0 text-[#8b26ca] transition group-open:rotate-180" /></summary>
                <p className="mt-3 leading-relaxed text-black/60">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PricingPageContent() {
  const [offer, setOffer] = useState<Offer>("service");

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("offer");
    const match = offers.find((item) => item.key === requested);
    if (match) setOffer(match.key);
  }, []);

  const chooseOffer = (next: Offer) => {
    setOffer(next);
    const url = new URL(window.location.href);
    url.searchParams.set("offer", next);
    window.history.replaceState(null, "", url);
  };

  return <main className="overflow-hidden bg-[#0b0a10]"><Navigation base="/" /><PricingHero offer={offer} onOfferChange={chooseOffer} /><Included offer={offer} /><Limits offer={offer} /><AiUsage /><PlanQuestions /><FinalCta /><SiteFooter /></main>;
}
