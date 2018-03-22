#!/usr/env/bin node

// set up ========================
const express        = require('express');
const mongoose       = require('mongoose');
const morgan         = require('morgan');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const fs             = require('fs');
const path           = require('path');
const mailer         = require('express-mailer');
const config         = require('config');

const app = module.exports = express();

// mailer ========================
mailer.extend(app, config.get('mail.prod'));
app.set('views', __dirname + '/dist/config/pug');
app.set('view engine', 'pug');

// configuration =================
var creds = config.get('mongo.prod');

var mongoUrl = function(user, pass) {
  return 'mongodb://' + user +
    ':' + pass +
    '@' + creds.host +
    ':' + creds.port +
    '/' + creds.db;
};

console.log(creds);
mongoose.connect(mongoUrl(creds.user, creds.pass))
  .then()
  .catch(function(err) { console.log(err); });

app.use(express.static(path.join(__dirname,"dist")));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(methodOverride());

// application ==================

const port = process.env.PORT || '3000';
app.listen(port, function() {
  console.log('site started on port',port);
});

// schemas ==================
var Schema = mongoose.Schema;

var chapterSchema = new Schema({
  name: String,
  city: String,
  state: String,
  members: Number,
  lat: Number,
  lon: Number,
  website: String,
  facebook: String,
  twitter: String
}, { versionKey: false });

var Chapter = mongoose.model('chapters', chapterSchema);

// methods ==================

app.get('/api/chapters', function(req,res) {
  Chapter.find({})
    .exec()
    .then(function(chapters) { res.json(chapters); })
    .catch(function(err) { throw err; });
});

app.get('/api/totals/states', function(req,res) {
  fs.readFile(__dirname + '/dist/assets/data/totals/state-totals.json', 'utf8', function(err, data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.get('/api/totals/districts', function(req,res) {
  fs.readFile(__dirname + '/dist/assets/data/totals/district-totals.json', 'utf8', function(err,data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.get('/api/totals/counties', function(req,res) {
  fs.readFile(__dirname + '/dist/assets/data/totals/county-totals.json', 'utf8', function(err,data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.get('/api/geojson/states', function(req,res) {
  fs.readFile(__dirname + '/dist/assets/data/geojson/us-states.json', 'utf8', function(err,data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.get('/api/geojson/counties', function(req,res) {
  fs.readFile(__dirname + '/dist/assets/data/geojson/us-counties.json', 'utf8', function(err,data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});


app.get('/api/geojson/districts', function(req,res) {
  fs.readFile(__dirname + '/dist/assets/data/geojson/congressional-districts.json', 'utf8', function(err,data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.get('/api/statenumbers', function(req,res) {
  fs.readFile(__dirname + '/dist/assets/data/const/state-numbers.json', 'utf8', function(err,data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.post('/api/chapters/update', function(req,res) {
//  mongoose.connect(mongoUrl('dsatlas', 'DPkcKMuXn6bNA4k948fmxh4FR2VzDv'))
//    .then( function() {
      var update = new Chapter(req.body);

      Chapter.findByIdAndUpdate(update._id, update, {'new': true, 'upsert': true})
        .exec(function (err, result) {
          if (err) throw err;
          res.send(result);
        });

//    })
//    .catch(function(err) { console.log(err); });
});

app.delete('/api/chapters/:id', function(req,res) {
  Chapter.deleteOne({ _id: req.params['id'] }, function(err) {
    if (err) throw err;
    res.send({ status: 'OK' });
  });
});

app.post('/api/email', function(req,res) {
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
      res.send({ status: 'OK' });
    });
  });
});
