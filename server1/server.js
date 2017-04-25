/*
 * WPL Final project Server code
 */
 
 'use strict';
 const fs = require('fs');
 const https = require('https');
 const express = require('express');
 const bodyParser = require('body-parser');
 const routes = require('./routes.js');
 const session = require('express-session')

 var app = express();
 app.use(bodyParser.json());
 
 app.use(session({
  secret: 'SecureKey',
  resave: true,
  saveUninitialized: true
  }));
 
var options = {
   key  : fs.readFileSync('./server1/server.key'),
   cert : fs.readFileSync('./server1/server.crt')
};

 app.use('/api',routes);

 
 https.createServer(options,app).listen(8000, function(){
 	console.log("server listening to port 8000....");
 });