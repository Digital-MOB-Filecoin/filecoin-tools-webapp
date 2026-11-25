import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

import { IconName } from 'src/components/icon';

import * as SC from './styles';

type BaseProps = {
  children: ReactNode;
  variation: 'primary' | 'secondary';
  icon?: {
    name: IconName;
    size?: number;
    position?: 'left' | 'right' | 'only';
  };
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & BaseProps;

const InnerContent = ({ icon, children }: { icon?: BaseProps['icon']; children: ReactNode }) => {
  if (!icon) {
    return children;
  }

  return (
    <>
      {icon.position === 'left' && (
        <SC.SIcon name={icon.name} $position={icon.position} size={icon.size} />
      )}
      {icon.position === 'only' ? (
        <>
          <SC.SIcon name={icon.name} $position={icon.position} size={icon.size} />
          {children && <span className="sr-only">{children}</span>}
        </>
      ) : (
        children
      )}
      {icon.position === 'right' && (
        <SC.SIcon name={icon.name} $position={icon.position} size={icon.size} />
      )}
    </>
  );
};

export const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { variation, children, icon, ...rest } = props;

  return (
    <SC.Container ref={ref} type="button" $variation={variation} $icon={icon} {...rest}>
      <InnerContent icon={icon}>{children}</InnerContent>
    </SC.Container>
  );
});
