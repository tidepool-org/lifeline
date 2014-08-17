var _ = require('lodash');

var utils = require('../utils');

var DEFAULT_HIGHT = 180;
var DEFAULT_LOW = 80;

function getCategory(n, options) {
  if (n < options.low) {
    return 'low';
  }
  else if (n <= options.high) {
    return 'target';
  }
  else {
    return 'high';
  }
}

module.exports = function(cube, options) {
  options = options || {};
  options.high = options.high || DEFAULT_HIGHT;
  options.low = options.low || DEFAULT_LOW;

  var allData = cube.getData();
  var allCbg = _.filter(allData, {'type': 'cbg'});

  var mapped = _.groupBy(allCbg, function(d) {
    return utils.dayFromIso(d.deviceTime);
  });

  var reduced = _.map(mapped, function(data, key) {
    var total = data.length;
    if (!total) {
      return {
        key: key,
        value: null
      };
    }

    var breakdown = _.countBy(data, function(d, key) {
      return getCategory(d.value, options);
    });
    var value = {
      low: (breakdown.low || 0)/total,
      target: (breakdown.target || 0)/total,
      high: (breakdown.high || 0)/total
    };
    return {
      key: key,
      value: value
    };
  });

  return reduced;
};
