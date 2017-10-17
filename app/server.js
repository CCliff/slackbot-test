'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
//   Constants  //
const PORT = process.env.PORT || 8080;
//  /Constants  //

const express    = require('express');
const bodyParser = require("body-parser");

const SlackBotController = require('./controllers/slackBotController.js').SlackBotController;

//   App
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const slackBot = new SlackBotController();

//   Routes  //
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.post('/slack', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});
//  /Routes  //

app.listen(PORT, function(){
  console.log(`Running on port: ${PORT}`);
});
