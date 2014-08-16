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
      width: el.offsetWidth,
      height: el.offsetHeight,
      domain: command.domain
    });
    this.chart.draw();
  },

  render: function() {
    var title = YearTitle({command: command});

    return (
      /* jshint ignore:start */
      <div className="App">
        <div className="App-rows">
          <div className="App-title">{title}</div>
          <a href="#" className="App-zoom App-zoom--horizontal">
            <div className="App-zoomIcon">&#8854;</div>
          </a>
          <div className="App-columns">
            <a href="#" className="App-zoom App-zoom--vertical">
              <div className="App-zoomIcon">&#9664;</div>
            </a>
            <div className="App-chart" ref="chart"></div>
            <a href="#" className="App-zoom App-zoom--vertical">
              <div className="App-zoomIcon">&#9654;</div>
            </a>
          </div>
          <a href="#" className="App-zoom App-zoom--horizontal">
            <div className="App-zoomIcon">&oplus;</div>
          </a>
        </div>
      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = App;
