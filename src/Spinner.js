/** @jsx React.DOM */

var React = require('react');

require('./Spinner.less');

var Spinner = React.createClass({
  render: function() {
    return (
      <div className="Spinner Spinner--ringed"></div>
    );
  }
});

module.exports = Spinner;
