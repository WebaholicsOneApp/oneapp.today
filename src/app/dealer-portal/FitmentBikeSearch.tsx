'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Check, ChevronRight, LoaderCircle, Package, Search } from 'lucide-react';
import Image from 'next/image';
import type { Bike, FitmentProduct } from '../api/dealer-fitment/catalog';
import styles from './DZoneFitmentShowcase.module.css';

type OptionState = { items: string[]; loading: boolean; error: string };
function useOptions(action: string, year = '', make = '', enabled = true, retry = 0) {
  const [state, setState] = useState<OptionState>({ items: [], loading: enabled, error: '' });
  useEffect(() => {
    if (!enabled) { setState({ items: [], loading: false, error: '' }); return; }
    const controller = new AbortController();
    setState({ items: [], loading: true, error: '' });
    const params = new URLSearchParams({ action, year, make });
    fetch(`/api/dealer-fitment?${params}`, { signal: controller.signal })
      .then(async response => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Unable to load bike options.');
        if (!controller.signal.aborted) setState({ items: data.options, loading: false, error: '' });
      })
      .catch(error => { if (!controller.signal.aborted) setState({ items: [], loading: false, error: error.message }); });
    return () => controller.abort();
  }, [action, year, make, enabled, retry]);
  return state;
}

export function FitmentBikeSearch() {
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [search, setSearch] = useState('');
  const [retry, setRetry] = useState(0);
  const years = useOptions('years', '', '', true, retry);
  const makes = useOptions('makes', year, '', Boolean(year), retry);
  const models = useOptions('models', year, make, Boolean(year && make), retry);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ bike: Bike; search: string; products: FitmentProduct[] } | null>(null);
  const request = useRef<AbortController | null>(null);
  const results = useRef<HTMLDivElement>(null);
  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => {
    if (!result || !results.current) return;
    const panel = results.current.closest<HTMLElement>('[data-demo-stage]');
    if (panel) panel.scrollTop += results.current.getBoundingClientRect().top - panel.getBoundingClientRect().top - 16;
  }, [result]);

  function clearResult() {
    request.current?.abort();
    setPending(false); setResult(null); setError('');
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!year || !make || !model) return;
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setPending(true); setError(''); setResult(null);
    const bike = { year, make, model };
    try {
      const response = await fetch(`/api/dealer-fitment?${new URLSearchParams({ action: 'products', ...bike, search })}`, { signal: controller.signal });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to search the catalog.');
      if (!controller.signal.aborted) setResult({ bike, search, products: data.products });
    } catch (failure) { if (!controller.signal.aborted) setError((failure as Error).message); }
    finally { if (!controller.signal.aborted) setPending(false); }
  }

  const optionError = years.error || makes.error || models.error;
  return (
    <div className={styles.liveSearch}>
      <div className={styles.greeting}>Your turn. Choose a bike and I’ll look up parts with matching fitment records.</div>
      <form onSubmit={submit} className={styles.bikeForm} aria-label="Find parts for your bike">
        <div className={styles.bikeFields}>
          <label>Year<select value={year} onChange={event => { setYear(event.target.value); setMake(''); setModel(''); clearResult(); }} disabled={years.loading || Boolean(years.error)} required><option value="">{years.loading ? 'Loading…' : 'Select year'}</option>{years.items.map(value => <option key={value}>{value}</option>)}</select></label>
          <label>Make<select value={make} onChange={event => { setMake(event.target.value); setModel(''); clearResult(); }} disabled={!year || makes.loading || Boolean(makes.error)} required><option value="">{makes.loading ? 'Loading…' : 'Select make'}</option>{makes.items.map(value => <option key={value}>{value}</option>)}</select></label>
          <label>Model<select value={model} onChange={event => { setModel(event.target.value); clearResult(); }} disabled={!make || models.loading || Boolean(models.error)} required><option value="">{models.loading ? 'Loading…' : 'Select model'}</option>{models.items.map(value => <option key={value}>{value}</option>)}</select></label>
        </div>
        <label className={styles.partLabel}>Looking for a particular part? <span>Optional</span><input value={search} onChange={event => { setSearch(event.target.value); clearResult(); }} maxLength={80} placeholder="e.g. brake pads, sprockets" /></label>
        {optionError ? <div className={styles.searchError} role="alert"><p>{optionError}</p><button type="button" onClick={() => setRetry(value => value + 1)}>Retry bike options</button></div> : <button className={styles.findButton} disabled={!year || !make || !model || pending || models.loading} type="submit">{pending ? <LoaderCircle size={15} className={styles.spinner} /> : <Search size={15} />}{pending ? 'Checking fitment…' : 'Find matching parts'}</button>}
        {!optionError && year && !makes.loading && !makes.items.length && <p className={styles.emptyHint}>No makes are listed for this year. Try another year.</p>}
        {!optionError && make && !models.loading && !models.items.length && <p className={styles.emptyHint}>No models are listed for this selection. Try another make.</p>}
      </form>
      <div role="status" aria-live="polite" aria-atomic="true" className={styles.resultStatus}>{pending ? 'Searching the catalog for confirmed fitment matches.' : error || (result ? `${result.products.length ? `${result.products.length} matching product${result.products.length === 1 ? '' : 's'} shown` : 'No confirmed matches found'} for ${result.bike.year} ${result.bike.make} ${result.bike.model}.` : '')}</div>
      {error && <p className={styles.searchError}>{error} You can use “Find matching parts” to retry.</p>}
      {result && <div ref={results} className={styles.liveResults}>
        <button type="button" className={styles.editSearch} onClick={() => {
          const panel = results.current?.closest<HTMLElement>('[data-demo-stage]');
          if (panel) { panel.scrollTop = 0; panel.querySelector('select')?.focus({ preventScroll: true }); }
        }}>Edit bike or part search ↑</button>
        <div className={styles.vehicle}><Check size={13} /><span>{result.bike.year} {result.bike.make} {result.bike.model}</span><small>YOUR BIKE</small></div>
        <div className={styles.reply}>{result.products.length ? 'Here are parts with fitment records matching your bike. Open a product to review the fitting variants.' : `I couldn’t confirm ${result.search ? `a match for “${result.search}”` : 'matching parts'} for this bike. ${result.search ? 'Try a broader part name or leave the part field blank.' : 'Try another bike or check back as the catalog grows.'}`}</div>
        {result.products.length > 0 && <div className={styles.products}>{result.products.map(product => <a key={product.url} className={styles.product} href={product.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${product.name} on D-Zone (opens in a new tab)`}>
          <span className={`${styles.productImage} ${styles.liveProductImage}`}><Package size={23} />{product.image && (product.image.startsWith('/dealer-portal/') ? <Image src={product.image} width={64} height={64} sizes="47px" alt="" /> : <img src={product.image} width={47} height={47} alt="" loading="lazy" onError={event => { event.currentTarget.style.visibility = 'hidden'; }} />)}</span>
          <div><small>{product.brand}</small><strong>{product.name}</strong><span><Check size={11} /> Fitment matched · Review variants</span>{product.price !== null && <em>Matching variant: {(product.price / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</em>}</div><ChevronRight size={16} />
        </a>)}</div>}
      </div>}
    </div>
  );
}
