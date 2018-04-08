let path = require('path');
let dirVars = require('./base/dir-vars.config.js');
let resolve = {

  // 模块别名的配置，为了使用方便，一般来说所有模块都是要配置一下别名的
  alias: {

    /* 目录结构 */
    configDir: dirVars.configDir,
    vendorDir: dirVars.vendorDir,
    metronicDir: dirVars.metronicDir,

    /* wbepack config文件 */
    outputConfig: path.resolve(dirVars.webpackConfigDir, './output.config'),

    /* libs - 通用函数 */
    utils: path.resolve(dirVars.libsDir, 'utils'),

    /* config - 配置信息 */
    commonConfig: path.resolve(dirVars.configDir, 'common.config'),

    /* config - 布局信息 */
    layout: path.resolve(dirVars.layoutDir, 'layout4/layout'),
  },

  // 当require的模块找不到时，尝试添加这些后缀后进行寻找
  extensions: ['.js', '.css'],
};

module.exports = resolve;
