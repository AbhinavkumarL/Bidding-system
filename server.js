/*
 * WPL Final project Server code
 */
 
 'use strict';
 
 const express = require('express');
 const bodyParser = require('body-parser');

 const routes = require('./routes.js');
 
 var app = express();

 app.use(bodyParser.json());

 app.use('/api',routes);

app.listen(8000, function(){
 	console.log("server listening to port 8000....");
 });