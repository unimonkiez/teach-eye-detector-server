var PAGE = {
  rt: 0,
  report: 1
}
var App = React.createClass({
  getInitialState: function() {
    return {
      page: PAGE.rt
    };
  },
  render: function() {
    var _this = this;
    var isRt = _this.state.page === PAGE.rt;
    return (
      React.createElement(
        "div",
        null,
        React.createElement('div', { onClick: function() { _this.setState({ page: isRt ? PAGE.report : PAGE.rt }); }, style: { lineHeight: '40px', fontSize: '22px', paddingLeft: '20px', color: '#666666', fontFamily: 'Open Sans' } }, '< Back to ' + (isRt ? 'the report' : 'class')),
        isRt ? React.createElement(Rt, null) : React.createElement(Report, null)
      )
    );
  }
});
