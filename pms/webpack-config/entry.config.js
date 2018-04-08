let path = require('path');
let dirVars = require('./base/dir-vars.config.js');
let pageArr = require('./base/page-entries.config.js');
let configEntry = {};
pageArr.forEach((page) => {
  // 要求所有入口文件必须要是.main.js后缀命名
  configEntry[page] = path.resolve(dirVars.srcRootDir, page + '.main.js');
});
module.exports = configEntry;
