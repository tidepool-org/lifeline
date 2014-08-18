/** @jsx React.DOM */

var React = require('react');
var _ = require('lodash');

var zooming = require('./zooming');
var dataService = window.dataService = require('./dataService');

var Spinner = require('./Spinner');

require('./App.less');

var App = React.createClass({
  getInitialState: function() {
    return {
      zoom: {
        level: 'year',
        location: '2014'
      },
      loading: false
    };
  },

  componentDidMount: function() {
    this.createChart();
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (!_.isEqual(this.state.zoom, prevState.zoom)) {
      this.removeChart();
      this.createChart();
    }
  },

  createChart: function(cb) {
    var el = this.refs.chart.getDOMNode();
    var Chart = zooming.getChart(this.state.zoom);
    this.chart = Chart.create(el, {
      width: el.offsetWidth,
      height: el.offsetHeight,
      location: this.state.zoom.location
    });
    this.chart.emitter.on('zoom', this.handleZoom);
    this.chart.draw();

    var self = this;
    this.setState({loading: true});
    dataService.fetchForZoom(this.state.zoom, function(err, dataCube) {
      if (err) {
        throw err;
      }
      self.chart.draw(dataCube);
      self.setState({loading: false});
      return cb && cb();
    });
  },

  removeChart: function() {
    var el = this.refs.chart.getDOMNode();
    this.chart.remove(el);
  },

  render: function() {
    var self = this;
    var Title = zooming.getTitle(this.state.zoom);
    var previousPageZoom = zooming.previousPage(this.state.zoom);
    var handleClickPreviousPage = function(e) {
      e.preventDefault();
      return self.handleZoom(previousPageZoom);
    };
    var nextPageZoom = zooming.nextPage(this.state.zoom);
    var handleClickNextPage = function(e) {
      e.preventDefault();
      return self.handleZoom(nextPageZoom);
    };

    return (
      <div className="App">
        {this.renderSpinner()}
        <div className="App-verticalAlign">
          {this.renderZoomOut()}
          <div className="App-middleHorizontalAlign">
            <a href="#" className="App-zoom App-zoom--vertical"
              onClick={handleClickPreviousPage}>
              <div className="App-zoomIcon">&#9664;</div>
            </a>
            <div className="App-middleVerticalAlign">
              <div className="App-title">
                <Title zoom={this.state.zoom} />
              </div>
              {this.renderTabs()}
              <div className="App-chart" ref="chart"></div>
            </div>
            <a href="#" className="App-zoom App-zoom--vertical"
              onClick={handleClickNextPage}>
              <div className="App-zoomIcon">&#9654;</div>
            </a>
          </div>
          {this.renderZoomIn()}
        </div>
      </div>
    );
  },

  renderSpinner: function() {
    if (!this.state.loading) {
      return null;
    }
    return <div className="App-spinnerLayer"><Spinner /></div>;
  },

  renderTabs: function() {
    var tabs = zooming.getTabs(this.state.zoom);

    var tabNodes = _.map(tabs, function(tab, index) {
      var classes = 'App-tab';

      // Fake it till you make it
      if (index === 0) {
        classes += ' is-active';
      }

      return <a key={tab.code} href="#" className={classes}>{tab.label}</a>;
    });

    return (
      <div className="App-tabs">
        {tabNodes}
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
    var self = this;
    var handleClick = function(e) {
      e.preventDefault();
      self.handleZoom(newZoom);
    };
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
    var self = this;
    var handleClick = function(e) {
      e.preventDefault();
      self.handleZoom(newZoom);
    };

    return (
      <a href="#" className="App-zoom App-zoom--horizontal"
        onClick={handleClick}>
        <div className="App-zoomIcon">&oplus;</div>
      </a>
    );
  },

  handleZoom: function(zoom) {
    this.setState({zoom: zoom});
  }
});

module.exports = App;
