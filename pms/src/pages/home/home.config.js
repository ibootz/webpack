/**
 * 需要在页面级引入的js images css文件，在这里使用file-loader批量引入
 * Created by John on 2017/11/19.
 */

let output = require('outputConfig');
let metronicPath = output.publicPath + 'assets/';

module.exports = {
  js: {
    moment: metronicPath + 'global/plugins/moment.min.js',
    daterangepicker: metronicPath + 'global/plugins/bootstrap-daterangepicker/daterangepicker.min.js',
    jquery_flot: metronicPath + 'global/plugins/flot/jquery.flot.min.js',
    jquery_flot_resize: metronicPath + 'global/plugins/flot/jquery.flot.resize.min.js',
    jquery_flot_categories: metronicPath + 'global/plugins/flot/jquery.flot.categories.min.js',
  },
  custom_js: {
    home: metronicPath + '/pages/scripts/home.js',
  },
  images: {
    loading_gif: metronicPath + 'global/img/loading.gif',
  },
  css: {
    daterangepicker: metronicPath + 'global/plugins/bootstrap-daterangepicker/daterangepicker.min.css',
  },
  // dll: {
  //   js: require('!!file-loader?name=dll/dll.js!../../dll/dll.js',
  //   css: require('!file-loader?name=dll/dll.css!../../dll/dll.css',
  // },
};
