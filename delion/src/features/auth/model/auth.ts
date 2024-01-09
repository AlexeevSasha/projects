import { UserRoles } from '@entities/user';
import { APP_ROUTES } from '@shared/const';

export const AFTER_LOGIN_REDIRECT_URL = {
  [UserRoles.DREAMER]: APP_ROUTES.TRUSTEE,
  [UserRoles.MODERATOR]: APP_ROUTES.MODERATOR,
  [UserRoles.EXECUTOR]: APP_ROUTES.EXECUTOR_APPLICATIONS,
  [UserRoles.PARTNER]: APP_ROUTES.PARTNER_APPLICATIONS,
};
