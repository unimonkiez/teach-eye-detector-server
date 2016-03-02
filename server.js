const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const appServerPort = 4567;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const datas = [];

app.use(express.static('app'));
app.get('/api/delete', (req, res) => {
  datas = [];
  return res.send('OK');
});
app.get('/api/post', (req, res) => {
  const data = JSON.parse(req.query.data);
  console.log(data);
  datas.push(data);
  return res.send('OK');
});
app.get('/api/get', (req, res) => {
  return res.send(datas);
});

app.listen(appServerPort, () => {
  console.log('Example app listening on port ' + appServerPort);
});
