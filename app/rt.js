var Rt = React.createClass({
  getInitialState: function() {
    return {
      data: {}
    };
  },
  componentWillMount: function() {
    this.getRtData();
    this._interval = setInterval(this.getRtData, 2000);
  },
  componentWillUnmount: function() {
    clearInterval(this._interval);
  },
  getRtData: function() {

    if (!this._fetching) {
      var _this = this;
      this._fetching = true;
      fetch('api/get').then(function(response){
        return response.json().then(function(json) {
          _this.setState({
            data: json
          }, function() {
            delete _this._fetching;
          });
        });
      });
    }
  },

  render: function() {
    var _this = this;
    return (
      React.createElement(
        'div',
        { style: { fontFamily: 'Open Sans' } },
        React.createElement('div', { style: { lineHeight: '100px', fontSize: '48px', fontWeight: 'bold', backgroundColor: '#0d9995', color: 'white', textAlign: 'center' } }, 'Real Time Class Status'),
        React.createElement('div', { style: { lineHeight: '100px', fontSize: '18px', backgroundColor: '#EBEFF0', borderBottom: '1px solid #666666', textAlign: 'center' } },
          React.createElement('span', { style: { paddingRight: '50px' } },
            React.createElement('img', { src: 'smile/smile-color.png', style: { verticalAlign: 'middle'  } }),
            React.createElement('span', { style: { paddingLeft: '5px' } }, 'Smile')
          ),
          React.createElement('span', { style: { paddingRight: '50px' } },
            React.createElement('img', { src: 'smile/atten-color.png', style: { verticalAlign: 'middle'  } }),
            React.createElement('span', { style: { paddingLeft: '5px' } }, 'Out of focus')
          ),
          React.createElement('span', { style: {  } },
            React.createElement('img', { src: 'smile/sleep-color.png', style: { verticalAlign: 'middle'  } }),
            React.createElement('span', { style: { paddingLeft: '5px' } }, 'Sleep')
          )
        ),
        React.createElement(
          'div',
          { style: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '50px' } },
          Object.keys(_this.state.data).map(function (key) {
            var student = _this.state.data[key];
            var smileNum = student.data.sleep ? 0 : (student.data.lookAtTheScreen ? student.data.smile : 0);
            var rotation = Math.floor(smileNum * 180);
            var fill_rotation = rotation;
            var fix_rotation = rotation * 2;

            return React.createElement(
              'div',
              { style: { margin: '20px', border: '4px solid', borderColor:  student.data.sleep ? '#e01945' : (student.data.lookAtTheScreen ? '#2a378e' : '#e26e17'), backgroundColor: '#EBEFF0', borderRadius: '20px', position: 'relative', height: '270px', width: '250px' } },
              React.createElement('img', { src: student.pic, style: { border: '13px solid transparent', boxShadow: '0 0 0 4px #6d7482', position: 'absolute', left: '50%', top: '60px', marginLeft: '-63px', width: '100px', borderRadius: '50%' }}),
              React.createElement('img', { src: student.data.sleep ? 'smile/sleep-color.png' : 'smile/sleep.png', style: { position: 'absolute', top: '90px', right: '20px' } }),
              React.createElement('img', { src: student.data.lookAtTheScreen ? 'smile/atten.png' : 'smile/atten-color.png', style: { position: 'absolute', top: '90px', left: '20px' } }),
              React.createElement('div', { style: { position: 'relative', top: '20px', left: '50%', marginLeft: '-30px' } },
                React.createElement(
                  "div",
                  { className: "radial-progress" },
                  React.createElement(
                    "div",
                    { className: "circle" },
                    React.createElement(
                      "div",
                      { className: "mask full", style: { transform: 'rotate(' + fill_rotation + 'deg)' } },
                      React.createElement("div", { className: "fill", style: { transform: 'rotate(' + fill_rotation + 'deg)' } })
                    ),
                    React.createElement(
                      "div",
                      { className: "mask half" },
                      React.createElement("div", { className: "fill", style: { transform: 'rotate(' + fill_rotation + 'deg)' } }),
                      React.createElement("div", { className: "fill fix", style: { transform: 'rotate(' + fix_rotation + 'deg)' } })
                    )
                  )
                ),
                React.createElement('img', { src: 'smile/smile.png', style: { position: 'absolute', top: 0 } })
              ),
              React.createElement('div', { style: { textAlign: 'center', paddingTop: '140px', fontSize: '22px', color: '#6d7482', fontWeight: 'bold' } }, student.name)
            );
          })
        )
      )
    );
  }
});
