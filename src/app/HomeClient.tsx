"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, BarChart3, Check, ChevronRight, Menu, Network,
  ShoppingCart, Smartphone, Sparkles, Store, Target, Users, X,
} from "lucide-react";
import { useRef, useState } from "react";
import { DemoRequestForm } from "~/components/DemoRequestForm";
import { WebsiteChatShowcase } from "~/components/WebsiteChatShowcase";

const WEBAHOLICS_WHITE_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+gAAACrCAYAAAD1h7a7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJBQjBCNUE5REJBQTExRTc5MzI4RkY4RjdFM0ZEM0M2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJBQjBCNUFBREJBQTExRTc5MzI4RkY4RjdFM0ZEM0M2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkFCMEI1QTdEQkFBMTFFNzkzMjhGRjhGN0UzRkQzQzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkFCMEI1QThEQkFBMTFFNzkzMjhGRjhGN0UzRkQzQzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz76DX7XAAAyjUlEQVR42uyd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";

const modules = [
  {
    eyebrow: "Growth intelligence",
    title: "Know what’s working.",
    copy: "See sales, leads and marketing performance in one place. Give your team and AI a shared view of what’s changing, where to focus and what to do next.",
    image: "/screenshots/dzone-analytics-simple-demo-oct25.png",
    alt: "D Zone Analytics with illustrative revenue of $181,888, 22% profit margin and Amazon, eBay, Website and Walmart sales trends",
    caption: "D Zone Analytics · Illustrative data",
    icon: BarChart3,
    signal: "PERFORMANCE × CLARITY",
  },
  {
    eyebrow: "Goals & execution",
    title: "Turn priorities into progress.",
    copy: "Connect goals, tasks and responsibilities. Use AI to help plan the next step, with clear ownership and visible progress for your team and Webaholics.",
    image: "/screenshots/goal-detail-oct22.jpg",
    alt: "OneApp goal detail showing ownership, next action and progress toward 10 profitable clients",
    caption: "Goals & accountability · OneApp UI, October 22",
    icon: Target,
    signal: "GOALS × ACCOUNTABILITY",
  },
  {
    eyebrow: "Customer intelligence",
    title: "Keep every relationship moving.",
    copy: "Bring leads, clients and messages together. Use AI-assisted replies and website chat to answer questions, capture interest and help your team follow up with context.",
    image: "/screenshots/messages-demo-oct25.png",
    alt: "OneApp Messages response performance with illustrative reply times of 12.6 minutes for eBay and 14.2 minutes for Amazon",
    caption: "Messages response performance · Illustrative data",
    icon: Users,
    signal: "CUSTOMER × RETENTION",
  },
];

const channels = [
  { label: "Websites", icon: Store },
  { label: "Leads & sales", icon: ShoppingCart },
  { label: "Analytics", icon: BarChart3 },
  { label: "Customers", icon: Users },
  { label: "Team & AI", icon: Network },
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
  const pendingAnchor = useRef<string | null>(null);
  const finishMenuNavigation = () => {
    const href = pendingAnchor.current;
    pendingAnchor.current = null;
    if (href) document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const links = [["#platform", "Platform"], ["#intelligence", "Intelligence"], ["#mobile", "Mobile"], ["#proof", "Why OneApp"], ["#webaholics", "Your growth team"]];
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#0b0a10]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1380px] items-center justify-between px-5 sm:px-8">
        <Logo />
        <div className="hidden items-center gap-6 xl:flex">
          {links.map(([href, label]) => <a key={href} href={href} className="text-sm font-medium text-white/55 transition hover:text-white">{label}</a>)}
        </div>
        <div className="flex items-center gap-3">
          <a href="https://prod.oneapp.today/" className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full border border-white/25 px-3 py-3 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-4">Client login</a>
          <a href="#demo" className="group hidden items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#0b0a10] transition hover:bg-[#d7ff7b] sm:flex">Request a demo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></a>
        </div>
        <button onClick={() => setOpen(!open)} className="rounded-lg p-2 text-white xl:hidden" aria-label="Toggle menu" aria-expanded={open} aria-controls="mobile-navigation">{open ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence onExitComplete={finishMenuNavigation}>
        {open && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} id="mobile-navigation" className="border-t border-white/10 bg-[#111019] px-5 py-5 xl:hidden">
          {links.map(([href, label]) => <a key={href} onClick={() => { pendingAnchor.current = href ?? null; setOpen(false); }} href={href} className="block border-b border-white/[0.06] py-4 text-white/75">{label}</a>)}
          <a href="https://prod.oneapp.today/" onClick={() => setOpen(false)} className="mt-5 flex min-h-11 items-center justify-center rounded-full border border-white/25 px-5 py-4 font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Client login</a>
          <a href="#demo" onClick={() => { pendingAnchor.current = "#demo"; setOpen(false); }} className="mt-5 flex items-center justify-center gap-2 rounded-full bg-white px-5 py-4 font-bold text-black">Request a demo <ArrowRight className="h-4 w-4" /></a>
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
          <span className="ml-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">OneApp / D Zone Analytics</span>
          <span className="ml-auto flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#69f7d3]">Illustrative data</span>
        </div>
        <div className="relative aspect-[1.28/1] overflow-hidden rounded-b-[20px] bg-[#121019]">
          <Image src="/screenshots/dzone-analytics-simple-demo-oct25.png" alt="D Zone Analytics with illustrative revenue of $181,888, 22% profit margin and Amazon, eBay, Website and Walmart sales trends" fill className="object-cover object-left-top" priority unoptimized />

        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .65, duration: .6 }} className="absolute -left-4 top-[24%] hidden w-60 rounded-2xl border border-white/15 bg-[#1b1627]/95 p-4 shadow-2xl backdrop-blur md:block">
        <span className="font-mono text-[9px] font-bold uppercase tracking-[.18em] text-[#c36bff]">AI + business context</span><p className="mt-2 text-sm font-semibold leading-snug text-white">Understand performance. Find your next opportunity.</p><div className="mt-3 flex items-center justify-between text-[10px] text-white/40"><span>Connected insights</span><span className="text-[#69f7d3]">Your business</span></div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .85, duration: .6 }} className="absolute -right-3 -bottom-[5%] hidden w-56 rounded-2xl border border-[#69f7d3]/20 bg-[#11171a]/95 p-4 shadow-2xl backdrop-blur md:block">
        <span className="font-mono text-[9px] font-bold uppercase tracking-[.18em] text-[#69f7d3]">People + AI</span><p className="mt-2 text-sm font-semibold leading-snug text-white">Plan the work. Keep your team in control.</p><p className="mt-3 text-[10px] text-white/40">AI assistance. Human judgment.</p>
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
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-7 flex items-start gap-3"><span className="mt-2 h-px w-8 shrink-0 bg-[#c153ff]" /><span className="min-w-0 font-mono text-[9px] font-bold uppercase leading-relaxed tracking-[.16em] text-[#ce7bff] sm:text-[10px] sm:tracking-[.22em]">An AI workforce platform for business growth</span></motion.div>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }} className="max-w-[720px] text-[3.25rem] font-bold leading-[.86] tracking-[-.075em] text-white sm:text-[clamp(3.6rem,6.2vw,6.2rem)]">Grow your business.<br /><span className="bg-gradient-to-r from-[#d46fff] via-[#ad4bff] to-[#6e5cff] bg-clip-text text-transparent">With an AI workforce.</span></motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16 }} className="mt-8 max-w-[650px] text-lg leading-relaxed text-white/55 sm:text-xl">OneApp connects your website, customers, performance and daily work—so your team and AI can move growth forward together. Built around your business, backed by Webaholics.</motion.p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .24 }} className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#demo" className="group flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-bold text-[#0b0a10] transition hover:bg-[#d7ff7b]">Request a demo <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" /></a><a href="#platform" className="flex items-center justify-center gap-3 rounded-full border border-white/15 px-7 py-4 font-semibold text-white transition hover:border-white/35 hover:bg-white/[0.04]">Explore the platform <ChevronRight className="h-5 w-5" /></a></motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }} className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-[10px] uppercase tracking-[.14em] text-white/35"><span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#69f7d3]" /> Services + commerce</span><span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#69f7d3]" /> Your team in control</span><span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#69f7d3]" /> AI with context</span></motion.div>
        </div>
        <ProductStage />
      </div>
    </section>
  );
}

function CommerceRail() {
  return <section className="border-b border-white/[0.07] bg-[#111019]" aria-label="Connected business functions"><div className="mx-auto flex max-w-[1380px] flex-col items-center justify-between gap-8 px-5 py-8 sm:px-8 lg:flex-row"><p className="max-w-xs text-sm font-semibold text-white/70">Your business, your team and AI. Working from the same picture.</p><div className="grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-5 lg:max-w-4xl">{channels.map(({ label, icon: Icon }) => <div key={label} className="flex items-center gap-2 bg-[#111019] px-4 py-4 text-xs font-medium text-white/50"><Icon className="h-4 w-4 text-[#b85cff]" />{label}</div>)}</div></div></section>;
}

function PlatformModules() {
  return (
    <>
    <section id="platform" className="scroll-mt-20 bg-[#f3f1f5] py-24 text-[#17131d] sm:py-32">
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8">
        <div className="grid gap-8 border-b border-black/10 pb-14 lg:grid-cols-[1fr_.75fr] lg:items-end"><div><p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#8b26ca]">The platform</p><h2 className="max-w-4xl text-5xl font-bold leading-[.95] tracking-[-.06em] sm:text-7xl">One connected platform. More ways to grow.</h2></div><p className="max-w-xl text-lg leading-relaxed text-black/55 lg:justify-self-end">OneApp brings your business into one workspace. AI helps you understand performance, create content and move work forward—with your team guiding the decisions.</p></div>
        <div id="intelligence" className="scroll-mt-24 mt-14 space-y-5">
          {modules.map((module, index) => { const Icon = module.icon; return <motion.article key={module.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="grid overflow-hidden rounded-[32px] border border-black/10 bg-white shadow-[0_20px_70px_rgba(20,10,30,.08)] lg:grid-cols-[.82fr_1.18fr]">
            <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-14"><div><div className="mb-16 flex items-center justify-between"><span className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#8b26ca]">{module.eyebrow}</span><span className="font-mono text-[10px] text-black/30">0{index + 1} / 03</span></div><span className="mb-7 grid h-12 w-12 place-items-center rounded-2xl bg-[#f2e7fb] text-[#8b26ca]"><Icon className="h-6 w-6" /></span><h3 className="text-4xl font-bold leading-[1] tracking-[-.05em] sm:text-5xl">{module.title}</h3><p className="mt-6 max-w-xl text-base leading-relaxed text-black/55 sm:text-lg">{module.copy}</p></div><span className="mt-12 w-fit rounded-full border border-black/10 px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[.15em] text-black/45">{module.signal}</span></div>
            <div className="relative flex min-w-0 flex-col justify-center overflow-hidden bg-[#17131d] p-5 sm:p-9"><div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:45px_45px]" /><figure className="relative min-w-0"><a href={module.image} target="_blank" rel="noreferrer" aria-label={`Open ${module.eyebrow} screenshot full size`} className="relative block aspect-[1.08/1] overflow-hidden rounded-2xl border border-white/10 bg-[#1d263a] shadow-2xl focus-visible:outline-2 focus-visible:outline-[#ce7bff]"><Image src={module.image} alt={module.alt} fill sizes="(max-width: 1024px) 90vw, 700px" unoptimized className={index === 0 ? "object-contain" : "object-cover object-left-top"} /></a><figcaption className="mt-4 text-xs leading-relaxed text-white/50">{module.caption} · Open full screenshot</figcaption></figure></div>
          </motion.article>; })}
        </div>
      </div>
    </section>
    <WebsiteChatShowcase />
    </>
  );
}

const mobileScreens = [
  {
    image: "/screenshots/mobile-dzone-demo-oct25-v2.png",
    alt: "OneApp mobile home for D Zone showing illustrative ecommerce revenue, profit, orders, average order value and refunds",
    label: "D Zone",
    meta: "Commerce analytics · illustrative data",
  },
  {
    image: "/screenshots/mobile-webaholics-demo-oct25.png",
    alt: "OneApp mobile home for Webaholics showing illustrative service revenue, sessions, leads, search position and advertising spend",
    label: "Webaholics",
    meta: "Service analytics · illustrative data",
  },
];

function MobilePwa() {
  return (
    <section id="mobile" className="scroll-mt-20 relative overflow-hidden border-y border-white/[0.07] bg-[#0b0a10] py-24 text-white sm:py-32">
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="absolute left-1/2 top-[58%] h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7232df]/20 blur-[130px]" />
      <div className="relative mx-auto max-w-[1380px] px-5 sm:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-14 lg:grid-cols-[1fr_.72fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3 text-[#ce7bff]">
              <Smartphone className="h-4 w-4" />
              <p className="font-mono text-[10px] font-bold uppercase tracking-[.2em]">OneApp mobile / PWA</p>
            </div>
            <h2 className="max-w-4xl text-5xl font-bold leading-[.94] tracking-[-.06em] sm:text-7xl">Stay connected. Wherever work takes you.</h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-xl text-lg leading-relaxed text-white/55">Check performance, follow up with customers and keep work moving from your phone. Your mobile workspace adapts to your business—whether you sell products, deliver services or do both.</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["Installable PWA", "Your team in control", "Same connected system"].map(item => <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[.13em] text-white/55">{item}</span>)}
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
                <div className="relative aspect-[390/844] overflow-hidden rounded-[35px] bg-[#06091a]">
                  <Image src={screen.image} alt={screen.alt} fill unoptimized sizes="(max-width: 1024px) 300px, 360px" className="object-cover object-top" />
                </div>
              </div>
              <figcaption className="mt-5 flex items-start justify-between gap-4 px-2">
                <div><p className="text-sm font-bold text-white">{screen.label}</p><p className="mt-1 text-xs text-white/35">{screen.meta}</p></div>
                <span className="font-mono text-[9px] text-[#69f7d3]">0{index + 1}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mx-auto mt-12 grid max-w-[1060px] gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:mt-20">
          {["Revenue, profit, orders + channel mix", "Revenue, leads, traffic + paid media", "Business context for your team + AI"].map(item => <div key={item} className="flex items-center gap-3 bg-[#111019] px-5 py-5 text-sm text-white/65"><Check className="h-4 w-4 shrink-0 text-[#69f7d3]" />{item}</div>)}
        </div>
      </div>
    </section>
  );
}

function Proof() {
  const nodes = [{t:"Orders",p:"-top-16 left-1/2 -translate-x-1/2"},{t:"Products",p:"top-1/2 -right-28 -translate-y-1/2"},{t:"Margin",p:"-bottom-16 left-1/2 -translate-x-1/2"},{t:"Ads",p:"top-1/2 -left-24 -translate-y-1/2"}];
  return <section id="proof" className="scroll-mt-20 relative overflow-hidden bg-[#0b0a10] py-24 text-white sm:py-32"><div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(188,83,255,.35)_1px,transparent_1px)] [background-size:22px_22px]" /><div className="relative mx-auto grid max-w-[1380px] gap-16 px-5 sm:px-8 lg:grid-cols-[.82fr_1.18fr] lg:items-center"><div><p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#ce7bff]">Built under operating pressure</p><h2 className="text-5xl font-bold leading-[.94] tracking-[-.06em] sm:text-7xl">Built around real businesses. Not a blank chat box.</h2><p className="mt-7 max-w-xl text-lg leading-relaxed text-white/55">From D Zone’s products, orders and margins to Webaholics’ clients, leads and projects, OneApp connects the work businesses do every day. That context makes AI assistance more useful—and keeps your team grounded in what’s actually happening.</p><div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">{["Real customers", "Real workflows", "People + AI"].map(item => <div key={item} className="flex items-center gap-2 bg-[#111019] px-5 py-5 text-sm text-white/65"><Check className="h-4 w-4 text-[#69f7d3]" />{item}</div>)}</div></div>
    <div className="relative min-h-[540px]"><div className="absolute inset-0 rotate-2 rounded-[36px] border border-[#c153ff]/30 bg-gradient-to-br from-[#25152f] to-[#101017]" /><div className="absolute inset-5 -rotate-2 rounded-[30px] border border-white/10 bg-[#15121b] p-7 shadow-2xl sm:p-10"><div className="flex items-center justify-between border-b border-white/10 pb-6"><span className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-white/40">D-Zone operating loop</span><span className="rounded-full bg-[#69f7d3]/10 px-3 py-1 font-mono text-[9px] text-[#69f7d3]">LIVE PROVING GROUND</span></div><div className="grid h-[420px] place-items-center"><div className="relative grid h-44 w-44 place-items-center rounded-full border border-[#c153ff]/30 bg-[#201528] shadow-[0_0_90px_rgba(184,80,255,.22)]"><div className="grid h-24 w-24 place-items-center rounded-[28px] bg-gradient-to-br from-[#ce6bff] to-[#682ee8]"><div className="relative h-[23px] w-14 overflow-hidden"><Image src="/powersports/oa-badge.png" alt="OA logo" width={55} height={46} unoptimized className="absolute left-0 top-[-8px] h-auto w-14 max-w-none brightness-0" /></div></div>{nodes.map(x => <span key={x.t} className={`absolute ${x.p} rounded-xl border border-white/10 bg-[#211a29] px-4 py-2 font-mono text-[10px] uppercase tracking-[.12em] text-white/55`}>{x.t}</span>)}</div></div></div></div>
  </div></section>;
}

export function WebaholicsBridge({ tone = "blue" }: { tone?: "blue" | "white" }) {
  const blue = tone === "blue";
  return (
    <section id="webaholics" className={`scroll-mt-20 py-20 sm:py-24 ${blue ? "bg-[#1265c4] text-white" : "bg-white text-[#1265c4]"}`}>
      <div className="mx-auto grid max-w-[1380px] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_320px] lg:items-center">
        <div>
          <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[.2em]">Included for every Webaholics client</p>
          <h2 className="max-w-4xl text-5xl font-bold leading-[.92] tracking-[-.065em] sm:text-7xl">Your platform.<br />Your team.<br />Working together.</h2>
          <p className={`mt-7 max-w-2xl text-lg leading-relaxed ${blue ? "text-white/90" : "text-[#243b53]"}`}>Every Webaholics client gets access to OneApp—a shared place to see performance, manage customer relationships and coordinate the work ahead.</p>
          <p className={`mt-4 max-w-2xl text-lg leading-relaxed ${blue ? "text-white/90" : "text-[#243b53]"}`}>Webaholics helps set up the platform around your business and supports your team as you use it.</p>
        </div>
        <div className="flex flex-col items-start gap-8 lg:items-center">
          <Image src={blue ? WEBAHOLICS_WHITE_PNG : "/webaholics-wordmark-blue.png"} alt="Webaholics" width={1000} height={171} unoptimized={blue} className="h-auto w-[280px] max-w-full lg:w-[310px]" />
          <a href="https://www.webaholics.ai/" target="_blank" rel="noreferrer" className={`group flex items-center justify-center gap-3 rounded-full px-6 py-4 text-sm font-bold transition hover:scale-[1.02] ${blue ? "bg-white text-[#1265c4]" : "bg-[#1265c4] text-white"}`}>Explore working with Webaholics <ArrowRight className="h-5 w-5 shrink-0 transition group-hover:translate-x-1" /></a>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return <section id="demo" className="scroll-mt-20 bg-[#f3f1f5] py-24 sm:py-32"><div className="mx-auto max-w-[1380px] px-5 sm:px-8"><div className="relative overflow-hidden rounded-[36px] bg-[#17131d] px-7 py-16 text-center text-white sm:px-14 sm:py-24"><div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:48px_48px]" /><div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a83cff]/25 blur-[100px]" /><div className="relative"><Sparkles className="mx-auto mb-6 h-8 w-8 text-[#cf79ff]" /><p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#cf79ff]">Platform walkthrough</p><h2 className="mx-auto mt-6 max-w-4xl text-5xl font-bold leading-[.94] tracking-[-.06em] sm:text-7xl">See what OneApp could do for your business.</h2><p className="mx-auto mt-7 max-w-2xl text-lg text-white/50">Tell us how your business works. We’ll show you how OneApp and Webaholics can help connect the people, information and work behind your growth.</p><DemoRequestForm /></div></div></div></section>;
}

export function OneAppPageContent() {
  return <main className="overflow-hidden bg-[#0b0a10]"><Navigation /><Hero /><CommerceRail /><PlatformModules /><MobilePwa /><Proof /><FinalCta /><WebaholicsBridge /><footer className="border-t border-white/10 bg-[#0b0a10] py-10 text-white/35"><div className="mx-auto flex max-w-[1380px] flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between"><Logo /><div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs"><p>© 2026 OneApp. An AI workforce platform for business growth.</p><a href="https://prod.oneapp.today/" className="inline-flex min-h-11 items-center text-white/70 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Client login</a><Link href="/privacy" className="transition hover:text-white">Privacy</Link><a href="mailto:info@oneapp.today" className="transition hover:text-white">Contact</a></div></div></footer></main>;
}
