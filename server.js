const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const appServerPort = 4567;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var randomPics = [
  'profiles/1.jpg',
  'profiles/2.jpg',
  'profiles/3.jpg',
  'profiles/4.jpg',
  'profiles/5.jpg',
  'profiles/6.jpg',
  'profiles/7.jpg',
  'profiles/8.jpg',
  'profiles/9.jpg',
  'profiles/10.jpg'
];
randomPicsLength = randomPics.length;
const rt = {};
const datas = [];

app.use(express.static('app'));
app.get('/api/delete', (req, res) => {
  datas.splice(0);
  Object.keys(rt).forEach(rtKey => {
    delete rt[rtKey];
  });
  return res.send('OK');
});
app.get('/api/post', (req, res) => {
  const data = JSON.parse(req.query.data);
  console.log(data);
  datas.push(data);
  if (data.name.toLowerCase() === 'yuval') {
    data.pic = 'profiles/yuval.jpg';
  } else {
    data.pic = randomPics[Math.floor(Math.random() * randomPicsLength)];
  }
  rt[data.sessionId] = data;
  return res.send('OK');
});
app.get('/api/getAll', (req, res) => {
  return res.send(datas);
});
app.get('/api/get', (req, res) => {
  console.log(Object.keys(rt).length);
  return res.send(rt);
});

app.listen(appServerPort, () => {
  console.log('Example app listening on port ' + appServerPort);
});
