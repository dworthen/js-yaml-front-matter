if(require('is-browser')) {
  module.exports = require('./lib/browser');
} else {
  module.exports = require('./lib/js-yaml-front');
}
