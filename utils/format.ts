/**
 * Format number with TR locale (dot for thousands, comma for decimal)
 * e.g. 1234.5678 → "1.234,5678"
 */
export function formatNumberTR(value: number, decimals: number = 4): string {
  const fixed = value.toFixed(decimals);
  const [intPart, decPart] = fixed.split('.');
  const withDots = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return decPart ? `${withDots},${decPart}` : withDots;
}

/**
 * Parse TR formatted string back to number
 * e.g. "1.234,56" → 1234.56
 */
export function parseTRNumber(str: string): number {
  const cleaned = str.replace(/\./g, '').replace(',', '.');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

/**
 * Format large numbers compactly
 * e.g. 2084120 → "2.084.120"
 */
export function formatPrice(value: number, decimals: number = 4): string {
  if (value >= 1000) {
    return formatNumberTR(value, 2);
  }
  if (value >= 1) {
    return formatNumberTR(value, decimals);
  }
  // For small numbers show more decimals
  return formatNumberTR(value, Math.max(decimals, 6));
}

/**
 * Format percentage change
 * e.g. 0.12 → "+0,12%", -0.05 → "-0,05%"
 * Returns "—" when value is null/undefined (no data available)
 */
export function formatChange(value: number | null | undefined): string {
  if (value == null) return '—';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2).replace('.', ',')}%`;
}

/**
 * Format time as HH:MM:SS
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}
