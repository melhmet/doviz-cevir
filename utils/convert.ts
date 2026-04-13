/**
 * Convert amount from one currency to another using rates.
 * Rates object has currency codes as keys and their rate relative to the base currency.
 */
export function convertCurrency(
  amount: number,
  fromCode: string,
  toCode: string,
  rates: Record<string, number>
): number {
  if (fromCode === toCode) return amount;

  const fromRate = rates[fromCode];
  const toRate = rates[toCode];

  if (!fromRate || !toRate) return 0;

  // Convert: amount in fromCurrency → base → toCurrency
  return (amount / fromRate) * toRate;
}

/**
 * Get the exchange rate from one currency to another.
 * Returns how many units of `to` you get for 1 unit of `from`.
 */
export function getRate(
  fromCode: string,
  toCode: string,
  rates: Record<string, number>
): number {
  if (fromCode === toCode) return 1;

  const fromRate = rates[fromCode];
  const toRate = rates[toCode];

  if (!fromRate || !toRate) return 0;

  return toRate / fromRate;
}
