var numOfQuizs = 3;
var Report = React.createClass({
  getInitialState: function() {
    return {
      data: [],
      quizes: []
    };
  },
  componentWillMount: function() {
    this.getReportData();
  },
  getReportData: function() {
    var _this = this;
    fetch('api/getAll').then(function(response){
      return response.json().then(function(json) {
        var lowestTime;
        var greatestTime;
        json.forEach(function(studentAtTime) {
          var time = studentAtTime.data.time;
          if (!(lowestTime && time < lowestTime)) {
            lowestTime = time
          }
          if (!(greatestTime && time > greatestTime)) {
            greatestTime = time
          }
        });
        if (greatestTime !== undefined) {
          var difference = ((greatestTime - lowestTime) / numOfQuizs);
          _this.setState({
            data: json,
            quizes: Array(numOfQuizs).fill().map(function(_, i) {
              return {
                start: lowestTime + (i * difference),
                end: lowestTime + ((i + 1) * difference)
              }
            })
          });
        }
      });
    });
  },
  render: function() {
    var _this = this;
    return (
      React.createElement(
        'div',
        { style: { fontFamily: 'Open Sans' } },
        React.createElement('div', { style: { lineHeight: '100px', fontSize: '48px', fontWeight: 'bold', backgroundColor: '#991099', color: 'white', textAlign: 'center' } }, 'Lesson Report'),
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
        React.createElement('div', { style: { padding: '50px' } },
          React.createElement('div', { style: { borderBottom: '1px solid black', paddingBottom: '60px' } },
            React.createElement('span', { style: { fontSize: '36px', fontWeight: 'bold', color: '#666666' } }, 'Class Over View')
          ),
          _this.state.quizes.map(function(quiz, quizIndex) {
            var quizNumber = quizIndex + 1;

            var total = { smile: 0, focus: 0, sleep: 0, num: 0 };
            var students = {};

            var quizData = _this.state.data.forEach(function(studentAtTime) {
              var time = studentAtTime.data.time;
              var sessionId = studentAtTime.sessionId;

              var smilePerc = studentAtTime.data.smile * 100;
              var sleepPerc = studentAtTime.data.sleep ? 100 : 0;
              var focusPerc = studentAtTime.data.lookAtTheScreen ? 0 : 100;
              total.num++;
              total.smile += smilePerc;
              total.sleep += sleepPerc;
              total.focus += focusPerc;
              if (time >= quiz.start && time <= quiz.end) {
                var student = students[sessionId];
                if (student === undefined) {
                  students[sessionId] = { smile: 0, focus: 0, sleep: 0, num: 0 };
                  student = students[sessionId];
                }
                var smilePerc = studentAtTime.data.smile * 100;
                var sleepPerc = studentAtTime.data.sleep ? 100 : 0;
                var focusPerc = studentAtTime.data.lookAtTheScreen ? 0 : 100;

                student.num++;
                student.smile += smilePerc;
                student.sleep += sleepPerc;
                student.focus += focusPerc;
              }
            });

            total.smile = total.smile / total.num;
            total.sleep = total.sleep / total.num;
            total.focus = total.focus / total.num;
            Object.keys(students).forEach(function( studentKey ) {
              var student = students[studentKey];
              student.smile = student.smile / student.num;
              student.sleep = student.sleep / student.num;
              student.focus = student.focus / student.num;
            });

            var circles = [{
              color: '#2a378e',
              perc: total.smile
            },
            {
              color: '#e26e17',
              perc: total.focus
            },
            {
              color: '#e01945',
              perc: total.sleep
            },
            ].map(function(circle) {
              var rotation = Math.floor((circle.perc / 100) * 180);
              return {
                perc: circle.perc,
                color: circle.color,
                fill_rotation: rotation,
                fix_rotation: rotation * 2
              };
            });

            return (
              React.createElement('div', { style: { borderBottom: '1px solid black', paddingBottom: '60px' } },
                React.createElement('div', { style: { fontSize: '36px', fontWeight: 'bold', color: '#666666' } }, 'Quiz ' + quizNumber),
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-around', paddingBottom: '20px' } },
                  React.createElement('span', { style: {  } },
                    React.createElement('img', { src: 'smile/smile-color.png', style: { verticalAlign: 'middle'  } }),
                    React.createElement('span', { style: { paddingLeft: '5px' } }, 'Smile')
                  ),
                  React.createElement('span', { style: {  } },
                    React.createElement('img', { src: 'smile/atten-color.png', style: { verticalAlign: 'middle'  } }),
                    React.createElement('span', { style: { paddingLeft: '5px' } }, 'Out of focus')
                  ),
                  React.createElement('span', { style: {  } },
                    React.createElement('img', { src: 'smile/sleep-color.png', style: { verticalAlign: 'middle'  } }),
                    React.createElement('span', { style: { paddingLeft: '5px' } }, 'Sleep')
                  )
                ),
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-around' } },
                  circles.map(function(circle) {
                    return (
                      React.createElement('div', { style: { position: 'relative' } },
                        React.createElement(
                          "div",
                          { className: "big-radial-progress" },
                          React.createElement(
                            "div",
                            { className: "circle" },
                            React.createElement(
                              "div",
                              { className: "mask full", style: { transform: 'rotate(' + circle.fill_rotation + 'deg)' } },
                              React.createElement("div", { className: "fill", style: { backgroundColor: circle.color, transform: 'rotate(' + circle.fill_rotation + 'deg)' } })
                            ),
                            React.createElement(
                              "div",
                              { className: "mask half" },
                              React.createElement("div", { className: "fill", style: { backgroundColor: circle.color, transform: 'rotate(' + circle.fill_rotation + 'deg)' } }),
                              React.createElement("div", { className: "fill fix", style: { backgroundColor: circle.color, transform: 'rotate(' + circle.fix_rotation + 'deg)' } })
                            )
                          )
                        ),
                        React.createElement('div', { style: { position: 'absolute', fontWeight: 'bold', fontSize: '48px', color: circle.color, textAlign: 'center', lineHeight: '164px', height: '90%', backgroundColor: '#EBEFF0', width: '90%', top: '5%', left: '5%', borderRadius: '50%' } }, circle.perc + '%')
                      )
                    );
                  })
                )
              )
            );
          }),
          React.createElement('div', { style: { backgroundColor: 'red' } }, '123123')
        )
      )
    );
  }
});
