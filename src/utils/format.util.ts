const currency = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" });

export function formatRent(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return "Rent not set";
  }
  const amount = Number(value);
  return Number.isNaN(amount)
    ? "Rent not set"
    : `${currency.format(amount)}/mo`;
}

export function formatMoney(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") return "N/A";
  const amount = Number(value);
  return Number.isNaN(amount) ? "N/A" : currency.format(amount);
}

export function formatCurrency(value: string | number | null | undefined) {
  const amount = Number(value ?? 0);
  return Number.isNaN(amount) ? currency.format(0) : currency.format(amount);
}

export function formatDate(value: string) {
  return dateFormatter.format(new Date(value));
}

const dateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function formatDateTime(value: string) {
  return dateTimeFormatter.format(new Date(value));
}
