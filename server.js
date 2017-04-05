/*
 * WPL Final project Server code
 */
 
 'use strict';
 
 const express = require('express');
 const bodyParser = require('body-parser');
//  const cookieParser = require('cookie-parser');
//  const session = require('express-session');
 const routes = require('./routes.js');
 
 var app = express();
//  app.use(cookieParser());
//  app.use(session({secret:"SUPERKEY"}));
 app.use(bodyParser.json());

 app.use('/api',routes);

app.listen(8000, function(){
 	console.log("server listening to port 8000....");
 });