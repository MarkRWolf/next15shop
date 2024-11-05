export function formatCurrency(amount: number, currencyCode: string = "DKK"): string {
  try {
    return new Intl.NumberFormat("da-DK", {
      style: "currency",
      currency: currencyCode.toUpperCase(),
    }).format(amount);
  } catch (e) {
    console.error("Error formatting currency:", currencyCode, e);
    return `${currencyCode.toUpperCase()} ${amount.toFixed(2)}`;
  }
}
