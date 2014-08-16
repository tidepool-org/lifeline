require('script!d3/d3.min.js');
require('script!d3.chart/d3.chart.min.js');

var React = require('react');

var App = require('./app');

window.app = React.renderComponent(App(), document.body);
