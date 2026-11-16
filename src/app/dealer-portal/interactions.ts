import { initializeCustomAnalytics } from './customAnalytics';

function groupForecastDigits(value: string) {
  const parts = /^([+-]?)(\d*)(\.\d*)?$/.exec(value);
  if (!parts) return value;
  const [, sign = '', integer = '', fraction = ''] = parts;
  const firstGroup = integer.length % 3 || 3;
  return sign + integer.slice(0, firstGroup) + integer.slice(firstGroup).replace(/\d{3}/g, ',$&') + fraction;
}

function forecastCaretIndex(value: string, offset: number, afterComma: boolean) {
  let index = 0;
  while (index < value.length && offset > 0) {
    if (value[index++] !== ',') offset--;
  }
  return afterComma && value[index] === ',' ? index + 1 : index;
}

// All queries and listeners are scoped to the route. Abort them on navigation
// so remounts and React Strict Mode cannot register duplicate handlers.
export function initializeDealerPortal(root: HTMLElement) {
  const listeners = new AbortController();
  const get = <T extends HTMLElement = HTMLElement>(id: string): T => {
    const element = root.querySelector<T>(`#${id}`);
    if (!element) throw new Error(`Missing dealer portal element: ${id}`);
    return element;
  };
  const all = <T extends HTMLElement = HTMLElement>(selector: string) =>
    [...root.querySelectorAll<T>(selector)];
  const text = (id: string, value: string) => { get(id).textContent = value; };
  const dollars = (value: number) => new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD',
  }).format(value);
  const money = (value: number) => new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0,
  }).format(value);
  const count = (value: number) => new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
  }).format(value);

  const products = {
    plate: { name: 'Trail skid plate', label: 'skid plate', retail: 140, wholesale: 84 },
    helmet: { name: 'Adventure helmet', label: 'helmet', retail: 200, wholesale: 120 },
    lights: { name: 'LED light kit', label: 'light kit', retail: 110, wholesale: 68 },
  };
  type ProductKey = keyof typeof products;
  type Access = 'retail' | 'wholesale';
  const selectedProducts = new Set<ProductKey>(['plate']);
  let access: Access = 'retail';

  function updateCart() {
    const wholesale = access === 'wholesale';
    const items = [...selectedProducts].map(key => ({ ...products[key], price: products[key][access] }));
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    const shipping = items.length ? 12 : 0;
    const handling = items.length && wholesale ? 3 : 0;
    const total = dollars(subtotal + shipping + handling);
    // Product data is authored here; no visitor text is interpolated as HTML.
    get('cart-items').innerHTML = items.length
      ? items.map(item => `<div class="cart-item"><span>${item.name}</span><strong>${dollars(item.price)}</strong></div>`).join('')
      : '<div class="cart-item"><span>Add a product to try the example.</span></div>';
    text('cart-subtotal', dollars(subtotal));
    text('cart-shipping', dollars(shipping));
    text('cart-handling', dollars(handling));
    get('cart-handling-row').hidden = !wholesale;
    text('cart-total', total);
    text('cart-count', String(items.length));
    text('cart-delivery-label', wholesale ? 'SHIP DIRECTLY TO YOUR CUSTOMER' : 'SHIP TO YOUR ADDRESS');
    all('[data-price]').forEach(element => {
      const key = element.dataset.price as ProductKey;
      element.textContent = dollars(products[key][access]);
    });
    all('.product-price-type').forEach(element => { element.textContent = wholesale ? 'Wholesale' : 'Retail'; });
    all('[data-retail-reference]').forEach(element => { element.hidden = !wholesale; });
    all('.stock-dot').forEach(element => { element.textContent = wholesale ? 'Dropship eligible · Dealer terms' : 'Ships direct from the brand'; });
    all('.catalog-add').forEach(button => {
      const key = button.dataset.product as ProductKey;
      const selected = selectedProducts.has(key);
      button.classList.toggle('added', selected);
      button.setAttribute('aria-pressed', String(selected));
      button.setAttribute('aria-label', `${selected ? 'Remove' : 'Add'} ${products[key].label} ${selected ? 'from' : 'to'} example cart`);
      button.innerHTML = selected ? 'Added <span>✓</span>' : `${wholesale ? 'Add to order' : 'Add to cart'} <span>+</span>`;
    });
    text('cart-announcement', `${wholesale ? 'Wholesale' : 'Retail'} preview. ${items.length} products. Example total ${total}. No order is placed.`);
  }

  function selectAccess(mode: Access) {
    access = mode;
    const wholesale = mode === 'wholesale';
    get('wholesale-demo').dataset.access = mode;
    all<HTMLButtonElement>('.storefront-view-switch [role="tab"]').forEach(button => {
      const selected = button.dataset.access === mode;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    get('storefront-panel').setAttribute('aria-labelledby', `storefront-${mode}-tab`);
    get('storefront-account').innerHTML = wholesale ? 'Trail Supply <span>✓</span>' : 'Dealer login <span>→</span>';
    get('storefront-account').setAttribute('aria-label', wholesale ? 'Preview retail storefront' : 'Preview wholesale dealer access');
    text('storefront-brand-mode', wholesale ? 'DEALER STORE' : 'OUTDOOR & MOTO');
    text('storefront-access-copy', wholesale ? '✓ Wholesale pricing · Approved dealer: Trail Supply' : 'Retail prices · Direct from RidgeMoto');
    text('storefront-collection-label', wholesale ? 'RIDGEMOTO / DEALER COLLECTION' : 'RIDGEMOTO / RETAIL COLLECTION');
    text('storefront-cart-state', wholesale ? 'Wholesale · Ship to your customer' : 'Retail · Delivery to your address');
    text('storefront-mode-note', wholesale ? 'Approved dealer preview · Wholesale pricing and customer delivery.' : 'Retail checkout preview · Switch to wholesale for dealer pricing.');
    updateCart();
  }

  const asset = (name: string) => `/dealer-portal/previews/${name}.svg`;
  const screens = {
    analytics: { title: 'Home analytics', image: asset('home-analytics'), alt: 'Illustrative OneApp home analytics with daily revenue, gross profit, prior-period revenue lines, and dealer storefront totals', caption: 'Follow daily revenue and gross profit, compare the prior period, and see which dealer storefronts drive sales.' },
    labels: { title: 'Fulfillment activity', image: asset('label-activity'), alt: 'Illustrative OneApp fulfillment dashboard comparing orders received and labels created with packing and tracking events', caption: 'Track orders received, labels created, packages ready for pickup, and the latest fulfillment events.' },
    quality: { title: 'Fulfillment quality', image: asset('fulfillment-quality'), alt: 'Illustrative OneApp fulfillment quality: 97.8 percent same-day dispatch, 14 minutes 23 seconds median time to label, 99.8 percent order accuracy, and zero mis-ships this week', caption: 'Example performance: 97.8% same-day dispatch, 14m 23s median time to label, 99.8% order accuracy, and 0 mis-ships this week. Illustrative demo data.' },
  };
  const fulfillment = {
    orders: { title: 'Dealer orders', image: asset('order-queue'), alt: 'Illustrative OneApp dealer order queue with stock, payment, and ship-by checks', caption: 'Review dealer orders, confirm inventory, and send each accepted order to fulfillment.' },
    pack: { title: 'Pick, pack & ship', image: asset('pick-pack'), alt: 'Illustrative OneApp pick list, warehouse location, packing checks, and shipping label preview', caption: 'Give your team a clear pick list, package details, and checks before dispatch.' },
    shipment: { title: 'Shipment detail', image: asset('shipment-detail'), alt: 'Illustrative OneApp shipment timeline with confirmation, pick and pack, label creation, and dealer tracking updates', caption: 'Keep the shipment timeline and tracking attached to the original dealer order.' },
  };
  type ScreenshotKey = keyof typeof screens;
  type ScreenKey = 'custom' | ScreenshotKey;
  type FulfillmentKey = keyof typeof fulfillment;
  type Screen = (typeof screens)[ScreenshotKey];
  let currentScreen: ScreenKey = 'custom';
  let currentFulfillment: FulfillmentKey = 'orders';
  const dialog = get<HTMLDialogElement>('ops-dialog');
  const customAnalytics = get('ops-custom-analytics');
  initializeCustomAnalytics(customAnalytics, listeners.signal);

  function showPreview(screen: Screen) {
    text('ops-dialog-title', screen.title);
    const image = get<HTMLImageElement>('ops-dialog-image');
    image.src = screen.image;
    image.alt = screen.alt;
    text('ops-dialog-caption', screen.caption);
    if (!dialog.open) dialog.showModal();
  }

  function selectScreen(key: ScreenKey) {
    currentScreen = key;
    const screen = key === 'custom' ? undefined : screens[key];
    all<HTMLButtonElement>('.ops-tab').forEach(button => {
      const selected = button.dataset.screen === key;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    get('ops-panel').setAttribute('aria-labelledby', `ops-tab-${key}`);
    get('ops-panel').dataset.screen = key;
    customAnalytics.hidden = !!screen;
    get('ops-enlarge').hidden = !screen;
    get('ops-image-button').hidden = !screen;
    get('ops-screenshot-caption').hidden = !screen;
    text('ops-screen-title', screen?.title ?? 'Custom analytics');
    if (!screen) return;
    const image = get<HTMLImageElement>('ops-image');
    image.src = screen.image;
    image.alt = screen.alt;
    text('ops-caption-copy', screen.caption);
    ['ops-enlarge', 'ops-image-button'].forEach(id => get(id).setAttribute('aria-label', `Enlarge the OneApp ${screen.title.toLowerCase()} screenshot`));
  }

  function selectFulfillment(key: FulfillmentKey) {
    currentFulfillment = key;
    const screen = fulfillment[key];
    all<HTMLButtonElement>('[data-fulfillment]').forEach(button => {
      const selected = button.dataset.fulfillment === key;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    const image = get<HTMLImageElement>('fulfillment-image');
    image.src = screen.image;
    image.alt = screen.alt;
    text('fulfillment-screen-title', screen.title);
    text('fulfillment-caption', screen.caption);
    get('fulfillment-panel').setAttribute('aria-labelledby', `fulfillment-tab-${key}`);
    get('fulfillment-enlarge').setAttribute('aria-label', `Enlarge ${screen.title.toLowerCase()} preview`);
  }

  function closeMenu() {
    get('navigation').classList.remove('open');
    const button = root.querySelector<HTMLButtonElement>('.menu-toggle');
    button?.setAttribute('aria-expanded', 'false');
    button?.setAttribute('aria-label', 'Open navigation');
  }

  const pilotFields = {
    orders: { input: get<HTMLInputElement>('pilot-orders'), max: 1_000_000, unit: '' },
    growth: { input: get<HTMLInputElement>('pilot-growth'), max: 1000, unit: '%' },
    averageOrder: { input: get<HTMLInputElement>('pilot-aov'), max: 1_000_000, unit: '$' },
    retailSales: { input: get<HTMLInputElement>('pilot-retail-sales'), max: 10_000_000, unit: '$' },
    retailGrowth: { input: get<HTMLInputElement>('pilot-retail-growth'), max: 1000, unit: '%' },
  } as const;
  const pilotNumber = new Intl.NumberFormat('en-US', { maximumFractionDigits: 20 });

  function readPilotField({ input, max }: (typeof pilotFields)[keyof typeof pilotFields]) {
    const value = input.value.replaceAll(',', '').trim();
    if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(value)) return null;
    return Math.min(max, Math.max(0, Number(value)));
  }

  function updateForecast() {
    const orders = readPilotField(pilotFields.orders) ?? 0;
    const growth = readPilotField(pilotFields.growth) ?? 0;
    const aov = readPilotField(pilotFields.averageOrder) ?? 0;
    const addedOrders = Math.round(orders * growth / 100);
    const wholesale = orders * aov;
    const wholesaleAdded = addedOrders * aov;
    const retail = readPilotField(pilotFields.retailSales) ?? 0;
    const retailAdded = retail * (readPilotField(pilotFields.retailGrowth) ?? 0) / 100;
    text('pilot-growth-target', `${count(growth)}% more`);
    text('pilot-extra-revenue', `+${money(wholesaleAdded)}`);
    text('pilot-retail-revenue', `+${money(retailAdded)}`);
    text('pilot-combined-revenue', `+${money(wholesaleAdded + retailAdded)}`);
    text('pilot-total-sales', `${money(wholesale + retail)} → ${money(wholesale + retail + wholesaleAdded + retailAdded)} combined monthly sales`);
  }

  function handleClick(event: MouseEvent) {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const button = target.closest<HTMLButtonElement>('button');
    if (target.closest('#navigation a')) closeMenu();
    if (target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    }
    if (!button) return;
    if (button.matches('.menu-toggle')) {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      get('navigation').classList.toggle('open', open);
    } else if (button.matches('.catalog-add')) {
      const key = button.dataset.product as ProductKey;
      selectedProducts.has(key) ? selectedProducts.delete(key) : selectedProducts.add(key);
      updateCart();
    } else if (button.matches('.storefront-categories button')) {
      const category = button.dataset.category;
      all('.storefront-categories button').forEach(item => {
        item.classList.toggle('selected', item === button);
        item.setAttribute('aria-pressed', String(item === button));
      });
      let matches = 0;
      all('.catalog-product').forEach(card => {
        card.hidden = category !== 'all' && card.dataset.category !== category;
        if (!card.hidden) matches++;
      });
      get('catalog-empty').hidden = matches !== 0;
    } else if (button.matches('.storefront-view-switch [role="tab"]')) {
      selectAccess(button.dataset.access as Access);
    } else if (button.id === 'storefront-account') {
      selectAccess(access === 'retail' ? 'wholesale' : 'retail');
    } else if (button.dataset.fulfillment) {
      selectFulfillment(button.dataset.fulfillment as FulfillmentKey);
    } else if (button.matches('.ops-tab')) {
      selectScreen(button.dataset.screen as ScreenKey);
    } else if (button.id === 'hero-enlarge') {
      showPreview({ title: 'Your OneApp dashboard', image: asset('hero-overview'), alt: 'Illustrative OneApp dealer growth dashboard', caption: 'A preview of dealer counts, daily storefront revenue, fulfillment speed, and dealer orders. All metrics are illustrative demo data.' });
    } else if (button.id === 'fulfillment-enlarge') {
      showPreview(fulfillment[currentFulfillment]);
    } else if (button.id === 'ops-enlarge' || button.id === 'ops-image-button') {
      if (currentScreen !== 'custom') showPreview(screens[currentScreen]);
    } else if (button.id === 'ops-dialog-close') {
      dialog.close();
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') closeMenu();
    const button = event.target;
    if (!(button instanceof HTMLButtonElement) || button.getAttribute('role') !== 'tab') return;
    const tabs = [...(button.closest('[role="tablist"]')?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? [])];
    const index = tabs.indexOf(button);
    let next: number | undefined;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    const selected = next === undefined ? undefined : tabs[next];
    if (!selected) return;
    event.preventDefault();
    selected.click();
    selected.focus();
  }

  root.addEventListener('click', handleClick, { signal: listeners.signal });
  root.addEventListener('keydown', handleKeydown, { signal: listeners.signal });
  for (const field of Object.values(pilotFields)) {
    const measure = field.input.parentElement?.querySelector('.revenue-percent-measure');
    const syncMeasure = () => { if (measure) measure.textContent = field.input.value; };
    const stripFormatting = (value: string) => {
      const ungrouped = value.replaceAll(',', '');
      return field.unit ? ungrouped.replaceAll(field.unit, '') : ungrouped;
    };
    field.input.addEventListener('input', event => {
      const { inputType, isComposing } = event as InputEvent;
      if (isComposing) {
        syncMeasure();
        return;
      }
      const { value, selectionStart, selectionEnd, selectionDirection } = field.input;
      const formatted = groupForecastDigits(stripFormatting(value));
      if (formatted !== value) {
        field.input.value = formatted;
        if (selectionStart !== null && selectionEnd !== null) {
          // Keep the same position among the digits. If a deletion restores a
          // comma, move past it in the direction of the deletion.
          const mapIndex = (index: number) => forecastCaretIndex(
            formatted,
            stripFormatting(value.slice(0, index)).length,
            inputType === 'deleteContentForward' ||
              (inputType !== 'deleteContentBackward' && value[index - 1] === ','),
          );
          field.input.setSelectionRange(
            mapIndex(selectionStart),
            mapIndex(selectionEnd),
            selectionDirection ?? undefined,
          );
        }
      }
      syncMeasure();
      updateForecast();
    }, { signal: listeners.signal });
    field.input.addEventListener('blur', () => {
      // Normalize the finished value without disturbing partial decimals while typing.
      const value = readPilotField(field);
      field.input.value = value === null ? '' : pilotNumber.format(value);
      syncMeasure();
    }, { signal: listeners.signal });
  }
  get('pilot-model-form').addEventListener('submit', event => event.preventDefault(), { signal: listeners.signal });
  selectAccess('retail');
  updateForecast();

  return () => {
    listeners.abort();
    if (dialog.open) dialog.close();
  };
}
