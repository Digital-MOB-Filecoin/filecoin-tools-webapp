import * as SC from './styles.ts';

export function ExternalLink({
  children,
  ...rest
}: React.LinkHTMLAttributes<HTMLAnchorElement>) {
  return (
    <SC.ExternalLink target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </SC.ExternalLink>
  );
}
