let dirVars = require('../base/dir-vars.config.js');
let eslintFormatter = require('eslint-friendly-formatter');
module.exports = {
  rules: [
    {
      test: /\.js$/,
      enforce: 'pre',
      loader: 'eslint-loader',
      include: dirVars.srcRootDir,
      exclude: /bootstrap/,
      options: {
        formatter: eslintFormatter,
        fix: true,
      },
    },
    {
      test: /\.js$/,
      include: dirVars.srcRootDir,
      loader: 'babel-loader',
      options: {
        presets: [['env', {loose: true}]],
        cacheDirectory: true,
        plugins: ['transform-runtime'],
      },
    },
    {
      test: /\.html$/,
      include: dirVars.srcRootDir,
      loader: 'html-loader',
    },
    {
      test: /\.ejs$/,
      include: dirVars.srcRootDir,
      loader: 'ejs-loader',
    },
    {
      // 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
      // 如下配置，将小于8192byte的图片转成base64码, 大于该值的图片复制一份到 `编译根目录/[name]`  的路径下
      test: /\.(png|jpg|gif)$/,
      include: dirVars.srcRootDir,
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: './static/img/[hash].[ext]',
      },
    },
  ],
  // {
  //     // 专供bootstrap方案使用的，忽略bootstrap自带的字体文件
  //     test: /\.(woff|woff2|svg|eot|ttf)$/,
  //     include: /glyphicons/,
  //     loader: 'null-loader',
  // },
  // {
  //     // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
  //     test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
  //     include: dirVars.srcRootDir,
  //     // exclude: /glyphicons/,
  //     // loader: 'file-loader?name=static/fonts/[name].[ext]',
  //     loader: 'file-loader',
  //     options: {
  //         name: 'static/fonts/[name].[hash].[ext]',
  //     },
  // },
  // {
  //     // 此loader配置项的目标是NPM中的jquery, 本项目设计很多jquery第三方插件，这里不使用npm引入jquery，而是在html中直接引入
  //     test: require.resolve('jquery'),
  //     // 先把jQuery对象声明成为全局变量`jQuery`，再通过管道进一步又声明成为全局变量`$`
  //     use: [{
  //         loader: 'expose-loader',
  //         options: 'jQuery'
  //     },{
  //         loader: 'expose-loader',
  //         options: '$'
  //     }]
  // }
};
