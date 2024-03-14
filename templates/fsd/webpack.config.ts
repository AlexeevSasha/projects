import path from "path";
import { configuration } from "./config/webpack/configuration";
import { WebpackEnv, WebpackPaths } from "./config/webpack/types/webpack";

const paths: WebpackPaths = {
  entry: path.resolve(__dirname, "src", "index.tsx"),
  dist: path.resolve(__dirname, "dist"),
  html: path.resolve(__dirname, "public", "index.html"),
  src: path.resolve(__dirname, "src"),
  tsconfig: path.resolve(__dirname, "tsconfig.json"),
};

export default (env: WebpackEnv) => {
  const mode = env?.mode || "development";

  return configuration({
    mode,
    paths,
    isDev: mode === "development",
    port: env?.port || 3000,
  });
};
