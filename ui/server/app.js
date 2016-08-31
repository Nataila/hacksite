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

var dayCountSchema = new mongoose.Schema({
  time: String,
  count: String
}, {
  collection: 'day_count'
});

var hackModel = mongoose.model('hackSite', hackSchema);
var dayCountModel = mongoose.model('dayCount', dayCountSchema);

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By',' 3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.get('/', function (req, res) {
  var page = req.query.page;
  var start = (page - 1) * 50;
  var hackList = hackModel.find().skip(start).limit(50).sort('-time');
  hackList.exec(function (err, result) {
      res.send({'result': result, 'page': page});
  });
});

app.get('/pagination', function (req, res) {
  var hackList = hackModel.find();
  hackList.count().exec(function (cerr, count) {
    var pageCount = count % 100;
    pageCount = pageCount ? pageCount += 1 : pageCount;
    res.send({pageCount: pageCount});
  });
});

app.get('/kline', function (req, res) {
  var dayCountList = dayCountModel.find();
  dayCountList.exec(function (err, result) {
    res.send({'result': result});
  });
});

app.listen(3000, function () {
  console.log('listening 3000');
});
