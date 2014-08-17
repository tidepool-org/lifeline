var _ = require('lodash');

var utils = require('../utils');

module.exports = function(cube) {
  var allData = cube.getData();
  var allCbg = _.filter(allData, {'type': 'cbg'});

  var mapped = _.groupBy(allCbg, function(d) {
    return utils.dayFromIso(d.deviceTime);
  });

  var reduced = _.map(mapped, function(data, key) {
    var values = _.map(data, function(d) {
      return d.value;
    });
    return {
      key: key,
      value: utils.median(values)
    };
  });

  return reduced;
};
