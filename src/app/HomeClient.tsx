"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, BarChart3, Check, ChevronRight, Menu, Network,
  PackageSearch, ShoppingCart, Smartphone, Sparkles, Store, Target, Users, X, Zap,
} from "lucide-react";
import { useState } from "react";
import { DemoRequestForm } from "~/components/DemoRequestForm";

const modules = [
  {
    eyebrow: "Growth intelligence",
    title: "Know where growth is profitable.",
    copy: "Connect advertising, products, margin and inventory so your team can see which growth is worth buying—and which is quietly destroying value.",
    image: "/screenshots/revenueGrowth-desktop.png",
    icon: BarChart3,
    signal: "ACQUISITION × MARGIN",
  },
  {
    eyebrow: "Commerce operations",
    title: "Coordinate the work behind the storefront.",
    copy: "Turn company goals into measured scorecards with owners, live progress, margin guardrails and AI-visible next actions.",
    image: "/screenshots/goals-dzone-desktop.png",
    icon: Target,
    signal: "GOALS × ACCOUNTABILITY",
  },
  {
    eyebrow: "Customer intelligence",
    title: "Carry intent through every conversation.",
    copy: "Let AI answer routine questions from the full customer, product and order context—then escalate uncertainty without losing the thread.",
    image: "/screenshots/messages-ai-autoresponse-desktop.png",
    icon: Users,
    signal: "CUSTOMER × RETENTION",
  },
];

const channels = [
  { label: "Sites", icon: Store },
  { label: "Storefronts", icon: ShoppingCart },
  { label: "Portals", icon: PackageSearch },
  { label: "Customers", icon: Users },
  { label: "Operations", icon: Network },
];

function Logo() {
  return (
    <Link href="/" aria-label="OneApp home" className="flex items-center">
      <Image src="/oneapp-logo.png" alt="OneApp" width={220} height={72} className="h-9 w-auto" priority />
    </Link>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const links = [["#platform", "Platform"], ["#experiences", "Sites & portals"], ["#mobile", "Mobile"], ["#proof", "Why OneApp"], ["#webaholics", "Managed growth"]];
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#0b0a10]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1380px] items-center justify-between px-5 sm:px-8">
        <Logo />
        <div className="hidden items-center gap-8 lg:flex">
          {links.map(([href, label]) => <a key={href} href={href} className="text-sm font-medium text-white/55 transition hover:text-white">{label}</a>)}
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          <span className="hidden text-[10px] font-bold uppercase tracking-[0.18em] text-white/35 xl:block">For commerce brands</span>
          <a href="#demo" className="group flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#0b0a10] transition hover:bg-[#d7ff7b]">Request a demo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></a>
        </div>
        <button onClick={() => setOpen(!open)} className="rounded-lg p-2 text-white lg:hidden" aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>
        {open && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="border-t border-white/10 bg-[#111019] px-5 py-5 lg:hidden">
          {links.map(([href, label]) => <a key={href} onClick={() => setOpen(false)} href={href} className="block border-b border-white/[0.06] py-4 text-white/75">{label}</a>)}
          <a href="#demo" onClick={() => setOpen(false)} className="mt-5 flex items-center justify-center gap-2 rounded-full bg-white px-5 py-4 font-bold text-black">Request a demo <ArrowRight className="h-4 w-4" /></a>
        </motion.div>}
      </AnimatePresence>
    </nav>
  );
}

function ProductStage() {
  return (
    <div className="relative mx-auto w-full max-w-[680px]">
      <div className="absolute -inset-16 bg-[radial-gradient(circle,rgba(166,72,255,0.25),transparent_62%)] blur-2xl" />
      <motion.div initial={{ opacity: 0, y: 24, rotateX: 4 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.9, delay: 0.15 }} className="relative overflow-hidden rounded-[28px] border border-white/15 bg-[#171321] p-2 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
        <div className="flex h-10 items-center gap-2 rounded-t-[20px] border-b border-white/[0.07] px-4">
          <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">OneApp / Commerce command</span>
          <span className="ml-auto flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#69f7d3]"><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" /> Product view</span>
        </div>
        <div className="relative aspect-[1.35/1] overflow-hidden rounded-b-[20px] bg-[#121019]">
          <Image src="/screenshots/revenueGrowth-desktop.png" alt="OneApp commerce intelligence dashboard" fill className="object-cover object-left-top opacity-90" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121019] via-transparent to-transparent" />
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .65, duration: .6 }} className="absolute -left-4 top-[24%] hidden w-60 rounded-2xl border border-white/15 bg-[#1b1627]/95 p-4 shadow-2xl backdrop-blur md:block">
        <span className="font-mono text-[9px] font-bold uppercase tracking-[.18em] text-[#c36bff]">Illustrative workflow</span><p className="mt-2 text-sm font-semibold leading-snug text-white">Paid growth is outrunning margin on 41 products.</p><div className="mt-3 flex items-center justify-between text-[10px] text-white/40"><span>Commercial impact</span><span className="text-[#69f7d3]">High</span></div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .85, duration: .6 }} className="absolute -right-3 bottom-[13%] hidden w-56 rounded-2xl border border-[#69f7d3]/20 bg-[#11171a]/95 p-4 shadow-2xl backdrop-blur md:block">
        <span className="font-mono text-[9px] font-bold uppercase tracking-[.18em] text-[#69f7d3]">Action coordinated</span><p className="mt-2 text-sm font-semibold leading-snug text-white">Budget shift queued for operator review.</p><div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[82%] bg-[#69f7d3]" /></div>
      </motion.div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#0b0a10] pt-20">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-[#b34cff]/60 to-transparent" />
      <div className="relative mx-auto grid min-h-[850px] max-w-[1380px] items-center gap-16 px-5 py-20 sm:px-8 lg:grid-cols-[.92fr_1.08fr] lg:py-24">
        <div>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-7 flex items-start gap-3"><span className="mt-2 h-px w-8 shrink-0 bg-[#c153ff]" /><span className="min-w-0 font-mono text-[9px] font-bold uppercase leading-relaxed tracking-[.16em] text-[#ce7bff] sm:text-[10px] sm:tracking-[.22em]">The AI operating system for commerce growth</span></motion.div>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }} className="max-w-[720px] text-[3.25rem] font-bold leading-[.86] tracking-[-.075em] text-white sm:text-[clamp(3.6rem,7.2vw,7.1rem)]">Your business.<br /><span className="bg-gradient-to-r from-[#d46fff] via-[#ad4bff] to-[#6e5cff] bg-clip-text text-transparent">Connected to AI.</span></motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16 }} className="mt-8 max-w-[650px] text-lg leading-relaxed text-white/55 sm:text-xl">Power your sites, storefronts and custom portals with one connected business platform. Give your team and AI the context and tools to turn customer intent into completed work.</motion.p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .24 }} className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#demo" className="group flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-bold text-[#0b0a10] transition hover:bg-[#d7ff7b]">Request a platform demo <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" /></a><a href="#platform" className="flex items-center justify-center gap-3 rounded-full border border-white/15 px-7 py-4 font-semibold text-white transition hover:border-white/35 hover:bg-white/[0.04]">Explore the platform <ChevronRight className="h-5 w-5" /></a></motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }} className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-[10px] uppercase tracking-[.14em] text-white/35"><span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#69f7d3]" /> Built in live commerce</span><span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#69f7d3]" /> Operator controlled</span><span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#69f7d3]" /> AI accelerated</span></motion.div>
        </div>
        <ProductStage />
      </div>
    </section>
  );
}


function ConnectedExperiences() {
  const experiences = [
    {number: "01", name: "Sites that start the relationship.", tag: "ATTRACT & CONVERT", text: "Connect content, forms, calls and traffic sources to the customer record. Carry intent from the first visit into a useful next action.", icon: Store, items: ["Website inquiry", "Customer context", "Assigned follow-up"]},
    {number: "02", name: "Storefronts built for the operation.", tag: "SELL & FULFILL", text: "Bring products, availability, orders and conversations together. Give customers answers grounded in the business behind the store.", icon: ShoppingCart, items: ["Product & availability", "Customer order", "Fulfillment task"]},
    {number: "03", name: "Portals that move work forward.", tag: "SERVE & RETAIN", text: "Create branded customer, member or partner experiences for requests, documents and approvals, connected to your team's workflow.", icon: Users, items: ["Customer request", "Team approval", "Recorded outcome"]},
  ];
  return <section id="experiences" className="bg-[#15121d] py-24 text-white sm:py-28"><div className="mx-auto max-w-[1380px] px-5 sm:px-8">
    <p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#ce7bff]">Custom experiences. Shared business context.</p>
    <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr] lg:items-end"><h2 className="max-w-3xl text-5xl font-bold leading-[.98] tracking-[-.06em] sm:text-6xl">Every front door.<br /><span className="text-[#ce7bff]">One connected business.</span></h2><p className="max-w-xl text-lg leading-relaxed text-white/55">Your brand on the outside. OneApp underneath. Connect your preferred AI to the same records and governed actions your team uses.</p></div>
    <div className="mt-12 grid gap-5 lg:grid-cols-3">{experiences.map(({number,name,tag,text,icon:Icon,items})=><article key={number} className="rounded-[24px] border border-white/10 bg-white/[.035] p-7 sm:p-9"><div className="flex items-center justify-between"><Icon className="h-7 w-7 text-[#ce7bff]"/><span className="font-mono text-xs text-white/30">{number}</span></div><p className="mt-9 font-mono text-[9px] tracking-[.18em] text-white/45">{tag}</p><h3 className="mt-4 text-3xl font-bold leading-tight tracking-[-.04em]">{name}</h3><p className="mt-5 text-sm leading-relaxed text-white/55">{text}</p><div className="mt-8 space-y-2 border-t border-white/10 pt-6">{items.map((item,i)=><div key={item} className="flex items-center gap-3 text-sm text-white/75"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ce7bff]/10 font-mono text-[9px] text-[#ce7bff]">{i+1}</span>{item}</div>)}</div></article>)}</div>
    <div className="mt-8 grid gap-8 rounded-[24px] border border-[#69f7d3]/20 bg-[#101b1a] p-8 lg:grid-cols-[.8fr_1.2fr]"><div><p className="font-mono text-[9px] uppercase tracking-[.18em] text-[#69f7d3]">Workflow example · Order resolution</p><h3 className="mt-4 text-3xl font-bold tracking-[-.04em]">A customer decision.<br />A coordinated next step.</h3><p className="mt-4 text-sm leading-relaxed text-white/50">Scope and automation depend on connected data and your approval rules.</p></div><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-white/[.05] p-6"><p className="text-xs text-[#69f7d3]">CUSTOMER PORTAL</p><p className="mt-3 text-lg font-semibold">Review your order options</p><p className="mt-3 text-sm text-white/50">View an approved alternative and choose how to proceed.</p><span className="mt-5 inline-block rounded-full bg-[#69f7d3]/10 px-4 py-2 text-xs text-[#69f7d3]">Decision recorded</span></div><div className="rounded-2xl bg-white/[.05] p-6"><p className="text-xs text-[#ce7bff]">TEAM WORKSPACE</p><p className="mt-3 text-lg font-semibold">The next action is clear</p><p className="mt-3 text-sm text-white/50">A named owner, the full conversation and the order context.</p><span className="mt-5 inline-block rounded-full bg-[#ce7bff]/10 px-4 py-2 text-xs text-[#ce7bff]">Task ready for review</span></div></div></div>
  </div></section>;
}

function CommerceRail() {
  return <section className="border-b border-white/[0.07] bg-[#111019]" aria-label="Connected commerce functions"><div className="mx-auto flex max-w-[1380px] flex-col items-center justify-between gap-8 px-5 py-8 sm:px-8 lg:flex-row"><p className="max-w-xs text-sm font-semibold text-white/70">Your customer experience. Your operations. One connected system.</p><div className="grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-5 lg:max-w-4xl">{channels.map(({ label, icon: Icon }) => <div key={label} className="flex items-center gap-2 bg-[#111019] px-4 py-4 text-xs font-medium text-white/50"><Icon className="h-4 w-4 text-[#b85cff]" />{label}</div>)}</div></div></section>;
}

function PlatformModules() {
  return (
    <section id="platform" className="bg-[#f3f1f5] py-24 text-[#17131d] sm:py-32">
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8">
        <div className="grid gap-8 border-b border-black/10 pb-14 lg:grid-cols-[1fr_.75fr] lg:items-end"><div><p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#8b26ca]">The platform</p><h2 className="max-w-4xl text-5xl font-bold leading-[.95] tracking-[-.06em] sm:text-7xl">Business context. Meaningful action.</h2></div><p className="max-w-xl text-lg leading-relaxed text-black/55 lg:justify-self-end">Connect what customers do with the work your team needs to complete. Shared records, company permissions and connected tools bring the whole journey into view.</p></div>
        <div id="intelligence" className="mt-14 space-y-5">
          {modules.map((module, index) => { const Icon = module.icon; return <motion.article key={module.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="grid overflow-hidden rounded-[32px] border border-black/10 bg-white shadow-[0_20px_70px_rgba(20,10,30,.08)] lg:grid-cols-[.82fr_1.18fr]">
            <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-14"><div><div className="mb-16 flex items-center justify-between"><span className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#8b26ca]">{module.eyebrow}</span><span className="font-mono text-[10px] text-black/30">0{index + 1} / 03</span></div><span className="mb-7 grid h-12 w-12 place-items-center rounded-2xl bg-[#f2e7fb] text-[#8b26ca]"><Icon className="h-6 w-6" /></span><h3 className="text-4xl font-bold leading-[1] tracking-[-.05em] sm:text-5xl">{module.title}</h3><p className="mt-6 max-w-xl text-base leading-relaxed text-black/55 sm:text-lg">{module.copy}</p></div><span className="mt-12 w-fit rounded-full border border-black/10 px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[.15em] text-black/45">{module.signal}</span></div>
            <div className="relative min-h-[430px] overflow-hidden bg-[#17131d] p-5 sm:p-9"><div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:45px_45px]" /><div className="relative h-full min-h-[380px] overflow-hidden rounded-2xl border border-white/10 bg-[#0f0d14] shadow-2xl"><Image src={module.image} alt="" fill className="object-cover object-left-top" /><div className="absolute inset-0 bg-gradient-to-t from-[#0f0d14]/60 via-transparent to-transparent" /></div></div>
          </motion.article>; })}
        </div>
      </div>
    </section>
  );
}

const mobileScreens = [
  {
    image: "/screenshots/mobile-dzone-ecommerce.svg",
    alt: "OneApp mobile home for D Zone showing ecommerce revenue, profit, orders, average order value and refunds",
    label: "D Zone",
    meta: "Ecommerce command · representative data",
  },
  {
    image: "/screenshots/mobile-webaholics-service.svg",
    alt: "OneApp mobile home for Webaholics showing service revenue, sessions, leads, search position and advertising spend",
    label: "Webaholics",
    meta: "Service growth · representative data",
  },
];

function MobilePwa() {
  return (
    <section id="mobile" className="relative overflow-hidden border-y border-white/[0.07] bg-[#0b0a10] py-24 text-white sm:py-32">
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="absolute left-1/2 top-[58%] h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7232df]/20 blur-[130px]" />
      <div className="relative mx-auto max-w-[1380px] px-5 sm:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-14 lg:grid-cols-[1fr_.72fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3 text-[#ce7bff]">
              <Smartphone className="h-4 w-4" />
              <p className="font-mono text-[10px] font-bold uppercase tracking-[.2em]">OneApp mobile / PWA</p>
            </div>
            <h2 className="max-w-4xl text-5xl font-bold leading-[.94] tracking-[-.06em] sm:text-7xl">Your whole operation. In your hand.</h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-xl text-lg leading-relaxed text-white/55">One mobile home adapts to the business in view—commerce economics for D Zone, service growth for Webaholics, and the same AI operating layer beneath both.</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["Installable PWA", "Operator controlled", "Same connected system"].map(item => <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[.13em] text-white/55">{item}</span>)}
            </div>
          </div>
        </div>

        <div className="mobile-pwa-scroll -mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-7 sm:-mx-8 sm:px-8 lg:mx-auto lg:grid lg:max-w-[760px] lg:grid-cols-2 lg:items-start lg:gap-10 lg:overflow-visible lg:px-0 lg:pb-0">
          {mobileScreens.map((screen, index) => (
            <motion.figure
              key={screen.image}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ delay: index * .1, duration: .6 }}
              className={`w-[276px] shrink-0 snap-center sm:w-[300px] lg:w-auto ${index === 1 ? "lg:translate-y-10" : ""}`}
            >
              <div className="relative rounded-[42px] border border-white/20 bg-[#080812] p-[7px] shadow-[0_34px_90px_rgba(0,0,0,.65)]">
                <div className="absolute left-1/2 top-[15px] z-10 h-[22px] w-[82px] -translate-x-1/2 rounded-full border border-white/[0.04] bg-black" />
                <div className="relative aspect-[390/844] overflow-hidden rounded-[35px] bg-[#06091a]">
                  <Image src={screen.image} alt={screen.alt} fill unoptimized sizes="(max-width: 1024px) 300px, 360px" className="object-cover object-top" />
                  <Image
                    src="/screenshots/oneapp-mobile-app-icon.png"
                    alt=""
                    width={34}
                    height={34}
                    unoptimized
                    className="pointer-events-none absolute left-[5.64%] top-[2.61%] z-[2] h-auto w-[8.72%]"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#06091a]/90 to-transparent" />
                </div>
              </div>
              <figcaption className="mt-5 flex items-start justify-between gap-4 px-2">
                <div><p className="text-sm font-bold text-white">{screen.label}</p><p className="mt-1 text-xs text-white/35">{screen.meta}</p></div>
                <span className="font-mono text-[9px] text-[#69f7d3]">0{index + 1}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mx-auto mt-12 grid max-w-[1060px] gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:mt-6">
          {["Revenue, profit, orders + channel mix", "Revenue, leads, traffic + paid media", "One AI context across both businesses"].map(item => <div key={item} className="flex items-center gap-3 bg-[#111019] px-5 py-5 text-sm text-white/65"><Check className="h-4 w-4 shrink-0 text-[#69f7d3]" />{item}</div>)}
        </div>
      </div>
    </section>
  );
}

function Proof() {
  const nodes = [{t:"Orders",p:"-top-16 left-1/2 -translate-x-1/2"},{t:"Products",p:"top-1/2 -right-28 -translate-y-1/2"},{t:"Margin",p:"-bottom-16 left-1/2 -translate-x-1/2"},{t:"Ads",p:"top-1/2 -left-24 -translate-y-1/2"}];
  return <section id="proof" className="relative overflow-hidden bg-[#0b0a10] py-24 text-white sm:py-32"><div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(188,83,255,.35)_1px,transparent_1px)] [background-size:22px_22px]" /><div className="relative mx-auto grid max-w-[1380px] gap-16 px-5 sm:px-8 lg:grid-cols-[.82fr_1.18fr] lg:items-center"><div><p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#ce7bff]">Built under operating pressure</p><h2 className="text-5xl font-bold leading-[.94] tracking-[-.06em] sm:text-7xl">We didn&apos;t imagine commerce complexity.</h2><p className="mt-7 max-w-xl text-lg leading-relaxed text-white/55">D-Zone is a real commerce business dealing with product data, suppliers, advertising, inventory, marketplaces, orders and margin every day. OneApp was built inside that work.</p><div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">{["Real inventory", "Real media spend", "Real operating stakes"].map(item => <div key={item} className="flex items-center gap-2 bg-[#111019] px-5 py-5 text-sm text-white/65"><Check className="h-4 w-4 text-[#69f7d3]" />{item}</div>)}</div></div>
    <div className="relative min-h-[540px]"><div className="absolute inset-0 rotate-2 rounded-[36px] border border-[#c153ff]/30 bg-gradient-to-br from-[#25152f] to-[#101017]" /><div className="absolute inset-5 -rotate-2 rounded-[30px] border border-white/10 bg-[#15121b] p-7 shadow-2xl sm:p-10"><div className="flex items-center justify-between border-b border-white/10 pb-6"><span className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-white/40">D-Zone operating loop</span><span className="rounded-full bg-[#69f7d3]/10 px-3 py-1 font-mono text-[9px] text-[#69f7d3]">LIVE PROVING GROUND</span></div><div className="grid h-[420px] place-items-center"><div className="relative grid h-44 w-44 place-items-center rounded-full border border-[#c153ff]/30 bg-[#201528] shadow-[0_0_90px_rgba(184,80,255,.22)]"><div className="grid h-24 w-24 place-items-center rounded-[28px] bg-gradient-to-br from-[#ce6bff] to-[#682ee8]"><Zap className="h-10 w-10" /></div>{nodes.map(x => <span key={x.t} className={`absolute ${x.p} rounded-xl border border-white/10 bg-[#211a29] px-4 py-2 font-mono text-[10px] uppercase tracking-[.12em] text-white/55`}>{x.t}</span>)}</div></div></div></div>
  </div></section>;
}

function WebaholicsBridge() {
  return <section id="webaholics" className="bg-[#d8ff72] py-20 text-[#111019] sm:py-24"><div className="mx-auto grid max-w-[1380px] gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[.2em]">Need more than software?</p><h2 className="max-w-5xl text-5xl font-bold leading-[.92] tracking-[-.065em] sm:text-7xl">OneApp powers it. Webaholics brings it to life.</h2></div><a href="https://www.webaholics.ai" className="group flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#111019] px-7 py-4 font-bold text-white transition hover:scale-[1.02]">Meet Webaholics <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" /></a></div></section>;
}

function FinalCta() {
  return <section id="demo" className="bg-[#f3f1f5] py-24 sm:py-32"><div className="mx-auto max-w-[1380px] px-5 sm:px-8"><div className="relative overflow-hidden rounded-[36px] bg-[#17131d] px-7 py-16 text-center text-white sm:px-14 sm:py-24"><div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:48px_48px]" /><div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a83cff]/25 blur-[100px]" /><div className="relative"><Sparkles className="mx-auto mb-6 h-8 w-8 text-[#cf79ff]" /><p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#cf79ff]">Platform walkthrough</p><h2 className="mx-auto mt-6 max-w-4xl text-5xl font-bold leading-[.94] tracking-[-.06em] sm:text-7xl">Bring us the moving parts. We&apos;ll show you the system.</h2><p className="mx-auto mt-7 max-w-2xl text-lg text-white/50">Bring a website, storefront or portal workflow. See how OneApp can connect the customer experience to your team, your tools and AI.</p><DemoRequestForm /></div></div></div></section>;
}

export function OneAppPageContent() {
  return <main className="overflow-hidden bg-[#0b0a10]"><Navigation /><Hero /><CommerceRail /><ConnectedExperiences /><PlatformModules /><MobilePwa /><Proof /><WebaholicsBridge /><FinalCta /><footer className="border-t border-white/10 bg-[#0b0a10] py-10 text-white/35"><div className="mx-auto flex max-w-[1380px] flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between"><Logo /><div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs"><p>© 2026 OneApp. The AI operating system for commerce growth.</p><Link href="/privacy" className="transition hover:text-white">Privacy</Link><a href="mailto:info@oneapp.today" className="transition hover:text-white">Contact</a></div></div></footer></main>;
}
