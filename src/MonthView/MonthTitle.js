/** @jsx React.DOM */

var React = require('react');
var moment = require('moment');

var MonthTitle = React.createClass({
  render: function() {
    var title = moment(this.props.zoom.location, 'YYYY-MM').format('MMMM YYYY');

    return (
    /* jshint ignore:start */
      <div className="MonthTitle">
        {title}
      </div>
    /* jshint ignore:end */
    );
  }
});

module.exports = MonthTitle;
