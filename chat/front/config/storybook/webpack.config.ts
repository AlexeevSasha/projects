import webpack, { RuleSetRule } from "webpack";
import path from "path";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { cssLoader } from "../webpack/loaders/css";

export default ({ config }: { config: webpack.Configuration }) => {
  config.resolve.plugins = config.resolve.plugins || [];
  config.resolve.plugins.push(
    new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, "..", "..", "tsconfig.json"),
    }),
  );
  config.resolve.extensions.push(".ts", ".tsx");

  config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/i };
    }

    return rule;
  });

  config.module.rules.push({
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  });
  config.module.rules.push(cssLoader(true));

  return config;
};
