require('../Chart.less');
var EventEmitter = require('events').EventEmitter;

var d3 = window.d3;
var moment = require('moment');

var MonthChartInner = require('../MonthView/MonthChartInner');

d3.chart('Year', {
  initialize: function() {
    this.w = this.base.attr('width');
    this.h = this.base.attr('height');
    this.emitter = new EventEmitter();

    var chart = this;
    var margin = 10;
    var boxWidth = (this.w - margin * 7)/6, boxHeight = (this.h - margin * 3)/2;

    var monthData = function(el) {
      return function() { return this.selectAll(el).data(chart.months()); };
    };

    this.layer('month-containers', this.base.append('g').attr('id', 'month-containers'), {
      dataBind: monthData('g'),
      insert: function() {
        return this.append('g');
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
          // var location = this.datum().format('YYYY-MM');
          this.attr({
            'class': 'Chart-month',
            'transform': function(d, i) {
                return 'translate(' + xPosition(d, i) + ',' + yPosition(d) + ')';
              }
            })
            .append('rect')
            .attr({
              width: boxWidth,
              height: boxHeight,
              'class': 'Chart-rect--invisible'
            })
            .on('click', function() {
              chart.emitter.emit('zoom', {
                type: 'month',
                domain: location
              });
            });
          for (var i = 0; i < this.size(); ++i) {
            var month = MonthChartInner.create(this[0][i], {
              location: location
            });
            month.draw(); 
          }
        }
      }
    });

    this.layer('month-text', this.base.append('g').attr('id', 'month-text'), {
      dataBind: monthData('text'),
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
          };
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
      .chart('Year')
      .location(options.location);
    return chart;
  }
};
