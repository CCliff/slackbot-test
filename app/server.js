'use strict';
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const express    = require('express');
const bodyParser = require("body-parser");

const SlackBotController = require('./controllers/slackBotController.js').SlackBotController;

//   Constants  //
const PORT = process.env.PORT || 8080;

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
app.get('/users', (req, res) => {
  slackBot.getUsers().then((users) => {
    res.send(users);
  });
});


app.listen(PORT, function(){
  console.log(`Running on port: ${PORT}`);
});
