export interface MonthlyEarning {
  key: string;
  label: string;
  amount: number;
}

const monthFormatter = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "2-digit",
});

const monthKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}`;

export function buildMonthlyEarnings(
  items: { amount: number; date: string }[],
  months = 6,
): MonthlyEarning[] {
  const now = new Date();
  const buckets: MonthlyEarning[] = Array.from({ length: months }, (_, i) => {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - (months - 1 - i),
      1,
    );
    return {
      key: monthKey(date),
      label: monthFormatter.format(date),
      amount: 0,
    };
  });

  for (const item of items) {
    const bucket = buckets.find((b) => b.key === monthKey(new Date(item.date)));
    if (bucket) bucket.amount += item.amount;
  }

  return buckets;
}

export function isSameMonth(value: string, reference = new Date()) {
  return monthKey(new Date(value)) === monthKey(reference);
}
