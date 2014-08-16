/** @jsx React.DOM */

var React = require('react');

var YearTitle = React.createClass({
  render: function() {
    return (
    /* jshint ignore:start */
      <div className="YearTitle">
        {this.props.command.domain}
      </div>
    /* jshint ignore:end */
    );
  }
});

module.exports = YearTitle;
