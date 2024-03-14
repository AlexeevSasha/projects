import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const cssLoader = (isDev: boolean) => ({
  test: /\.(sass|css|scss)$/,
  use: [
    isDev ? "style-loader" : MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {
        modules: {
          auto: /\.module\.scss$/,
          localIdentName: isDev ? "[path][name]__[local]--[hash:base64:5]" : "[hash:base64:8]",
        },
      },
    },
    "sass-loader",
  ],
});
