export function formatPercent(value?: string | number | bigint): string {
  if (!value) {
    return '--';
  }

  return new Intl.NumberFormat(undefined, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value));
}
