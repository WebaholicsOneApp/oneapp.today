import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Navigation } from "../../components/Navigation";
import { Footer } from "../../components/Footer";
import { growthPaths } from "../paths";

type Path = keyof typeof growthPaths;
export function generateStaticParams() { return Object.keys(growthPaths).map(path => ({path})); }
export async function generateMetadata({params}:{params:Promise<{path:string}>}):Promise<Metadata> {
 const {path}=await params; const p=growthPaths[path as Path]; if(!p)return {};
 return {title:`${p.label} | Webaholics`,description:p.intro,alternates:{canonical:`https://www.webaholics.ai/growth/${path}`},openGraph:{title:`${p.label} | Webaholics`,description:p.intro,url:`https://www.webaholics.ai/growth/${path}`}};
}
export default async function GrowthPage({params}:{params:Promise<{path:string}>}) {
 const {path}=await params; if(!Object.hasOwn(growthPaths,path))notFound(); const p=growthPaths[path as Path];
 return <main className="min-h-screen bg-[#0a0d14] text-white"><Navigation/>
 <section className="relative overflow-hidden px-6 pb-24 pt-36 lg:pt-44"><div className="mx-auto max-w-6xl"><Link href="/samples/webaholics#find-your-path" className="text-sm text-slate-400 hover:text-white">← Explore all growth paths</Link><p className="mt-12 font-mono text-xs uppercase tracking-[.18em] text-blue-400">{p.audience}</p><h1 className="mt-6 max-w-5xl text-5xl font-bold leading-[1.05] tracking-[-.05em] sm:text-7xl">{p.headline}</h1><p className="mt-8 max-w-3xl text-xl leading-relaxed text-slate-400">{p.intro}</p><Link href="/samples/webaholics#contact" className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 font-semibold text-slate-950">{p.cta}<ArrowRight className="h-4 w-4"/></Link><p className="mt-8 text-sm text-slate-500">{p.examples}</p></div></section>
 <section className="bg-[#edf2f8] px-6 py-20 text-[#13233b]"><div className="mx-auto max-w-6xl"><p className="font-mono text-xs uppercase tracking-widest text-blue-700">One team. The whole journey.</p><h2 className="mt-5 max-w-4xl text-3xl font-semibold leading-snug tracking-tight sm:text-4xl">{p.problem}</h2><div className="mt-10 flex flex-wrap gap-3">{p.steps.map((s,i)=><div key={s} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4"><span className="text-xs text-blue-600">0{i+1}</span><span className="text-sm font-medium">{s}</span></div>)}</div></div></section>
 <section className="px-6 py-24"><div className="mx-auto max-w-6xl"><h2 className="text-4xl font-bold tracking-tight">What our team brings to the table.</h2><div className="mt-10 grid gap-6 md:grid-cols-3">{p.work.map(([title,text],i)=><article key={title} className="rounded-2xl border border-white/10 bg-white/[.025] p-8"><p className="font-mono text-xs text-blue-400">0{i+1}</p><h3 className="mt-6 text-2xl font-semibold leading-tight">{title}</h3><p className="mt-5 text-sm leading-relaxed text-slate-400">{text}</p></article>)}</div><div className="mt-14 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-2"><div><p className="font-mono text-xs uppercase tracking-widest text-blue-400">Measure the right things</p><h2 className="mt-5 text-3xl font-semibold">Agree on success before we start.</h2><p className="mt-4 text-slate-400">We set the baseline with you and report on the outcomes that matter to your project.</p></div><ul className="space-y-4">{p.measures.map(m=><li key={m} className="flex items-center gap-3 text-lg"><Check className="h-5 w-5 text-blue-400"/>{m}</li>)}</ul></div></div></section>
 <section className="bg-blue-600 px-6 py-16"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-7 md:flex-row md:items-center"><div><h2 className="text-3xl font-semibold">Let's talk about your next step.</h2><p className="mt-3 text-blue-100">Your goals. Our team. AI that helps us deliver.</p></div><Link href="/samples/webaholics#contact" className="rounded-full bg-white px-7 py-4 text-center font-semibold text-blue-900">{p.cta}</Link></div></section><Footer/></main>;
}
