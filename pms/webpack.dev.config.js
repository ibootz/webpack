// 打包编译前先清空build文件夹下
require('./npm-scripts/before-build.script');

// 配置文件模块化
module.exports = {
  // 入口文件，每个业务文件夹内都有一个入口文件
  entry: require('./webpack-config/entry.config.js'),

  // 编译生成的文件配置
  output: require('./webpack-config/output.config.js'),

  // loaders配置文件
  module: require('./webpack-config/module.dev.config.js'),

  // 为一些常用路径设置别名
  resolve: require('./webpack-config/resolve.config.js'),

  // webpack查件
  plugins: require('./webpack-config/plugins.dev.config.js'),

  // jQuery老插件兼容问题解决办法， 和ProvidePlugin + expose-loader的解决方案冲突，
  // 将html文件中声明的jquery插件赋予变量，就可以在webpack语义环境中使用，就不需要require引入了
  externals: require('./webpack-config/externals.config.js'),

  // 开发测试服务器
  devServer: require('./webpack-config/devServer.config.js'),

};
