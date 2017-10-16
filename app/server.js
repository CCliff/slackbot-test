'use strict';

const express = require('express');
const SlackBot = require('./SlackBot.js');
// Constants
const PORT = process.env.PORT || 8080;

// App
const app = express();
const slackBot = new SlackBot();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.get('/slack', (req, res) => {
  console.log('Message from Slack: ',req);
});

app.listen(PORT, function(){
  // console.log(`Running on http://${HOST}:${PORT}`);
});
