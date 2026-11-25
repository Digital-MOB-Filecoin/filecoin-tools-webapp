import { formatDistanceToNowStrict, isValid, lightFormat, subSeconds } from 'date-fns';

export function formatDate(date?: any): string {
  if (!isValid(date)) {
    return '--';
  }

  return lightFormat(date, 'dd.MM.yyyy HH:mm');
}

export function heightToDuration(height?: string): string {
  if (!height) {
    return '--';
  }

  const seconds = Number(height) * 30;
  const startDate = subSeconds(new Date(), seconds);

  return formatDistanceToNowStrict(startDate, { unit: 'month' });
}
