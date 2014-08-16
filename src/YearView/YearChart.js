var d3 = window.d3;

d3.chart('Year', {
  initialize: function() {
    // ...
  },

  width: function() {},
  height: function() {},
  domain: function() {}
});

var chart;

module.exports = {
  create: function(el, options) {
    chart = d3.select(el)
      .append('svg')
      .chart('Year');
        // .width(options.width)
        // .height(options.height)
        // .domain(options.domain);
    return chart;
  }
};
