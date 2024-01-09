import type { StepProps } from 'antd/es/steps';
import { ApplicationStatus, StatusTrusteeChoices } from '@entities/application';
import { getSelectedChoiceText } from '@shared/lib';

type StatusApplicationStepInfo = {
  title: string;
  showDate: boolean;
  isWarn: boolean;
  status: StepProps['status'];
};

export const getStatusApplicationStepInfo = (status: number): StatusApplicationStepInfo => {
  const init: StatusApplicationStepInfo = {
    title: getSelectedChoiceText(status, StatusTrusteeChoices),
    status: 'process',
    showDate: true,
    isWarn: false,
  };

  switch (status) {
    case ApplicationStatus.PRE_POSTED:
    case ApplicationStatus.EXECUTED:
      return { ...init, status: 'finish', showDate: false };
    case ApplicationStatus.DRAFT:
      return { ...init, showDate: false };
    case ApplicationStatus.NEED_REVISION:
      return { ...init, isWarn: true };
    case ApplicationStatus.ERROR:
      return { ...init, status: 'error' };
    case ApplicationStatus.REJECTED:
      return { ...init, status: 'error', showDate: false };
    default:
      return init;
  }
};
