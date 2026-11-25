import { filesize } from 'filesize';

export function formatFileSize(value?: string) {
  if (!value) {
    return '--';
  }

  return filesize(value);
}
