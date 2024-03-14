import type { Configuration as ConfigurationDevServer } from "webpack-dev-server";
import { WebpackOptions } from "./types/webpack";

export const devServer = (options: WebpackOptions): ConfigurationDevServer => ({
  port: options.port,
  open: true,
  historyApiFallback: true,
  hot: true,
});
