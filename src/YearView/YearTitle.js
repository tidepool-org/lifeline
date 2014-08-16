/** @jsx React.DOM */

var React = require('react');

var YearTitle = React.createClass({
  render: function() {
    return (
      <div className="YearTitle">
        {this.props.zoom.location}
      </div>
    );
  }
});

module.exports = YearTitle;
