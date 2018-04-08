let ExtractTextPlugin = require('extract-text-webpack-plugin');
const moduleConfig = require('./inherit/module.config.js');
moduleConfig.rules.push({
  test: /\.css$/,
  exclude: /node_modules|bootstrap/,
  use: ExtractTextPlugin.extract([
    {
      loader: 'css-loader',
      options: {
        minimize: true,
        '-autoprefixer': true,
      },
    },
    {
      loader: 'postcss-loader',
    },
  ]),
});
module.exports = moduleConfig;
