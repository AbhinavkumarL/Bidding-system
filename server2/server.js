/*
 * WPL Final project Server code
 */
 
 'use strict';
 const fs = require('fs');
 const https = require('https');
 const express = require('express');
 const bodyParser = require('body-parser');
 const routes = require('./routes.js');
 const cookieParser = require('cookie-parser');
 const cors = require('cors');
 const compression = require('compression');

 var app = express()

 app.use(bodyParser.json());
 app.use(cors());
 
var options = {
   key  : fs.readFileSync('./server2/server.key'),
   cert : fs.readFileSync('./server2/server.crt')
};

 app.use(compression());
 app.use('/api',routes);
 
 https.createServer(options,app).listen(8443, function(){
 	console.log("server listening to port 8443....");
 });