import { Configuration } from "webpack";

export interface WebpackPaths {
  entry: string;
  dist: string;
  html: string;
  favicon: string;
  src: string;
  tsconfig: string;
}

export interface WebpackEnv {
  mode: Configuration["mode"];
  port: number;
}

export interface WebpackOptions {
  mode: Configuration["mode"];
  paths: WebpackPaths;
  isDev: boolean;
  port: number;
}
