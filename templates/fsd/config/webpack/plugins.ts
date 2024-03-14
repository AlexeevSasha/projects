import Dotenv from "dotenv-webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { DefinePlugin, HotModuleReplacementPlugin, WebpackPluginInstance } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import WebpackBar from "webpackbar";
import { WebpackOptions } from "./types/webpack";

export const plugins = (options: WebpackOptions): WebpackPluginInstance[] => {
  const allPlugins = [
    new WebpackBar(),
    new HTMLWebpackPlugin({
      template: options.paths.html,
      favicon: options.paths.favicon,
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }),
    new DefinePlugin({
      __IS_DEV__: JSON.stringify({ isDev: options.isDev }),
    }),
    new Dotenv(),
  ];

  if (options.isDev) {
    allPlugins.push(new HotModuleReplacementPlugin());
    allPlugins.push(new BundleAnalyzerPlugin({ openAnalyzer: false }));
  }

  return allPlugins;
};
