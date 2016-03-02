const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const appServerPort = 4567;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const rt = {};
const datas = [];

app.use(express.static('app'));
app.get('/api/delete', (req, res) => {
  datas = [];
  rt = {};
  return res.send('OK');
});
app.get('/api/post', (req, res) => {
  const data = JSON.parse(req.query.data);
  console.log(data);
  datas.push(data);
  rt[data.sessionId] = data;
  return res.send('OK');
});
app.get('/api/getAll', (req, res) => {
  return res.send(datas);
});
app.get('/api/get', (req, res) => {
  return res.send(rt);
});

app.listen(appServerPort, () => {
  console.log('Example app listening on port ' + appServerPort);
});
