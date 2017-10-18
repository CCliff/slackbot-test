'use strict';
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const express    = require('express');
const bodyParser = require('body-parser');

const DataController = require('./controllers/dataController.js').DataController;
const dataController = new DataController();

//   Constants  //
const PORT = process.env.PORT || 8080;

//   App
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//   Routes  //
app.get('/', (req, res) => {
  res.send('Hello world\n');
});
app.post('/slack', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});
app.get('/loadDBSlack', (req, res) => {
  dataController.loadDBSlack().then((response) => {
    res.send(response);
  });
});
app.get('/users', (req, res) => {
  dataController.getUsers(req.query).then((response) => {
    res.send(response);
  });
});
app.get('/clearData', (req, res) => {
  dataController.clearData().then((response) => {
    res.send(response);
  });
});


app.listen(PORT, function(){
  console.log(`Running on port: ${PORT}`);
});
