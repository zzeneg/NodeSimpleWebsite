/// <reference path="typings/node/node.d.ts" />

var express = require('express');
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
  res.end('Hi there!')
});