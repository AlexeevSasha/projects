import { TypeT } from '../../interfaces/type';
import { SuccessIcon } from '../../components/icons/SuccessIcon';
import { ErrorIcon } from '../../components/icons/ErrorIcon';
import { WarningIcon } from '../../components/icons/WarningIcon';
import { InfoIcon } from '../../components/icons/InfoIcon';
import { DefaultIcon } from '../../components/icons/DefaultIcon';

export const getIcon = (type?: TypeT, color?: string) => {
  switch (type) {
    case 'success':
      return <SuccessIcon color={color} />;
    case 'error':
      return <ErrorIcon color={color} />;
    case 'warning':
      return <WarningIcon color={color} />;
    case 'info':
      return <InfoIcon color={color} />;
    default:
      return <DefaultIcon color={color} />;
  }
};
