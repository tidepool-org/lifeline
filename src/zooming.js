var moment = require('moment');

var ns = {};

ns._mapping = {
  'year': {
    chart: require('./YearView/YearChart'),
    title: require('./YearView/YearTitle'),
    pageFrom: function(location, delta) {
      return {
        level: 'year',
        location: moment(location, 'YYYY').add(delta, 'years').format('YYYY')
      };
    },
    zoomOutFrom: null,
    zoomInFrom: function(location) {
      return {
        level: 'month',
        location: location + '-01'
      };
    },
    yearOf: function(location) {
      return location;
    }
  },
  'month': {
    chart: require('./MonthView/MonthChart'),
    title: require('./MonthView/MonthTitle'),
    pageFrom: function(location, delta) {
      return {
        level: 'month',
        location: moment(location, 'YYYY-MM').add(delta, 'months').format('YYYY-MM')
      };
    },
    zoomOutFrom: function(location) {
      return {
        level: 'year',
        location: location.slice(0, 4)
      };
    },
    zoomInFrom: null,
    yearOf: function(location) {
      return moment(location, 'YYYY-MM').format('YYYY');
    }
  },
};

ns._findLevel = function(level) {
  var match = this._mapping[level];
  if (!match) {
    throw new Error('Could not find zoom level "' + level + '"');
  }
  return match;
};

ns.getChart = function(zoom) {
  return this._findLevel(zoom.level).chart;
};

ns.getTitle = function(zoom) {
  return this._findLevel(zoom.level).title;
};

ns.canZoomOut = function(zoom) {
  return Boolean(this._findLevel(zoom.level).zoomOutFrom);
};

ns.canZoomIn = function(zoom) {
  return Boolean(this._findLevel(zoom.level).zoomInFrom);
};

ns.zoomOut = function(zoom) {
  var zoomOutFrom = this._findLevel(zoom.level).zoomOutFrom;
  if (!zoomOutFrom) {
    return null;
  }
  return zoomOutFrom(zoom.location);
};

ns.zoomIn = function(zoom) {
  var zoomInFrom = this._findLevel(zoom.level).zoomInFrom;
  if (!zoomInFrom) {
    return null;
  }
  return zoomInFrom(zoom.location);
};

ns.nextPage = function(zoom) {
  return this._findLevel(zoom.level).pageFrom(zoom.location, 1);
};

ns.previousPage = function(zoom) {
  return this._findLevel(zoom.level).pageFrom(zoom.location, -1);
};

ns.year = function(zoom) {
  return this._findLevel(zoom.level).yearOf(zoom.location);
};

module.exports = ns;
