'use strict';

const express = require('express');
var Slack = require('@slack/client');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world2\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
