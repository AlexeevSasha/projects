import { UserRoles } from '@entities/user';

export const userDeclinationRole: Record<UserRoles, string> = {
  [UserRoles.DREAMER]: 'Опекуна',
  [UserRoles.EXECUTOR]: 'Исполнителя',
  [UserRoles.MODERATOR]: 'Модератора',
  [UserRoles.PARTNER]: 'Партнёра',
};
