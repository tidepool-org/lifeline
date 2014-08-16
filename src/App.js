/** @jsx React.DOM */

var React = require('react');

var YearTitle = require('./YearView/YearTitle');
var YearChart = require('./YearView/YearChart');

require('./App.less');

var command = {
  type: 'year',
  domain: '2014'
};

var App = React.createClass({
  componentDidMount: function() {
    var el = this.refs.chart.getDOMNode();
    this.chart = YearChart.create(el, {
      width: 100,
      height: 100,
      domain: command.domain
    });
  },

  render: function() {
    var title = YearTitle({command: command});

    return (
      <div className="App">
        <div className="App-title">{title}</div>
        <div className="App-chart" ref="chart"></div>
      </div>
    );
  }
});

module.exports = App;
