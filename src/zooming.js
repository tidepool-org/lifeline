var ns = {};

ns._mapping = {
  'year': {
    chart: require('./YearView/YearChart'),
    title: require('./YearView/YearTitle')
  }
};

ns.getChartForLevel = function(level) {
  var match = this._mapping[level];
  if (!match) {
    return null;
  }
  return match.chart;
};

ns.getTitleForLevel = function(level) {
  var match = this._mapping[level];
  if (!match) {
    return null;
  }
  return match.title;
};

module.exports = ns;
