var _ = require('lodash');
var d3 = window.d3;

require('../CommonView/MonthChartInner');

d3.chart('MonthInner').extend('MonthBarTIR', {
  initialize: function() {
    this.layer('MonthInner-data').on('enter', function() {
      this.attr('class', 'Chart-rect--invisible');

      var parent = d3.select(this[0].parentNode);

      var xScale = d3.scale.linear()
        .domain([0,1])
        .range([0, d3.select(this[0][0]).attr('width')]);

      var reshape = function(data) {
        return _.map(data, function(d) {
          var shaped = {};
          shaped.x = d.category;
          shaped.y = d.value;
          return [shaped];
        });
      };

      this.each(function(d) {
        var stack = _.map(d3.layout.stack()(reshape(d.value)), function(s) {
          return s[0];
        });

        var node = d3.select(this);

        var parentGroup = parent.append('g')
          .attr({
            'class': 'BarTIR',
            transform: 'translate(' + node.attr('x') + ',' + node.attr('y') + ')'
          });

        parentGroup.selectAll('rect')
          .data(stack)
          .enter()
          .append('rect')
          .attr({
            x: function(d) { return xScale(d.y0); },
            y: 0,
            width: function(d) { return xScale(d.y); },
            height: node.attr('height'),
            'class': function(d) {
              return d.x;
            }
          });
      });
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