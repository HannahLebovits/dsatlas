'use strict';

const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://dsatlas-c72aa.firebaseio.com/'
});

module.exports = admin;
