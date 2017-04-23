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
 const session = require('express-session')
 const cors = require('cors');
 // const memcached = require('memcached');
//  var memcached = new Memcached('localhost:8443');
 
 var app = express()

 app.use(session({
  secret: 'SecureKey',
  resave: true,
  saveUninitialized: true
  // cookie: { expires: '1h',
// 				originalMaxAge : 3600000,
// 				httpOnly: true,
// 				secure :true }
}));
// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'example.com');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
// 
//     next();
// }
//  app.use(allowCrossDomain);
 app.use(bodyParser.json());
 app.use(cors());
 
var options = {
   key  : fs.readFileSync('./server2/server.key'),
   cert : fs.readFileSync('./server2/server.crt')
};
 
 app.use('/api',routes);
 https.createServer(options,app).listen(8443, function(){
 	console.log("server listening to port 8443....");
 });