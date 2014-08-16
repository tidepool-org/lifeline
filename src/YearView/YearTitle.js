/** @jsx React.DOM */

var React = require('react');

var YearTitle = React.createClass({
  render: function() {
    return (
      <div className="YearTitle">
        {this.props.command.domain}
      </div>
    );
  }
});

module.exports = YearTitle;
