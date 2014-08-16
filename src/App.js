/** @jsx React.DOM */

var React = require('react');

var zooming = require('./zooming');

require('./App.less');

var App = React.createClass({
  getInitialState: function() {
    return {
      zoom: {
        level: 'year',
        location: '2014'
      }
    };
  },

  componentDidMount: function() {
    var el = this.refs.chart.getDOMNode();
    var Chart = zooming.getChartForLevel(this.state.zoom.level);
    this.chart = Chart.create(el, {
      width: el.offsetWidth,
      height: el.offsetHeight,
      location: this.state.zoom.location
    });
    this.chart.draw();
  },

  render: function() {
    var Title = zooming.getTitleForLevel(this.state.zoom.level);

    return (
      <div className="App">
        <div className="App-rows">
          <div className="App-title">
            <Title zoom={this.state.zoom} />
          </div>
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
    );
  }
});

module.exports = App;
