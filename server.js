#!/usr/env/bin node

// set up ========================
var express        = require('express');
var mongoose       = require('mongoose');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var fs             = require('fs');
var path           = require('path');
var mailer         = require('express-mailer');
var config         = require('config');

var app = module.exports = express();

// mailer ========================
mailer.extend(app, config.get('mail.prod'));
app.set('views', __dirname + '/config/pug');
app.set('view engine', 'pug');

// configuration =================
var creds = config.get('mongo.prod');
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

app.post('/email', function(req,res) {
  app.mailer.send('email', {
    to: 'info@dsatlas.org',
    subject: 'Feedback For DSAtlas',
    name: req.body.name,
    email: req.body.email,
    content: req.body.content
  }, function(err) {
    if (err) throw err;
    app.mailer.send('confirmation', {
      to: req.body.email,
      subject: 'Thank you for your feedback!',
      name: req.body.name
    }, function (err) {
      if (err) throw err;
      res.send('Email sent.');
    });
  });
});
