'use strict';
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/'));

var server = app.listen(8000, function () {
  console.log('Server running at http://localhost:80000...');
});