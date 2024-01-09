const rewireHtmlWebpackPlugin = require('react-app-rewire-html-webpack-plugin')

module.exports = (config, env) => {
  const overrideConfig = {minify: false}
  config = rewireHtmlWebpackPlugin(config, env, overrideConfig)
  return config;
}