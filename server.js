#!/usr/env/bin node

// Read-only user ===============
var mongo = {
  credentials: {
    user: 'dsatlas-prod-readonly',
    pass: 'dsatlas-prod-readonly',
    host: '74.208.175.170',
    port: '27017',
    db: 'dsatlas'
  }
};

// set up ========================
var express        = require('express');
var mongoose       = require('mongoose');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var fs             = require('fs');
var path           = require('path');

var app = module.exports = express();

// configuration =================
var creds = mongo.credentials;
var mongoUrl = 'mongodb://' + creds.user +
               ':' + creds.pass +
               '@' + creds.host +
               ':' + creds.port +
               '/' + creds.db;

mongoose.connect(mongoUrl,  function(err) {
    if (err) { console.log(err); }
});

app.use(express.static(__dirname));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(methodOverride());

// application ==================

var port = 80;
app.listen(port, function() {
  console.log('site started on port',port);
});

// schemas ==================
var Schema = mongoose.Schema;

var chapterSchema = new Schema({
  _id: String,
  name: String,
  city: String,
  state: String,
  members: Number,
  lat: Number,
  lon: Number,
  website: String,
  facebook: String,
  twitter: String
});

var Chapter = mongoose.model('chapters', chapterSchema);

// methods ==================

app.get('/chapters', function(req,res) {
  Chapter.find({})
    .exec()
    .then(function(chapters) { res.json(chapters); })
    .catch(function(err) { throw err; });
});

app.get('/totals/states', function(req,res) {
  fs.readFile(__dirname + '/assets/data/totals/state-totals.json', 'utf8', function(err, data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.get('/totals/districts', function(req,res) {
  fs.readFile(__dirname + '/assets/data/totals/district-totals.json', 'utf8', function(err,data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.get('/totals/counties', function(req,res) {
  fs.readFile(__dirname + '/assets/data/totals/county-totals.json', 'utf8', function(err,data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.get('/geojson/states', function(req,res) {
  fs.readFile(__dirname + '/assets/data/geojson/us-states.json', 'utf8', function(err,data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.get('/geojson/counties', function(req,res) {
  fs.readFile(__dirname + '/assets/data/geojson/us-counties.json', 'utf8', function(err,data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});


app.get('/geojson/districts', function(req,res) {
  fs.readFile(__dirname + '/assets/data/geojson/congressional-districts.json', 'utf8', function(err,data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.get('/const/statenumbers', function(req,res) {
  fs.readFile(__dirname + '/assets/data/const/state-numbers.json', 'utf8', function(err,data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});


