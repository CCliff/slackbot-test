'use strict';

const express = require('express');
var Slack = require('@slack/client');

// Constants
const PORT = process.env.PORT || 8080;

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.listen(PORT, function(){
  // console.log(`Running on http://${HOST}:${PORT}`);
});
