'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Check, ChevronRight, MessageCircle, Pause, Play, RotateCcw, Search, Send } from 'lucide-react';
import styles from './DZoneFitmentShowcase.module.css';

const QUESTION = 'I ride a 2022 Yamaha YZ250F. Show me brake pads and sprockets that fit.';
const REPLY = 'I found brake pad sets and front sprockets matched to your bike in the catalog. Choose a part below, and we can narrow down the variant.';
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

/** Dealer-portal-only OneApp showcase: a scripted example and the existing fitment chatbot in an isolated frame. */
export function DZoneFitmentShowcase() {
  const preview = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const [elapsed, setElapsed] = useState(0);
  const [mode, setMode] = useState<'example' | 'live'>('example');
  const [started, setStarted] = useState(false);
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
      setVisible(Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.35));
    }, { threshold: 0.35, rootMargin: '0px 0px -48px 0px' });
    if (scene.current) observer.observe(scene.current);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!visible || mode !== 'example' || !playing || reducedMotion || !pageVisible || elapsed >= DURATION) return;
    setStarted(true);
    const timer = window.setInterval(() => setElapsed(value => Math.min(DURATION, value + 50)), 50);
    return () => window.clearInterval(timer);
  }, [visible, mode, playing, reducedMotion, pageVisible, elapsed >= DURATION]);

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
          <p className={styles.eyebrow}><MessageCircle size={15} /> ONEAPP FITMENT ASSISTANT</p>
          <h2 id="fitment-chat-title" className={styles.heading}>It knows the bike.<br /><span>It finds the part.</span></h2>
          <p className={styles.description}>“What fits my bike?” should be the start of a sale. Watch OneApp connect a rider’s question to the right parts. Then ask about your own bike and see what it finds.</p>
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
          <p className={styles.brandNote}>Your brand. Your catalog. OneApp does the matching. Try it here with D-Zone’s parts and fitment data, then picture it on your own storefront.</p>
          <a className={styles.cta} href="mailto:adrian@webaholics.ai?subject=Fitment%20chat%20for%20our%20brand">Show me this for my brand <ArrowRight size={16} /></a>
        </div>

        <div ref={preview} className={styles.visual}>
          <figure className={styles.browser}>
            <div className={styles.browserBar}><span className={styles.browserDots} aria-hidden="true"><i /><i /><i /></span><span>OneApp / fitment assistant</span><span className={styles.demoBadge}>{mode === 'example' ? 'ANIMATED EXAMPLE' : 'LIVE CHAT DEMO'}</span></div>
            <div className={styles.storeHeader}><Image src="/oneapp-logo.png" width={128} height={38} alt="OneApp" /><span>Your catalog. A smarter conversation.</span></div>
            {mode === 'example' && <div className={styles.chatHeader}><span className={styles.chatAvatar}><MessageCircle size={21} /></span><div><strong>OneApp Assistant</strong><span>Product &amp; fitment help</span></div><span className={styles.aiBadge}>AI</span></div>}

            <div className={styles.modeTabs} aria-label="Fitment demo mode"><button type="button" aria-pressed={mode === 'example'} onClick={() => setMode('example')}>Watch example</button><button type="button" aria-pressed={mode === 'live'} onClick={() => setMode('live')}>Try your bike <ArrowRight size={13} /></button></div>
            <div ref={scene} className={`${styles.scene} ${mode === 'live' ? styles.liveScene : ''}`} aria-hidden={mode === 'example'} data-demo-stage={mode === 'live' ? 'interactive' : !started && !reducedMotion ? 'waiting' : complete ? 'complete' : showProducts ? 'results' : answering ? 'replying' : sent ? 'matching' : 'typing'}>
              {mode === 'live' ? <iframe className={styles.liveChatFrame} src="/dealer-portal/live-chat" title="Live OneApp fitment chatbot" referrerPolicy="same-origin" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" /> : <>
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
              </>}
            </div>

            {mode === 'example' && <div className={styles.composer} aria-hidden="true"><Search size={16} /><span>{sent ? 'Ask about products…' : typedQuestion || 'Ask about products…'}{!sent && <span className={styles.caret} />}</span><i><Send size={15} /></i></div>}
            {mode === 'example' && <div className={styles.poweredBy}>OneApp Assistant · Built for your storefront</div>}
            <figcaption className={styles.caption}>{mode === 'example' ? 'Illustrative conversation. Select “Try your bike” to chat with the real assistant.' : 'OneApp demo using D-Zone’s existing chatbot and fitment data. Product links open on D-Zone.'}</figcaption>
          </figure>

          {mode === 'example' && <><div className={styles.controls}>
            <span className={styles.progressLabel}><i className={complete ? styles.doneDot : ''} />{!started && !reducedMotion ? 'Plays when you scroll into view' : complete ? 'Example complete' : !playing ? 'Example paused' : ['A rider asks…', 'Checking the bike…', 'Parts, with context.'][step]}</span>
            <div>{started && !reducedMotion && !complete && <button type="button" onClick={() => setPlaying(value => !value)} aria-label={playing ? 'Pause fitment demo' : 'Play fitment demo'}>{playing ? <Pause size={13} /> : <Play size={13} />}{playing ? 'Pause' : 'Play'}</button>}<button type="button" onClick={replay} aria-label="Replay fitment demo"><RotateCcw size={13} /> Replay</button></div>
          </div>
          <div className={styles.progress} aria-hidden="true"><span style={{ width: `${elapsed / DURATION * 100}%` }} /></div>
          <details className={styles.transcript}><summary>Read the example conversation</summary><div><p><strong>Rider:</strong> {QUESTION}</p><p><strong>OneApp Assistant:</strong> {REPLY}</p><ul>{products.map(product => <li key={product.name}><a href={product.url} target="_blank" rel="noopener noreferrer">{product.name} ↗</a></li>)}</ul><a className={styles.bikeLink} href={BIKE_URL} target="_blank" rel="noopener noreferrer">See this bike’s catalog on D-Zone ↗</a></div></details></>}
        </div>
      </div>
    </section>
  );
}
