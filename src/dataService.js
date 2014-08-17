var d3 = window.d3;
var crossfilter = require('crossfilter');
var _ = require('lodash');

var zooming = require('./zooming');

var ns = {};

ns._urls = {
  '2012': require('file!../tmp/2012.json'),
  '2013': require('file!../tmp/2013.json'),
  '2014': require('file!../tmp/2014.json')
};

ns._cache = {};

ns.fetchForZoom = function(zoom, cb) {
  var year = zooming.year(zoom);

  var cached = this._cache[year];
  if (cached) {
    return cb(null, cached);
  }

  var url = this._urls[year];
  if (!url) {
    return cb(null, null);
  }

  var self = this;
  d3.json(url, function(err, data) {
    if (err) {
      console.error('Error fetching and parsing data for year ' + year);
      throw err;
    }
    data = self._processRawData()
    var cube = self._createDataCube(data);
    self._cache[year] = cube;
    return cb && cb(null, cube);
  });
};

ns._processRawData = function(data) {
  return _.map(data, function(d) {
    // Basal rate segments don't have "deviceTime"
    // this should change in the future with Tidepool's new data model
    if (!d.deviceTime && d.start) {
      d.deviceTime = d.start;
      return d;
    }
    else if (!d.deviceTime){
      throw new Error('Datum has no "deviceTime" or "start" attribute');
    }
    return d;
  });
};

ns._createDataCube = function(rawData) {
  var crossData = crossfilter(rawData);
  var deviceTimeDimension = crossData.dimension(function(d) {
    return d.deviceTime;
  });
  var typeDimension = crossData.dimension(function(d) { return d.type; });

  return {
    getData: function() {
      return deviceTimeDimension.bottom(Infinity);
    },

    filterBy: function(dimension, value) {
      if (dimension === 'deviceTime') {
        deviceTimeDimension.filter(value);
      }
      else if (dimension === 'type') {
        typeDimension.filter(value);
      }
      else {
        throw new Error('Can\'t filter by dimension "' + dimension + '"');
      }
      return this;
    },

    clearFilters: function () {
      deviceTimeDimension.filterAll();
      typeDimension.filterAll();
      return this;
    }
  };
};

module.exports = ns;
