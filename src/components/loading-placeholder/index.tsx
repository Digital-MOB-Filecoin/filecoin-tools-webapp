import * as SC from './styles';

interface Props {
  width?: number;
  height?: number;
  className?: string;
}

export function LoadingPlaceholder({ width = 24, height = 12, className }: Props) {
  return <SC.Wrapper $width={width} $height={height} className={className} />;
}
