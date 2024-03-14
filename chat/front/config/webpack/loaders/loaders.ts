import { RuleSetRule } from "webpack";
import { WebpackOptions } from "../types/webpack";
import { cssLoader } from "./css";
import { fileLoader } from "./file";

const tsLoader = {
  test: /\.tsx?$/,
  use: "ts-loader",
  exclude: /node_modules/,
};
const babelLoader = {
  test: /\.(js|jsx|tsx)$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"],
    },
  },
};
const svgLoader = {
  test: /\.svg$/,
  use: ["@svgr/webpack"],
};

export const loaders = (options: WebpackOptions): RuleSetRule[] => [...fileLoader, svgLoader, babelLoader, tsLoader, cssLoader(options.isDev)];
