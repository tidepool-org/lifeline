var moment = require('moment');

var ns = {};

ns._mapping = {
  'year': {
    chart: require('./YearView/YearChart'),
    title: require('./YearView/YearTitle'),
    tabs: require('./YearView/YearTabs'),
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
    },
    rangeFor: function(location) {
      return [
        moment(location, 'YYYY').format('YYYY-MM-DDTHH:mm:ss'),
        moment(location, 'YYYY').add(1, 'years').format('YYYY-MM-DDTHH:mm:ss')
      ];
    }
  },

  'month': {
    chart: require('./MonthView/MonthChart'),
    title: require('./MonthView/MonthTitle'),
    tabs: require('./MonthView/MonthTabs'),
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
    },
    rangeFor: function(location) {
      return [
        moment(location, 'YYYY-MM').format('YYYY-MM-DDTHH:mm:ss'),
        moment(location, 'YYYY-MM').add(1, 'months').format('YYYY-MM-DDTHH:mm:ss')
      ];
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

ns.getTabs = function(zoom) {
  return this._findLevel(zoom.level).tabs;
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

ns.range = function(zoom) {
  return this._findLevel(zoom.level).rangeFor(zoom.location);
};

module.exports = ns;
