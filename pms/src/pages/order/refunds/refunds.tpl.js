/**
 * Created by John on 2017/11/14.
 */
const utils = require('utils');
const content = require('./refunds.ejs');  // 调取存放本页面实际内容的模板文件
const layout = require('layout');  // 调用管理后台内部所使用的布局方案，我在webpack配置里定义其别名为'layout'
const pageConfig = utils.buildPageConfig(require('./refunds.config'));
let pageTitle = 'PMS管理系统 - 订单';

// 给layout传入“页面名称”这一参数（当然有需要的话也可以传入其它参数），同时也传入页面实际内容的HTML字符串。
// content({ pageTitle })的意思就是把pageTitle作为模板变量传给ejs模板引擎并返回最终生成的HTML字符串。
module.exports = layout.init({pageTitle, pageConfig}).run(content({pageTitle, pageConfig}));
