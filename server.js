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

var port = 3000;
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

app.get('/chapters', function(req,res,next) {
  Chapter.find({})
    .exec()
    .then( function(chapters) { res.json(chapters); })
    .catch(function(err) {
      console.log('Error getting data');
    });
});
