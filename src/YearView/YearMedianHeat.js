var d3 = window.d3;

require('../CommonView/MonthChartInner');

d3.chart('MonthInner').extend('YearMedianHeat', {
  initialize: function() {
    this.layer('MonthInner-data').on('enter', function() {

      var heat = d3.scale.linear()
        .domain(d3.extent(this.data(), function(d) { return d.value; }))
        .range(['white', 'green'])
        .interpolate(d3.interpolateHcl);

      return this.attr({
        fill: function(d) { return heat(d.value); }
      });
    });
  }
});

var chart;

module.exports = {
  create: function(el, options) {
    chart = d3.select(el)
      .chart('YearMedianHeat')
      .location(options.location)
      .width(options.width)
      .height(options.height)
      .margins(options.margins);
    return chart;
  }
};