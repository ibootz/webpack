let precss = require('precss');
let autoprefixer = require('autoprefixer');
module.exports = function postcss() {
  return [precss, autoprefixer({
    remove: false,
    browsers: ['ie >= 8', '> 1% in CN'],
  })];
};