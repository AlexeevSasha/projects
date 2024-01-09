import { calculateProgress } from '@shared/lib';
import type { UserData } from '../model/user';

export const prepareUserData = (user: Partial<UserData>): Partial<UserData> => {
  return {
    ...user,
    userRole: user.groups?.[0],
    executor_profile: {
      ...user.executor_profile,
      userApplicationProgressInfo: calculateProgress(
        user.executor_profile?.completed_dreams_count,
        user.executor_profile?.dreams_count,
      ),
    },
  };
};
