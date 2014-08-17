require('../Chart.less');
var EventEmitter = require('events').EventEmitter;

var d3 = window.d3;
var moment = require('moment');

d3.chart('MonthInner', {
  initialize: function() {
    var dayData = function(el) {
      return function() { return this.selectAll(el).data(chart.days()); };
    };
    this.layer('day-containers', this.base.append('g').attr('id', 'day-containers'), {
      dataBind: dayData('rect'),
      insert: function() {
        return this.append('rect');
      },
      events: {
        enter: function() {
          this.attr({
            width: 10,
            height: 10,
            x: function(d, i) { return i * 10; },
            y: 0
          });
        }
      }
    })
  },
  location: function(location) {
    var _days = [];
    for (var i = 0; i < 31; ++i) {
      var day = moment(location + '-' + (i < 10) ? '0' + i : i, 'YYYY-MM-DD');
      if (day.isValid()) {
        _days.push(day);
      }
    }
    console.log(_days);
    this.days = function() { return _days; };
    return this;
  }
});

var chart;

module.exports = {
  create: function(el, options) {
    chart = d3.select(el)
      .chart('MonthInner')
      .location(options.location);

    return chart;
  }
};