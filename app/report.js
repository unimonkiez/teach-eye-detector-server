var Report = React.createClass({
  getInitialState: function() {
    return {
      data: []
    };
  },
  componentWillMount: function() {
    this.getReportData();
  },
  getReportData: function() {
    var _this = this;
    fetch('api/getAll').then(function(response){
      return response.json().then(function(json) {
        _this.setState({
          data: json
        });
      });
    });
  },
  render: function() {
    return React.DOM.p(null, 'Report' + this.state.data.length);
  }
});
