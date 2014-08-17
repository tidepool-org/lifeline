var d3 = window.d3;

require('../CommonView/MonthChartInner');

d3.chart('MonthInner').extend('MonthBarTIR', {
  initialize: function() {
    this.layer('MonthInner').on('enter', function() {

    });
  }
});

var chart;

module.exports = {
  create: function(el, options) {
    chart = d3.select(el)
      .chart('MonthBarTIR')
      .location(options.location)
      .width(options.width)
      .height(options.height)
      .margins(options.margins);
    return chart;
  }
};