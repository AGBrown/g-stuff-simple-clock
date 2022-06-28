const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const publicPath = path.join(__dirname, 'public');

module.exports = (webpackConfig, env) => {
  const { plugins } = webpackConfig;
  let htmlWebpackPluginOverridden = false;
  for (const p in plugins) {
    if (Object.hasOwnProperty.call(plugins, p)) {
      const element = plugins[p];
      if (isInstanceOf(element, 'HtmlWebpackPlugin')) {
        plugins[p] = new HtmlWebpackPlugin({
          ...element.options,
          template: path.join(publicPath, "cosmos-index.html")
        });
        htmlWebpackPluginOverridden = true;
        break;
      }
    }
  }
  if (!htmlWebpackPluginOverridden) {
    console.warn("[Custom Webpack Overrides] HtmlWebpackPlugin was not overriden");
  }
  return webpackConfig;
};

function isInstanceOf(instance, name) {
  return instance.constructor && instance.constructor.name === name;
}
