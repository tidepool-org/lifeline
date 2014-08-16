var ns = {};

ns._mapping = {
  'year': {
    chart: require('./YearView/YearChart'),
    title: require('./YearView/YearTitle')
  },
  'month': {
    chart: require('./MonthView/MonthChart'),
    title: require('./MonthView/MonthTitle')
  },
};

ns.getChartForLevel = function(level) {
  var match = this._mapping[level];
  if (!match) {
    throw new Error('Could not find zoom level "' + level + '"');
  }
  return match.chart;
};

ns.getTitleForLevel = function(level) {
  var match = this._mapping[level];
  if (!match) {
    throw new Error('Could not find zoom level "' + level + '"');
  }
  return match.title;
};

module.exports = ns;
