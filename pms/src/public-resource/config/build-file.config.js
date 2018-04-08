let output = require('outputConfig');
let metronicPath = output.publicPath + 'assets/';

// 将index.html复制到build之后的文件夹的根目录下
require('!!file-loader?name=index.html!../../../index.html');

// 全局依赖的static文件
module.exports = {
  js: {
    // 兼容性JS
    html5shiv: require('!!file-loader?name=static/js/[name].[ext]!../../../vendor/ie-fix/html5shiv.min.js'),
    respond: metronicPath + 'global/plugins/respond.min.js',
    excanvas: metronicPath + 'global/plugins/excanvas.min.js',

    // 核心JS
    jquery: metronicPath + 'global/plugins/jquery.min.js',
    bootstrap: metronicPath + 'global/plugins/bootstrap/js/bootstrap.min.js',
    jsCookies: metronicPath + 'global/plugins/js.cookie.min.js',
    bootstrap_hover_dropdown: metronicPath + 'global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js',
    jquery_slimscroll: metronicPath + 'global/plugins/jquery-slimscroll/jquery.slimscroll.min.js',
    jquery_blockui: metronicPath + 'global/plugins/jquery.blockui.min.js',
    bootstrap_switch: metronicPath + 'global/plugins/bootstrap-switch/js/bootstrap-switch.min.js',

    // 主题全局JS
    app: metronicPath + 'global/scripts/app.js',

    // 主题布局JS
    layout: metronicPath + 'layouts/layout4/scripts/layout.js',
    demo: metronicPath + 'layouts/layout4/scripts/demo.js',
    quick_sidebar: metronicPath + '/layouts/global/scripts/quick-sidebar.js',
  },
  images: {
    favicon: require('!!file-loader?name=static/[name].[ext]!../images/favicon.ico'),
    logo: require('!!file-loader?name=static/image/[name].[ext]!../images/logo.png'),
    top_avatar1: metronicPath + 'layouts/layout4/img/avatar1.jpg',
    top_avatar2: metronicPath + 'layouts/layout4/img/avatar2.jpg',
    top_avatar3: metronicPath + 'layouts/layout4/img/avatar3.jpg',
    top_avatar4: metronicPath + 'layouts/layout4/img/avatar4.jpg',
    top_avatar5: metronicPath + 'layouts/layout4/img/avatar5.jpg',
    top_avatar6: metronicPath + 'layouts/layout4/img/avatar6.jpg',
    top_avatar7: metronicPath + 'layouts/layout4/img/avatar7.jpg',
    top_avatar8: metronicPath + 'layouts/layout4/img/avatar8.jpg',
    top_avatar9: metronicPath + 'layouts/layout4/img/avatar9.jpg',
    top_avatar10: metronicPath + 'layouts/layout4/img/avatar10.jpg',
    top_avatar11: metronicPath + 'layouts/layout4/img/avatar11.jpg',
    top_team1: metronicPath + 'layouts/layout4/img/team1.jpg',
  },
  css: {
    // 兼容性css
    mapplic_ie: metronicPath + 'global/plugins/mapplic/mapplic/mapplic-ie.css',

    // 全局样式
    font_awesome: metronicPath + 'global/plugins/font-awesome/css/font-awesome.min.css',
    simple_line_icons: metronicPath + 'global/plugins/simple-line-icons/simple-line-icons.min.css',
    bootstrap: metronicPath + 'global/plugins/bootstrap/css/bootstrap.min.css',
    bootstrap_switch: metronicPath + 'global/plugins/bootstrap-switch/css/bootstrap-switch.min.css',

    // 主题全局样式
    components_rounded: metronicPath + 'global/css/components-rounded.min.css',
    plugins: metronicPath + 'global/css/plugins.min.css',

    // 主题布局样式
    layout: metronicPath + 'layouts/layout4/css/layout.min.css',
    light: metronicPath + 'layouts/layout4/css/themes/light.min.css',

    // 全局自定义样式
    custom: metronicPath + 'layouts/layout4/css/custom.css',

  },
  // dll: {
  //   js: require('!!file-loader?name=dll/dll.js!../../dll/dll.js',
  //   css: require('!file-loader?name=dll/dll.css!../../dll/dll.css',
  // },
};
