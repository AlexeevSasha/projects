import { ApplicationStatus } from '@entities/application';

export const editCheckDreams = (status: number) => {
  return (
    status === ApplicationStatus.DRAFT ||
    status === ApplicationStatus.ERROR ||
    status === ApplicationStatus.NEED_REVISION
  );
};
