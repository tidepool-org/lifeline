var d3 = window.d3;

require('../CommonView/MonthChartInner');

d3.chart('MonthInner').extend('YearMedianHeat', {
  initialize: function() {
    this.layer('MonthInner').on('enter', function() {

      var heat = d3.scale.linear()
      return this.style({
        // 'fill-opacity': '0.0'
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