export const enum APP_ROOT_ROUTES {
  LOGIN = '/login',
  PROFILE = '/profile',
  EXECUTOR = '/executor',
  TRUSTEE = '/trustee',
  MODERATOR = '/moderator',
  PARTNER = '/partner',
}

export const enum APP_ROUTES {
  // Auth pages
  LOGIN = APP_ROOT_ROUTES.LOGIN,
  LOGIN_CODE = `${APP_ROOT_ROUTES.LOGIN}/code`,
  LOGIN_SIGN_IN = `${APP_ROOT_ROUTES.LOGIN}/sign-in`,

  // Profile pages
  PROFILE = APP_ROOT_ROUTES.PROFILE,
  PROFILE_FIRST_TIME = `${APP_ROOT_ROUTES.PROFILE}/first-time`,
  // Profile Settings
  PROFILE_SETTINGS = `${APP_ROOT_ROUTES.PROFILE}/settings`,
  PROFILE_SETTINGS_DATA = `${APP_ROOT_ROUTES.PROFILE}/settings/data`,
  PROFILE_SETTINGS_PASSWORD = `${APP_ROOT_ROUTES.PROFILE}/settings/password`,
  // Executor Pages
  EXECUTOR_APPLICATIONS = `${APP_ROOT_ROUTES.EXECUTOR}/applications`,
  EXECUTOR_FIND_APPLICATIONS = `${APP_ROOT_ROUTES.EXECUTOR}/find-applications`,
  EXECUTOR_APPLICATION = `${APP_ROOT_ROUTES.EXECUTOR}/applications/[id]`,
  EXECUTOR_APPLICATION_FEEDBACK = `${APP_ROOT_ROUTES.EXECUTOR}/applications/[id]/feedback`,

  // Trustee Pages
  TRUSTEE = APP_ROOT_ROUTES.TRUSTEE,
  TRUSTEE_APPLICATION = `${TRUSTEE}/application`,
  TRUSTEE_APPLICATION_DREAMS = `${TRUSTEE}/application/dreams`,

  // Moderator Page
  MODERATOR = APP_ROOT_ROUTES.MODERATOR,
  MODERATOR_DREAM = `${APP_ROOT_ROUTES.MODERATOR}/dream`,

  // Partner Page
  PARTNER_APPLICATIONS = `${APP_ROOT_ROUTES.PARTNER}/applications`,
  PARTNER_FIND_APPLICATIONS = `${APP_ROOT_ROUTES.PARTNER}/find-applications`,

  TECHNICAL_SUPPORT = '#',

  //QR
  QR_WISH = '/qr/wish/',
  QR_APPLICATION = '/qr/application',
}
