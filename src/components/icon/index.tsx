import { SVGProps } from 'react';

export type IconName =
  | 'search'
  | 'dropdown'
  | 'copy'
  | 'github'
  | 'arrow-right'
  | 'arrow-left'
  | 'info'
  | 'calendar'
  | 'chevron-left'
  | 'chevron-right'
  | 'double-chevron-left'
  | 'double-chevron-right'
  | 'check'
  | 'close';

export type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

export const Icon = ({ name, size = 24, ...props }: IconProps) => {
  return (
    <svg width={size} height={size} {...props}>
      <use xlinkHref={`/icons-sprite.svg#icon__${name}`} />
    </svg>
  );
};
