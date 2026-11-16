const dollars = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
const dollarsAndCents = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const compactDollars = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
});
const number = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });
const shortDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
const dayMilliseconds = 86_400_000;
const firstDate = Date.UTC(2026, 7, 24);
const periodLength = 30;

export const analyticsMetrics = {
  revenue: {
    label: 'Revenue',
    format: (value: number) => dollars.format(value),
    axis: (value: number) => compactDollars.format(value),
  },
  grossProfit: {
    label: 'Gross profit',
    format: (value: number) => dollars.format(value),
    axis: (value: number) => compactDollars.format(value),
  },
  orders: {
    label: 'Orders shipped',
    format: (value: number) => number.format(value),
    axis: (value: number) => number.format(value),
  },
  averageOrder: {
    label: 'Average order value',
    format: (value: number) => dollarsAndCents.format(value),
    axis: (value: number) => dollars.format(value),
  },
  sameDay: {
    label: 'Same-day dispatch',
    format: (value: number) => `${number.format(value)}%`,
    axis: (value: number) => `${number.format(value)}%`,
  },
  labelTime: {
    label: 'Average time to label',
    format: (value: number) => {
      const seconds = Math.round(value * 60);
      return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    },
    axis: (value: number) => `${number.format(value)}m`,
  },
};

export type AnalyticsMetric = keyof typeof analyticsMetrics;
export type AnalyticsChannel = 'all' | 'wholesale' | 'retail';
export type AnalyticsPeriod = 7 | 14 | 30;

type DailyTotals = {
  orders: number;
  revenueCents: number;
  profitCents: number;
  dispatchedSameDay: number;
  labelSeconds: number;
};

const emptyDay: DailyTotals = {
  orders: 0,
  revenueCents: 0,
  profitCents: 0,
  dispatchedSameDay: 0,
  labelSeconds: 0,
};

function addDays(left: DailyTotals, right: DailyTotals): DailyTotals {
  return {
    orders: left.orders + right.orders,
    revenueCents: left.revenueCents + right.revenueCents,
    profitCents: left.profitCents + right.profitCents,
    dispatchedSameDay: left.dispatchedSameDay + right.dispatchedSameDay,
    labelSeconds: left.labelSeconds + right.labelSeconds,
  };
}

function spread(total: number, weights: number[]) {
  const weightTotal = weights.reduce((sum, weight) => sum + weight, 0);
  let cumulativeWeight = 0;
  let allocated = 0;
  // Allocate whole orders or cents while preserving the specified period total.
  return weights.map(weight => {
    cumulativeWeight += weight;
    const next = Math.round(total * cumulativeWeight / weightTotal);
    const daily = next - allocated;
    allocated = next;
    return daily;
  });
}

function makePeriod(
  phase: number,
  orders: number,
  revenue: number,
  profit: number,
  delayed: number,
  averageLabelMinutes: number,
): DailyTotals[] {
  const demand = Array.from({ length: periodLength }, (_, day) =>
    90 + day * 2 + 18 * Math.sin(day * 1.17 + phase) + 10 * Math.cos(day * 0.57),
  );
  const dailyOrders = spread(orders, demand);
  const salesWeights = demand.map((weight, day) => weight * (1 + 0.1 * Math.sin(day * 0.74 + phase)));
  const profitWeights = salesWeights.map((weight, day) => weight * (1 + 0.12 * Math.cos(day * 0.83 + phase)));
  const dailySales = spread(revenue * 100, salesWeights);
  const dailyProfit = spread(profit * 100, profitWeights);
  const dailyDelayed = spread(delayed, dailyOrders);

  return dailyOrders.map((dayOrders, day) => ({
    orders: dayOrders,
    revenueCents: dailySales[day] ?? 0,
    profitCents: dailyProfit[day] ?? 0,
    dispatchedSameDay: dayOrders - (dailyDelayed[day] ?? 0),
    labelSeconds: dayOrders * Math.round(60 * (averageLabelMinutes + 1.2 * Math.sin(day * 0.66 + phase))),
  }));
}

// The most recent 30 days match the portal's illustrative Home analytics totals.
const wholesale = [
  ...makePeriod(0.4, 335, 69_400, 12_200, 11, 16.3),
  ...makePeriod(1.2, 380, 82_260, 13_850, 8, 15.1),
];
const retail = [
  ...makePeriod(2.2, 555, 38_912, 9_613, 17, 15.0),
  ...makePeriod(2.8, 620, 46_200, 11_060, 14, 13.9),
];
const seriesByChannel = {
  wholesale,
  retail,
  all: wholesale.map((day, index) => addDays(day, retail[index] ?? emptyDay)),
};

const readMetric: Record<AnalyticsMetric, (day: DailyTotals) => number> = {
  revenue: day => day.revenueCents / 100,
  grossProfit: day => day.profitCents / 100,
  orders: day => day.orders,
  averageOrder: day => day.orders ? day.revenueCents / 100 / day.orders : 0,
  sameDay: day => day.orders ? day.dispatchedSameDay / day.orders * 100 : 0,
  labelTime: day => day.orders ? day.labelSeconds / day.orders / 60 : 0,
};

function labelForDay(index: number) {
  return shortDate.format(firstDate + index * dayMilliseconds);
}

export function getAnalyticsSeries(metric: AnalyticsMetric, channel: AnalyticsChannel, days: AnalyticsPeriod) {
  const series = seriesByChannel[channel];
  const currentStart = series.length - days;
  const previousStart = currentStart - days;
  const currentDays = series.slice(currentStart);
  const previousDays = series.slice(previousStart, currentStart);
  const value = readMetric[metric];

  return {
    current: value(currentDays.reduce(addDays, emptyDay)),
    previous: value(previousDays.reduce(addDays, emptyDay)),
    points: currentDays.map((day, index) => ({
      label: labelForDay(currentStart + index),
      previousLabel: labelForDay(previousStart + index),
      current: value(day),
      previous: value(previousDays[index] ?? emptyDay),
    })),
  };
}
