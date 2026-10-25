import { ArrowRight, MessageCircle } from "lucide-react";

/** Illustrative copy, deliberately distinct from the working chat widget. */
export function WebsiteChatShowcase() {
  return (
    <section id="website-chat" aria-labelledby="website-chat-title" className="scroll-mt-20 border-t border-black/10 bg-[#f3f1f5] py-20 text-[#17131d] sm:py-28">
      <div className="mx-auto grid max-w-[1380px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div>
          <p className="mb-5 flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#8b26ca]"><MessageCircle className="h-4 w-4" /> AI website chat</p>
          <h2 id="website-chat-title" className="max-w-xl text-5xl font-bold leading-[.96] tracking-[-.06em] sm:text-6xl">A helpful first conversation.<br />A clearer next step.</h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-black/60">Help visitors understand your business, get answers and find the right next step. OneApp brings AI website chat into the same platform your team uses to manage customer conversations.</p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-black/60">Built around your business information—with your team available for the questions that need a person. For service businesses and commerce brands.</p>
          <a href="#demo" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#17131d] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#8b26ca] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b26ca]">See chat in your walkthrough <ArrowRight className="h-4 w-4" /></a>
        </div>
        <figure className="min-w-0 overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_20px_70px_rgba(20,10,30,.08)]">
          <div className="flex items-center gap-3 border-b border-black/10 px-6 py-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#8b26ca] text-white"><MessageCircle className="h-5 w-5" /></span>
            <div><p className="font-bold">Chat with OneApp</p><p className="mt-1 text-xs text-black/55">AI assistant · Example conversation</p></div>
          </div>
          <ol className="space-y-5 p-5 text-sm leading-relaxed sm:p-7 sm:text-base" aria-label="Illustrative website conversation">
            <li className="ml-8 rounded-2xl rounded-br-sm bg-[#8b26ca] p-4 text-white"><p className="mb-1 text-xs font-bold text-white/80">Visitor</p>We run a service business. Can OneApp help us manage leads and customer conversations?</li>
            <li className="mr-5 rounded-2xl rounded-bl-sm bg-[#f3f1f5] p-4"><p className="mb-1 text-xs font-bold text-[#8b26ca]">OneApp AI</p>Yes. Bring leads, follow-ups and customer conversations into one workspace. Where do most of your inquiries come from?</li>
            <li className="ml-8 rounded-2xl rounded-br-sm bg-[#8b26ca] p-4 text-white"><p className="mb-1 text-xs font-bold text-white/80">Visitor</p>Our website. We want faster answers without losing the personal touch.</li>
            <li className="mr-5 rounded-2xl rounded-bl-sm bg-[#f3f1f5] p-4"><p className="mb-1 text-xs font-bold text-[#8b26ca]">OneApp AI</p>Start with AI chat for common questions, with your team handling the conversations that need a person. Would a walkthrough of your lead-to-client process help?</li>
          </ol>
          <figcaption className="border-t border-black/10 px-6 py-4 text-xs leading-relaxed text-black/55">Illustrative example—not a live conversation. Your assistant is configured around your business.</figcaption>
        </figure>
      </div>
    </section>
  );
}
