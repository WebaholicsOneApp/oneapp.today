import {
  analyticsMetrics,
  getAnalyticsSeries,
  type AnalyticsChannel,
  type AnalyticsMetric,
  type AnalyticsPeriod,
} from './analyticsData';

const channels = {
  all: 'All channels',
  wholesale: 'Dealer wholesale',
  retail: 'Retail storefront',
} satisfies Record<AnalyticsChannel, string>;

function chartMarkup(
  points: ReturnType<typeof getAnalyticsSeries>['points'],
  metric: AnalyticsMetric,
  compare: boolean,
  bars: boolean,
) {
  const definition = analyticsMetrics[metric];
  const values = points.flatMap(point => compare ? [point.current, point.previous] : [point.current]);
  const max = Math.max(...values);
  const stepSize = (max || 1) / 4;
  const magnitude = 10 ** Math.floor(Math.log10(stepSize));
  const step = ([1, 2, 2.5, 5, 10].find(value => value * magnitude >= stepSize) ?? 10) * magnitude;
  const ceiling = metric === 'sameDay' ? 100 : step * 4;
  const floor = metric === 'sameDay' && !bars
    ? Math.max(0, Math.min(95, Math.floor((Math.min(...values) - 1) / 5) * 5))
    : 0;
  const plotWidth = 1000;
  const plotHeight = 230;
  const pointWidth = plotWidth / points.length;
  const x = (index: number) => pointWidth * (index + 0.5);
  const y = (value: number) => (ceiling - value) / (ceiling - floor) * (plotHeight - 2) + 1;
  const yLabels = Array.from({ length: 5 }, (_, index) => {
    const value = ceiling - index * (ceiling - floor) / 4;
    return `<span>${definition.axis(value)}</span>`;
  }).join('');
  const seriesKeys = compare ? ['previous', 'current'] as const : ['current'] as const;
  const marks = seriesKeys.map(key => {
    if (bars) {
      const barWidth = Math.min(46, pointWidth * (compare ? 0.32 : 0.58));
      const offset = compare ? (key === 'current' ? 1 : -1) * barWidth * 0.59 : 0;
      return points.map((point, index) => `<rect class="ca-bar ca-${key}" x="${x(index) + offset - barWidth / 2}" y="${y(point[key])}" width="${barWidth}" height="${plotHeight - y(point[key])}" rx="2"/>`).join('');
    }
    const coordinates = points.map((point, index) => `${x(index)},${y(point[key])}`).join(' ');
    const area = key === 'current'
      ? `<polygon class="ca-fill" points="${x(0)},${plotHeight} ${coordinates} ${x(points.length - 1)},${plotHeight}"/>`
      : '';
    return `${area}<polyline class="ca-line ca-${key}" points="${coordinates}"/>`;
  }).join('');
  const firstLabel = points.at(0)?.label ?? '';
  const middleLabel = points.at(Math.floor((points.length - 1) / 2))?.label ?? '';
  const lastLabel = points.at(-1)?.label ?? '';

  return `<div class="ca-chart" aria-hidden="true">
    <div class="ca-y-axis">${yLabels}</div>
    <div class="ca-plot">
      <svg viewBox="0 0 ${plotWidth} ${plotHeight}" preserveAspectRatio="none">
        ${marks}
      </svg>
    </div>
    <div class="ca-x-axis"><span>${firstLabel}</span><span>${middleLabel}</span><span>${lastLabel}</span></div>
  </div>`;
}

function report(metric: AnalyticsMetric, channel: AnalyticsChannel, days: AnalyticsPeriod, compare: boolean, bars: boolean) {
  const definition = analyticsMetrics[metric];
  const { current, previous, points } = getAnalyticsSeries(metric, channel, days);
  const delta = current - previous;
  const signed = (value: number, formatted: string) => `${value < 0 ? '−' : value > 0 ? '+' : ''}${formatted}`;
  let change = '—';
  if (metric === 'sameDay') {
    change = signed(delta, `${Math.abs(delta).toFixed(1)} pp`);
  } else if (previous !== 0) {
    change = signed(delta, `${(Math.abs(delta) / previous * 100).toFixed(1)}%`);
  }

  return {
    title: definition.label,
    current: definition.format(current),
    previous: definition.format(previous),
    change,
    changeLabel: metric === 'sameDay' ? 'Change in percentage points' : 'Change vs previous period',
    scope: `${channels[channel]} · ${points.at(0)?.label} – ${points.at(-1)?.label}`,
    chart: chartMarkup(points, metric, compare, bars),
    comparisonColumn: compare ? '<th scope="col">Previous period</th>' : '',
    rows: points.map(point => {
      const comparison = compare
        ? `<td>${definition.format(point.previous)} <span class="ca-table-date">${point.previousLabel}</span></td>`
        : '';
      return `<tr><th scope="row">${point.label}</th><td>${definition.format(point.current)}</td>${comparison}</tr>`;
    }).join(''),
  };
}

const initial = report('revenue', 'all', 30, true, false);
const metricOptions = Object.entries(analyticsMetrics).map(([key, { label }]) => `<option value="${key}">${label}</option>`).join('');
const channelOptions = Object.entries(channels).map(([key, label]) => `<option value="${key}">${label}</option>`).join('');

export const customAnalyticsMarkup = `
  <div class="custom-analytics" id="ops-custom-analytics">
    <div class="ca-heading">
      <div>
        <h3>Build your analytics view</h3>
        <p>Choose what to measure and compare performance with the previous period.</p>
      </div>
      <span class="ca-sample">Sample data</span>
    </div>
    <div class="ca-controls">
      <label>Metric<select id="ca-metric">${metricOptions}</select></label>
      <label>Date range<select id="ca-period"><option value="7">Last 7 days</option><option value="14">Last 14 days</option><option value="30" selected>Last 30 days</option></select></label>
      <label>Channel<select id="ca-channel">${channelOptions}</select></label>
      <label>Chart type<select id="ca-type"><option value="line">Line</option><option value="bar">Bars</option></select></label>
    </div>
    <div class="ca-compare"><label><input type="checkbox" id="ca-compare" checked> Compare previous period</label></div>
    <div class="ca-figures">
      <div><span id="ca-metric-label">${initial.title}</span><strong id="ca-current">${initial.current}</strong><small id="ca-scope">${initial.scope}</small></div>
      <div class="ca-comparison"><span>Previous period</span><strong id="ca-previous">${initial.previous}</strong><small>Same number of days</small></div>
      <div class="ca-comparison"><span id="ca-change-label">${initial.changeLabel}</span><strong id="ca-change">${initial.change}</strong></div>
    </div>
    <p class="sr-only" id="ca-status" role="status"></p>
    <figure class="ca-chart-card">
      <figcaption>
        <strong id="ca-chart-title">Daily ${initial.title.toLowerCase()}</strong>
        <div class="ca-legend"><span>Selected period</span><span class="ca-comparison">Previous period</span></div>
      </figcaption>
      <div id="ca-chart">${initial.chart}</div>
    </figure>
    <details class="ca-table">
      <summary>View daily figures</summary>
      <table>
        <caption class="sr-only" id="ca-table-caption">Daily ${initial.title.toLowerCase()}</caption>
        <thead><tr id="ca-table-head"><th scope="col">Date</th><th scope="col">Selected period</th>${initial.comparisonColumn}</tr></thead>
        <tbody id="ca-table-body">${initial.rows}</tbody>
      </table>
    </details>
  </div>`;

export function initializeCustomAnalytics(dashboard: HTMLElement, signal: AbortSignal) {
  const element = (id: string) => dashboard.querySelector<HTMLElement>(`#${id}`)!;
  const select = (id: string) => dashboard.querySelector<HTMLSelectElement>(`#${id}`)!;
  const compareInput = dashboard.querySelector<HTMLInputElement>('#ca-compare')!;

  function render() {
    const metric = select('ca-metric').value as AnalyticsMetric;
    const channel = select('ca-channel').value as AnalyticsChannel;
    const days = Number(select('ca-period').value) as AnalyticsPeriod;
    const compare = compareInput.checked;
    const view = report(metric, channel, days, compare, select('ca-type').value === 'bar');

    element('ca-metric-label').textContent = view.title;
    element('ca-current').textContent = view.current;
    element('ca-previous').textContent = view.previous;
    element('ca-change').textContent = view.change;
    element('ca-change-label').textContent = view.changeLabel;
    element('ca-scope').textContent = view.scope;
    element('ca-chart-title').textContent = `Daily ${view.title.toLowerCase()}`;
    element('ca-table-caption').textContent = `Daily ${view.title.toLowerCase()} for ${channels[channel].toLowerCase()}`;
    element('ca-chart').innerHTML = view.chart;
    element('ca-table-head').innerHTML = `<th scope="col">Date</th><th scope="col">Selected period</th>${view.comparisonColumn}`;
    element('ca-table-body').innerHTML = view.rows;
    dashboard.querySelectorAll<HTMLElement>('.ca-comparison').forEach(node => { node.hidden = !compare; });
    element('ca-status').textContent = `${view.title} for ${view.scope}: ${view.current}.${compare ? ` Previous period: ${view.previous}.` : ''}`;
  }

  dashboard.addEventListener('change', render, { signal });
}
