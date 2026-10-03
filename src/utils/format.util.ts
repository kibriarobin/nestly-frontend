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

export function formatDate(value: string) {
  return dateFormatter.format(new Date(value));
}
