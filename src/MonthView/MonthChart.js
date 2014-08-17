require('../Chart.less');
var EventEmitter = require('events').EventEmitter;

var d3 = window.d3;

var MonthChartInner = require('../MonthView/MonthChartInner');

d3.chart('Month', {
  initialize: function() {
    this.w = this.base.attr('width');
    this.h = this.base.attr('height');
    this.emitter = new EventEmitter();

    var chart = this;
    var margin = 10;

    this.layer('Month', this.base.append('g').attr('class', 'Month'), {
      dataBind: function() {
        return this.selectAll('g').data([chart.month()]);
      },
      insert: function() {
        return this.append('g');
      },
      events: {
        enter: function() {
          this.attr({
            'class': 'Chart-month',
            'transform': 'translate(' + margin + ',' + margin + ')'
          });
          var month = MonthChartInner.create(this.node(), {
            location: chart.month()
          });
          month.draw();
        }
      }
    });
  },
  location: function(location) {
    this.month = function() { return location; };
    return this;
  },
  remove: function() {
    this.base.remove();
    return this;
  }
});

var chart;

module.exports = {
  create: function(el, options) {
    chart = d3.select(el)
      .append('svg')
      .attr({
        width: options.width,
        height: options.height,
        preserveAspectRatio: 'none',
        viewBox: '0 0 ' + el.offsetWidth + ' ' + el.offsetHeight
      })
      .chart('Month')
      .location(options.location);
    return chart;
  }
};
