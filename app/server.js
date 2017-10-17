'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const express = require('express');
const SlackBotController = require('./controllers/slackBotController.js').SlackBotController;
// Constants
const PORT = process.env.PORT || 8080;

// App
const app = express();
const slackBot = new SlackBotController();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.get('/slack', (req, res) => {
  console.log(req);
});

app.listen(PORT, function(){
  console.log(`Running on port: ${PORT}`);
});
