/*
 * WPL Final project Server code
 */
 
 'use strict';
 const fs = require('fs');
 const https = require('https');
 const express = require('express');
 const bodyParser = require('body-parser');
 const routes = require('./routes.js');
 const compression = require('compression');
 
 var app = express();
 app.use(bodyParser.json());
 var options = {
   key  : fs.readFileSync('./server3/server.key'),
   cert : fs.readFileSync('./server3/server.crt')
};
 
 app.use('/api',routes);
 
 
https.createServer(options,app).listen(9443, function(){
 	console.log("server listening to port 9443....");
 });