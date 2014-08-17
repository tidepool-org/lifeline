/** @jsx React.DOM */

var React = require('react');
var moment = require('moment');

var MonthTitle = React.createClass({
  render: function() {
    var title = moment(this.props.zoom.location, 'YYYY-MM').format('MMMM YYYY');

    return (
      <div className="MonthTitle">
        {title}
      </div>
    );
  }
});

module.exports = MonthTitle;
