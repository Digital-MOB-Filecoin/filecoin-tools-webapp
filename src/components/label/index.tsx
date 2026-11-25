import * as SC from './styles';

interface Props {
  status?: 'active' | 'inactive';

  [props: string]: any;
}

const getStatusText = (status: Props['status']) => {
  switch (status) {
    case 'active':
      return 'Active';
    case 'inactive':
      return 'Inactive';
    default:
      return 'Unknown';
  }
};

export function Label({ status, ...rest }: Props) {
  return (
    <SC.Container $status={status} {...rest}>
      {getStatusText(status)}
    </SC.Container>
  );
}
