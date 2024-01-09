/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  distDir: "build",
  // generateBuildId: async () => {
  //   // You can, for example, get the latest git commit hash here
  //   return "myBuildId";
  // },
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "ru",
  },
  images: {
    domains: [
      "s3.dex-it.ru",
      "dev-shop.spartak.com",
      "test-tickets.spartak.com",
      "instatscout.com",
      "storage.yandexcloud.net",
      "tickets.k3s.spartak.com",
      "spartak.com",
      "apinew.spartak.com",
      "prod-shop.spartak.com",
      "static.rustatsport.ru",
      "tickets.spartak.com",
    ],
    dangerouslyAllowSVG: true,
    minimumCacheTTL: 2592000,
  },
  compiler: {
    styledComponents: true,
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cache-control",
            value: "public, max-age=60, stale-while-revalidate=59",
          },
        ],
      },
      {
        source: "/public",
        headers: [
          {
            key: "Cache-control",
            value: "public, max-age=60, stale-while-revalidate=59",
          },
        ],
      },
    ];
  },
};
