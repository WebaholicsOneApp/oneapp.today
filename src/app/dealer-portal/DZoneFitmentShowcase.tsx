'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Check, ChevronRight, MessageCircle, Pause, Play, RotateCcw, Search, Send } from 'lucide-react';
import styles from './DZoneFitmentShowcase.module.css';

const QUESTION = 'I ride a 2022 Yamaha YZ250F. Show me brake pads and sprockets that fit.';
const REPLY = 'I found brake pad sets and front sprockets matched to your bike in the D-Zone catalog. Choose a part below, and we can narrow down the variant.';
const DURATION = 12_000;
const BIKE_URL = 'https://thed.zone/parts/2022-yamaha-yz250-f-4-stroke?type=dirt_bike';
const products = [
  {
    name: 'Vortex SBS brake pad sets', category: 'BRAKING',
    image: '/dealer-portal/dzone-brake-pads.png',
    url: 'https://thed.zone/products/vortex-sbs-motorcycle-brake-pad-sets-604451?type=dirt_bike&year=2022&make=Yamaha&model=YZ250+F+4+STROKE',
  },
  {
    name: 'Vortex front sprockets', category: 'DRIVETRAIN',
    image: '/dealer-portal/dzone-front-sprocket.jpg',
    url: 'https://thed.zone/products/vortex-front-motorcycle-chain-sprockets-13799?type=dirt_bike&year=2022&make=Yamaha&model=YZ250+F+4+STROKE',
  },
];

/** Scripted conversation using catalog matches observed on the D-Zone bike page.
 * It never sends chat requests, creates leads, or changes the site's live widget.
 */
export function DZoneFitmentShowcase() {
  const preview = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const [elapsed, setElapsed] = useState(0);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => {
      setReducedMotion(media.matches);
      if (media.matches) { setElapsed(DURATION); setPlaying(false); }
    };
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    media.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.25));
    }, { threshold: 0.25 });
    if (preview.current) observer.observe(preview.current);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!visible || !playing || reducedMotion || !pageVisible || elapsed >= DURATION) return;
    const timer = window.setInterval(() => setElapsed(value => Math.min(DURATION, value + 50)), 50);
    return () => window.clearInterval(timer);
  }, [visible, playing, reducedMotion, pageVisible, elapsed >= DURATION]);

  const sent = elapsed >= 3000;
  const matched = elapsed >= 5000;
  const answering = elapsed >= 5500;
  const showProducts = elapsed >= 8500;
  const complete = elapsed >= DURATION;
  const typedQuestion = QUESTION.slice(0, Math.floor(Math.max(0, elapsed - 400) / 2400 * QUESTION.length));
  const typedReply = REPLY.slice(0, Math.floor(Math.max(0, elapsed - 5500) / 2600 * REPLY.length));
  const step = !sent ? 0 : !answering ? 1 : 2;

  useEffect(() => {
    if (scene.current) scene.current.scrollTop = showProducts ? scene.current.scrollHeight : 0;
  }, [showProducts]);

  function replay() {
    setElapsed(reducedMotion ? DURATION : 0);
    setPlaying(!reducedMotion);
  }

  return (
    <section id="fitment-chat" className={styles.showcase} aria-labelledby="fitment-chat-title">
      <div className={styles.layout}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}><MessageCircle size={15} /> THE D-ZONE CHATBOT EXAMPLE</p>
          <h2 id="fitment-chat-title" className={styles.heading}>It knows the bike.<br /><span>It finds the part.</span></h2>
          <p className={styles.description}>“What fits my bike?” should be the start of a sale. See how the D-Zone assistant can connect a rider’s question with the right catalog and fitment information.</p>
          <div className={styles.steps} aria-label="How fitment chat works">
            {[
              ['01', 'Start with the bike', 'Year, make, and model—in the rider’s own words.'],
              ['02', 'Use your product data', 'Match the request against catalog fitment records.'],
              ['03', 'Help them choose', 'Show relevant parts and clarify the right variant.'],
            ].map(([number, title, detail], index) => (
              <div className={`${styles.step} ${step === index ? styles.activeStep : ''}`} key={number}>
                <span>{number}</span><div><h3>{title}</h3><p>{detail}</p></div>
              </div>
            ))}
          </div>
          <p className={styles.brandNote}>This is D-Zone’s example. The opportunity for your brand: an assistant built around your own catalog, fitment data, and storefront.</p>
          <a className={styles.cta} href="mailto:adrian@webaholics.ai?subject=Fitment%20chat%20for%20our%20brand">Show me this for my brand <ArrowRight size={16} /></a>
        </div>

        <div ref={preview} className={styles.visual}>
          <figure className={styles.browser}>
            <div className={styles.browserBar}><span className={styles.browserDots} aria-hidden="true"><i /><i /><i /></span><span>thed.zone / fitment assistant</span><span className={styles.demoBadge}>ANIMATED EXAMPLE</span></div>
            <div className={styles.storeHeader}><img src="/dealer-portal/dzone-logo.png" width="156" height="38" alt="The D-Zone Motorsport Parts" /><span>Real bikes. The right parts.</span></div>
            <div className={styles.chatHeader}><span className={styles.chatAvatar}><MessageCircle size={21} /></span><div><strong>D-Zone Assistant</strong><span>Product &amp; fitment help</span></div><span className={styles.aiBadge}>AI</span></div>

            <div ref={scene} className={styles.scene} aria-hidden="true" data-demo-stage={complete ? 'complete' : showProducts ? 'results' : answering ? 'replying' : sent ? 'matching' : 'typing'}>
              <div className={styles.greeting}>What are you riding? Tell me the bike and the parts you’re looking for.</div>
              {sent && <div className={styles.question}>{QUESTION}</div>}
              {sent && !answering && <div className={styles.searching}><span className={styles.typingDots}><i /><i /><i /></span> Checking catalog fitment…</div>}
              {matched && <div className={styles.vehicle}><Check size={13} /><span>2022 Yamaha YZ250F</span><small>BIKE MATCHED</small></div>}
              {answering && <div className={styles.reply}>{typedReply}{!showProducts && <span className={styles.caret} />}</div>}
              {showProducts && <div className={styles.products}>{products.map(product => (
                <div className={styles.product} key={product.name}>
                  <span className={styles.productImage}><Image src={product.image} width={64} height={64} sizes="64px" alt="" /></span>
                  <div><small>{product.category}</small><strong>{product.name}</strong><span><Check size={11} /> Fits the selected bike · Choose variant</span></div>
                  <ChevronRight size={16} />
                </div>
              ))}</div>}
            </div>

            <div className={styles.composer} aria-hidden="true"><Search size={16} /><span>{sent ? 'Ask about products…' : typedQuestion || 'Ask about products…'}{!sent && <span className={styles.caret} />}</span><i><Send size={15} /></i></div>
            <div className={styles.poweredBy}>D-Zone’s storefront. Powered by OneApp.</div>
            <figcaption className={styles.caption}>Illustrative chat using D-Zone catalog matches. Choose the correct variant on the product page.</figcaption>
          </figure>

          <div className={styles.controls}>
            <span className={styles.progressLabel}><i className={complete ? styles.doneDot : ''} />{complete ? 'Example complete' : !playing ? 'Example paused' : ['A rider asks…', 'Checking the bike…', 'Parts, with context.'][step]}</span>
            <div>{!reducedMotion && !complete && <button type="button" onClick={() => setPlaying(value => !value)} aria-label={playing ? 'Pause fitment demo' : 'Play fitment demo'}>{playing ? <Pause size={13} /> : <Play size={13} />}{playing ? 'Pause' : 'Play'}</button>}<button type="button" onClick={replay} aria-label="Replay fitment demo"><RotateCcw size={13} /> Replay</button></div>
          </div>
          <div className={styles.progress} aria-hidden="true"><span style={{ width: `${elapsed / DURATION * 100}%` }} /></div>
          <details className={styles.transcript}><summary>Read the example conversation</summary><div><p><strong>Rider:</strong> {QUESTION}</p><p><strong>D-Zone Assistant:</strong> {REPLY}</p><ul>{products.map(product => <li key={product.name}><a href={product.url} target="_blank" rel="noopener noreferrer">{product.name} ↗</a></li>)}</ul><a className={styles.bikeLink} href={BIKE_URL} target="_blank" rel="noopener noreferrer">See this bike’s catalog on D-Zone ↗</a></div></details>
        </div>
      </div>
    </section>
  );
}
