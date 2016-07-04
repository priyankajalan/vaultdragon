'use strict'
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser());
app.use(express.static(__dirname + '/'));

app.get('/allKeyValue', require('./api/allKeyValue.js'));
app.post('/readValue', require('./api/readValue.js'));
app.post('/updateKeyValue', require('./api/updateKeyValue.js'));

var server = app.listen(8000, function () {
  console.log('Server running at http://localhost:8000...');
});