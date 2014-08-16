require('../Chart.less');
var EventEmitter = require('events').EventEmitter;

var d3 = window.d3;
var moment = require('moment');

d3.chart('Year', {
  initialize: function() {
    this.w = this.base.attr('width');
    this.h = this.base.attr('height');
    this.emitter = new EventEmitter();
    this.layer('month-boxes', this.base.append('g'), {
      dataBind: function() {
        var chart = this.chart();
        return this.selectAll('rect').data(chart.months());
      },
      insert: function() {
        return this.append('rect');
      },
      events: {
        'enter': function() {
          var chart = this.chart();
          var margin = 10;
          var boxWidth = (chart.w - margin * 7)/6, boxHeight = (chart.h - margin * 3)/2;
          var yPosition = function(d) {
            var month = d.month();
            if (month >= 6) {
              return chart.h/2 + margin/2;
            }
            else {
              return margin;
            }
          };
          var xPosition = function(d, i) {
            var month = d.month();
            if (month >= 6) {
              i = i - 6;
            }
            return i * boxWidth + (i + 1) * margin;
          };
          this.attr({
            width: boxWidth,
            height: boxHeight,
            x: xPosition,
            y: yPosition,
            fill: 'red',
            'class': 'Chart-rect--invisible'
          })
          .on('click', function() {
            chart.emitter.emit('zoom', {
              type: 'month',
              domain: d3.select(this).datum().format('YYYY-MM')
            });
          });
        }
      }
    });
  },
  location: function(year) {
    var _months = [];
    for (var i = 0; i < 12; ++i) {
      _months.push(moment(year + ' ' + (i + 1), 'YYYY M'));
    }
    this.months = function() { return _months; };
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
      .chart('Year')
      .location(options.location);
    return chart;
  }
};
