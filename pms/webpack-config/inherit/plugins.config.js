let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let path = require('path');
let dirVars = require('../base/dir-vars.config.js');
let pageArr = require('../base/page-entries.config.js');
let HashOutput = require('webpack-plugin-hash-output');
let CopyWebpackPlugin = require('copy-webpack-plugin');

let configPlugins = [
  /* 全局shimming: 如果有哪个文件中调用了下面key中的值，就会被指定为value */
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    'window.$': 'jquery',
  }),
  /* 抽取出所有通用的部分 */
  new webpack.optimize.CommonsChunkPlugin({
    name: 'static/js',      // 需要注意的是，chunk的name不能相同！！！
    filename: '[name].bundle.[chunkhash].js',
    minChunks: 4,
  }),
  /* 抽取出webpack的runtime代码()，避免稍微修改一下入口文件就会改动commonChunk，导致原本有效的浏览器缓存失效 */
  new webpack.optimize.CommonsChunkPlugin({
    name: 'webpack-runtime',
    filename: 'static/js/webpack-runtime.[hash].js',
  }),
  /* 抽取出chunk的css */
  new ExtractTextPlugin('[name].[contenthash].css'),
  /* 配置好Dll */
  // new webpack.DllReferencePlugin({
  //   context: dirVars.staticRootDir, // 指定一个路径作为上下文环境，需要与DllPlugin的context参数保持一致，建议统一设置为项目根目录
  //   manifest: require('../../manifest.json'), // 指定manifest.json
  //   name: 'dll',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
  // }),
  // 指定包含 manifest 在内的 chunk
  new HashOutput({
    manifestFiles: 'webpack-runtime',
  }),

  /* 将metronic文件夹下的静态文件整体复制到build编译目录中 */
  new CopyWebpackPlugin([{
    from: path.resolve(dirVars.vendorDir, './assets'),
    to: path.resolve(dirVars.buildDir, './assets'),
  }]),

];
pageArr.forEach((page) => {
  const htmlPlugin = new HtmlWebpackPlugin({
    filename: page + '.html', // 编译打包生成之后的文件，放到webpack中
    template: path.resolve(dirVars.srcRootDir, './' + page + '.tpl.js'), // 指定一个可以生成模板文件的js文件，后缀以.tpl.js
    chunks: ['webpack-runtime', page, 'static/js'],
    hash: true, // 为静态资源生成hash值
    xhtml: true, // 是否渲染link为自闭合的标签，true则为自闭合标签
  });
  configPlugins.push(htmlPlugin);
});
module.exports = configPlugins;
