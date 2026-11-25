export function formatNumber(value?: string | number | bigint): string {
  if (!value) {
    return '--';
  }

  return new Intl.NumberFormat().format(BigInt(value));
}
