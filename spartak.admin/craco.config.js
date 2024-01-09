const CracoLessPlugin = require("craco-less");

module.exports = {
  webpack: {
    resolve: {
      modules: ["src", "node_modules"],
    },
  },
  eslint: {
    pluginOptions: { fix: true },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#DC001F", "@default-color": "#FFFFFF" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
