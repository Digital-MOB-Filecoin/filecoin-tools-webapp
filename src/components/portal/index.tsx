import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({
  children,
  container,
}: {
  children: ReactNode;
  container: HTMLElement;
}) {
  return createPortal(children, container);
}
