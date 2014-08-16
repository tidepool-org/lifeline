require('../Chart.less');
var EventEmitter = require('events').EventEmitter;

var d3 = window.d3;
var moment = require('moment');

d3.chart('Year', {
  initialize: function() {
    this.w = this.base.attr('width');
    this.h = this.base.attr('height');
    this.emitter = new EventEmitter();

    var chart = this;
    var margin = 10;
    var boxWidth = (this.w - margin * 7)/6, boxHeight = (this.h - margin * 3)/2;

    this.layer('month-boxes', this.base.append('g').attr('id', 'month-boxes'), {
      dataBind: function() {
        return this.selectAll('rect').data(chart.months());
      },
      insert: function() {
        return this.append('rect');
      },
      events: {
        enter: function() {
          var xPosition = function(d, i) {
            var month = d.month();
            if (month >= 6) {
              i = i - 6;
            }
            return i * boxWidth + (i + 1) * margin;
          };
          var yPosition = function(d) {
            var month = d.month();
            if (month >= 6) {
              return chart.h/2 + margin/2;
            }
            else {
              return margin;
            }
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

    this.layer('month-text', this.base.append('g').attr('id', 'month-text'), {
      dataBind: function() {
        return this.selectAll('text').data(chart.months());
      },
      insert: function() {
        return this.append('text');
      },
      events: {
        enter: function() {
          var xPosition = function(d, i) {
            var month = d.month();
            if (month >= 6) {
              i = i - 6;
            }
            return i * boxWidth + (i + 1) * margin + boxWidth/2;
          };
          var yPosition = function(d) {
            var month = d.month();
            if (month >= 6) {
              return chart.h/2 + margin/2 + margin*2;
            }
            else {
              return margin * 3;
            }
          };
          var monthText = function(d) {
            return d.format('MMMM');
          }
          this.attr({
            x: xPosition,
            y: yPosition,
            'class': 'Chart-text Chart-text--centered'
          })
          .text(monthText);
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
