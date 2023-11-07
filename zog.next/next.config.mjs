
/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "ru",
  },
  output: "standalone",
  images: {
    domains: ["tupwidget.com", "app.amrita-center.ru", "drive.google.com"],
  },
};
export default config;
