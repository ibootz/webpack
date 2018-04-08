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
    bootstrap_select: metronicPath + 'global/plugins/bootstrap-select/js/bootstrap-select.js',
    datatable: metronicPath + 'global/scripts/datatable.js',
    datatables: metronicPath + 'global/plugins/datatables/datatables.min.js',
    datatables_bootstrap: metronicPath + 'global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.js',
  },
  custom_js: {
    customer_orders: metronicPath + 'pages/scripts/custom-orders.js',
  },
  images: {},
  css: {
    daterangepicker: metronicPath + 'global/plugins/bootstrap-daterangepicker/daterangepicker.min.css',
    bootstrap_select: metronicPath + 'global/plugins/bootstrap-select/css/bootstrap-select.min.css',
    bootstrap_datepicker3: metronicPath + 'global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
    bootstrap_timepicker: metronicPath + 'global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
    bootstrap_datetimepicker: metronicPath + 'global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
    clockface: metronicPath + 'global/plugins/clockface/css/clockface.css',
    datatables: metronicPath + 'global/plugins/datatables/datatables.min.css',
    datatables_bootstrap: metronicPath + 'global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
  },
  // dll: {
  //   js: require('!!file-loader?name=dll/dll.js!../../dll/dll.js',
  //   css: require('!file-loader?name=dll/dll.css!../../dll/dll.css',
  // },
};
