export const setting = {
  telegramBotLogin: process.env.NEXT_PUBLIC_TELEGRAM_BOT_LOGIN
    ? process.env.NEXT_PUBLIC_TELEGRAM_BOT_LOGIN
    : null,
  dobroClientID: process.env.NEXT_PUBLIC_DOBRO_CLIENT_ID,
  dobroRedirectUri: `${process.env.NEXT_PUBLIC_DOMAIN}/auth/oauth/dobro`,
  loginURL: '/auth/login',
  registerURL: '/auth/register',
  logoutURL: '/auth/logout',
  rddmOauthURL: process.env.NEXT_PUBLIC_RDDM_OAUTH_URL,
  clientId: process.env.NEXT_PUBLIC_RDDM_CLIENT_ID,
  hostname: process.env.NEXT_PUBLIC_DOMAIN,
  cloudPayments: {
    publicId: process.env.NEXT_PUBLIC_CLOUD_PAYMENTS_PUBLIC_ID,
  },
};
