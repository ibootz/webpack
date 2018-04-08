let glob = require('glob');
let dirVars = require('./dir-vars.config.js');
let files = glob.sync(dirVars.pagesDir + '/**/*.main.js');
let entries = [];
files.forEach((file) => {
  // 得到order/customer_orders这样的文件名
  let name = new RegExp('.*/(pages/.*).main.js').exec(file)[1];
  entries.push(name);
});
module.exports = entries; // 一个数组，形如['order/customer_orders', 'order/order1/order1', 'index/index']
