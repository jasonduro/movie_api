const express = require('express');
const app = express();

let myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};

let requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

app.use(myLogger);
app.use(requestTime);

app.get('/', (req, res) => {
  res.send('Welcome to my app!');
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
});

app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});