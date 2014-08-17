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
    this.createChart();
  },

  componentDidUpdate: function() {
    this.removeChart();
    this.createChart();
  },

  createChart: function() {
    var el = this.refs.chart.getDOMNode();
    var Chart = zooming.getChart(this.state.zoom);
    this.chart = Chart.create(el, {
      width: el.offsetWidth,
      height: el.offsetHeight,
      location: this.state.zoom.location
    });
    this.chart.emitter.on('zoom', this.handleZoom);
    this.chart.draw();
  },

  removeChart: function() {
    var el = this.refs.chart.getDOMNode();
    this.chart.remove(el);
  },

  render: function() {
    var Title = zooming.getTitle(this.state.zoom);

    return (
      <div className="App">
        <div className="App-rows">
          <div className="App-title">
            <Title zoom={this.state.zoom} />
          </div>
          {this.renderZoomOut()}
          <div className="App-columns">
            <a href="#" className="App-zoom App-zoom--vertical">
              <div className="App-zoomIcon">&#9664;</div>
            </a>
            <div className="App-chart" ref="chart"></div>
            <a href="#" className="App-zoom App-zoom--vertical">
              <div className="App-zoomIcon">&#9654;</div>
            </a>
          </div>
          {this.renderZoomIn()}
        </div>
      </div>
    );
  },

  renderZoomOut: function() {
    if (!zooming.canZoomOut(this.state.zoom)) {
      return (
        <div className="App-zoom App-zoom--horizontal is-disabled">
          <div className="App-zoomIcon">&#8854;</div>
        </div>
      );
    }

    var newZoom = zooming.zoomOut(this.state.zoom);
    var handleClick = this.handleZoom.bind(this, newZoom);

    return (
      <a href="#" className="App-zoom App-zoom--horizontal"
        onClick={handleClick}>
        <div className="App-zoomIcon">&#8854;</div>
      </a>
    );
  },

  renderZoomIn: function() {
    if (!zooming.canZoomIn(this.state.zoom)) {
      return (
        <div className="App-zoom App-zoom--horizontal is-disabled">
          <div className="App-zoomIcon">&oplus;</div>
        </div>
      );
    }

    var newZoom = zooming.zoomIn(this.state.zoom);
    var handleClick = this.handleZoom.bind(this, newZoom);

    return (
      <a href="#" className="App-zoom App-zoom--horizontal"
        onClick={handleClick}>
        <div className="App-zoomIcon">&oplus;</div>
      </a>
    );
  },

  handleZoom: function(zoom) {
    console.log('zoom', zoom);
    this.setState({zoom: zoom});
  }
});

module.exports = App;
