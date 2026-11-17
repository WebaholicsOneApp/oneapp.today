const plans = [
  { name: 'Starter', price: 249, skus: '1,000', contacts: '5,000', ai: '1,000', voice: '100', support: 'Email support' },
  { name: 'Growth', price: 349, skus: '5,000', contacts: '25,000', ai: '3,000', voice: '300', support: 'Priority support' },
  { name: 'Scale', price: 549, skus: '20,000', contacts: '100,000', ai: '10,000', voice: '750', support: 'Priority support' },
];

const planCards = plans.map(({ name, price, skus, contacts, ai, voice, support }) => `
  <article class="dealer-plan">
    <h3>${name}</h3>
    <p class="dealer-plan-price"><strong>$${price}</strong> <span>USD / month</span></p>
    <ul>
      <li><strong>${skus}</strong> active synced SKUs</li>
      <li><strong>${contacts}</strong> stored contacts</li>
      <li><strong>${ai}</strong> AI usage units / month</li>
      <li><strong>${voice}</strong> AI voice minutes / month</li>
      <li>${support}</li>
    </ul>
  </article>`).join('');

export const dealerPricingMarkup = `
  <section class="dealer-pricing-section" id="pricing" aria-labelledby="dealer-pricing-title">
    <div class="shell">
      <div class="dealer-pricing-heading">
        <div>
          <p class="eyebrow">PROPOSED ONEAPP ECOMMERCE PRICING</p>
          <h2 id="dealer-pricing-title">Pick a plan for your catalog.</h2>
        </div>
        <p>Choose a monthly OneApp software subscription based on the size of your active catalog and your team’s usage.</p>
      </div>
      <div class="dealer-plan-grid">${planCards}</div>
      <p class="dealer-pricing-note">Active synced SKUs count sellable products managed by OneApp. Stored supplier catalogs are separate. Pilot setup and integrations are scoped separately. Your pilot proposal confirms plan allowances, hosting, and any additional usage charges. <a class="pilot-pricing-link" href="/pricing?offer=ecommerce">See full OneApp ecommerce pricing</a>.</p>

      <section class="dealer-agency" aria-labelledby="dealer-agency-title">
        <div class="dealer-agency-copy">
          <p class="eyebrow">OPTIONAL WEBAHOLICS AGENCY SERVICES</p>
          <h3 id="dealer-agency-title">Performance-based agency fees</h3>
          <p>A Webaholics ecommerce proposal can include a monthly agency fee plus a fee tied to eligible added net sales or extra orders. The performance fee starts after agreed costs and the reserve are covered. Your proposal sets the baseline and defines which sales or orders count.</p>
          <a class="dealer-agency-link" href="https://www.webaholics.ai/pricing?offer=ecommerce">See Webaholics pricing <span aria-hidden="true">↗</span></a>
        </div>
        <dl class="dealer-pricing-basis">
          <div><dt>OneApp software</dt><dd>A monthly subscription based on the plan you choose.</dd></div>
          <div><dt>Webaholics agency</dt><dd>A separate proposal based on the work and results you agree on.</dd></div>
        </dl>
      </section>
    </div>
  </section>`;
