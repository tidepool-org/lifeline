var ns = {};

// https://gist.github.com/caseyjustus/1166258
ns.median = function(values) {
  values.sort( function(a,b) {return a - b;} );

  var half = Math.floor(values.length/2);

  if (values.length % 2) {
    return values[half];
  }
  else {
    return (values[half-1] + values[half]) / 2.0;
  }
};

ns.dayFromIso = function(iso) {
  return iso.slice(0, 10);
};

module.exports = ns;
