'use strict';

let express = require('express');
let request = require('request');
let path = require('path');
let parser = require('body-parser');
let db = require('./database/index.js');
let session = require('express-session');
let favicon = require('serve-favicon');
let app = express();

// Leaving these commented here because we may want to use them for more
// efficient data persistence (related to the "favorites" component)
// app.use(express.bodyParser());
//app.use(express.cookieParser('shhhh, very secret'));
app.use(session({
  secret: 'BIG secret',
  resave: false,
  saveUninitialized: true
}));

app.use(parser.json());
app.use(express.static(path.join(__dirname + '/../client/public')));
app.use(favicon(__dirname + '/../client/public/favicon.ico'));

require('./routes.js')(app, express);

let port = 3000;
app.listen(port, () => {
  console.log('Connected on port 3000');
});

module.exports = app;
