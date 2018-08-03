module.exports = function(admin, express) {
  'use strict';

  const router = express.Router(),
    firebaseMiddleware = require('express-firebase-middleware');

  const db = admin.database();
  const chaptersRef = db.collection('chapters');

  function errorHandler(err, req, res, next) {
    console.error(err.message);
    res.status(500).end(err.message);
  }

  router.use('/', firebaseMiddleware.auth);
  router.use(errorHandler);
  router.use((req, res, next) => {
    next();
  });

  app.get('/api/chapters', function(req,res) {
    chaptersRef.get()
      .then(snapshot => { res.json(snapshot); })
      .catch((error) => { next(error); });
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

  app.get('/api/elected', function(req,res) {
    fs.readFile(__dirname + '/dist/assets/data/const/elected.json', 'utf8', function(err,data) {
      if (err) throw err;
      res.json(JSON.parse(data));
    });
  });

  app.post('/api/chapters/:id/update', function(req,res) {
    chaptersRef.doc(req.params.id).update(req.body);
  });

  app.delete('/api/chapters/:id', function(req,res) {
    chaptersRef.doc(req.params.id).delete();
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
};