let dirVars = require('./base/dir-vars.config.js');
module.exports = {
  path: dirVars.buildDir,
  publicPath: '/',
  filename: '[name].[chunkhash].js',    // [name]表示entry每一项中的key，用以批量指定生成后文件的名称
  chunkFilename: '[id].[chunkhash].bundle.js', // 未被列在entry中，却又需要被打包出来的文件命名配置. 例如 按需加载（异步）模块的时候，这样的文件是没有被列在entry中
};
