var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hack_db');

var hackSchema = new mongoose.Schema({
  source: String,
  time: String,
  site: String,
  author: String
}, {
  collection: 'hack_site'
});

var hackModel = mongoose.model('hackSite', hackSchema);

app.get('/', function (req, res) {
  console.log(111111111111);
  var hackList = hackModel.find().limit(50);
  hackList.exec(function (err, result) {
    res.send(result);
  });
});

app.listen(3000, function () {
  console.log('listening 3000');
});
