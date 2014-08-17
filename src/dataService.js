var d3 = window.d3;

var ns = {};

ns._urls = {
  '2012': require('file!../tmp/2012.json'),
  '2013': require('file!../tmp/2013.json'),
  '2014': require('file!../tmp/2014.json')
};

ns._cache = {};

ns.fetchYear = function(year, cb) {
  var cached = this._cache[year];
  if (cached) {
    return cb(null, cached);
  }

  var url = this._urls[year];
  if (!url) {
    return cb(null, []);
  }

  var self = this;
  d3.json(url, function(err, data) {
    if (err) {
      console.error('Error fetching and parsing data for year ' + year);
      throw err;
    }
    self._cache[year] = data;
    return cb && cb(null, data);
  });
};

module.exports = ns;
