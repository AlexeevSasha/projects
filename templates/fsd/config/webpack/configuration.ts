import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { Configuration } from "webpack";
import { devServer } from "./devServer";
import { loaders } from "./loaders/loaders";
import { plugins } from "./plugins";
import { WebpackOptions } from "./types/webpack";

export const configuration = (options: WebpackOptions): Configuration => ({
  mode: options.mode,
  entry: options.paths.entry,
  output: {
    filename: "[name].[contenthash].js",
    path: options.paths.dist,
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: options.paths.tsconfig,
      }),
    ],
  },
  module: {
    rules: loaders(options),
  },
  plugins: plugins(options),
  devtool: options.isDev ? "inline-source-map" : undefined,
  devServer: options.isDev ? devServer(options) : undefined,
  stats: "errors-only",
});
