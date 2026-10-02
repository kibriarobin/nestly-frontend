const currency = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0,
});

export function formatRent(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return "Rent not set";
  }
  const amount = Number(value);
  return Number.isNaN(amount)
    ? "Rent not set"
    : `${currency.format(amount)}/mo`;
}
