require('../Chart.less');
var EventEmitter = require('events').EventEmitter;

var d3 = window.d3;

d3.chart('Month', {
  initialize: function() {
    this.w = this.base.attr('width');
    this.h = this.base.attr('height');
    this.emitter = new EventEmitter();
  },
  location: function(month) {
    return this;
  },
  remove: function() {
    this.base.remove();
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
