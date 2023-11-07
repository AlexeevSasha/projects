const path = require("path");

module.exports = {
  reactStrictMode: false,

  sassOptions: {
    includePaths: [path.resolve(__dirname, "src/styles/")],
  },
  images: {
    domains: ["imshop-dev-s3.aforte.ru"],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "astroturf/loader",
          options: { extension: ".module.scss", enableCssProp: true },
        },
      ],
    });

    return config;
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
    ];
  },
};
