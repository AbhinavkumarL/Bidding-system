/*
 *These are the standard routes for the Bidding system server
 */
 'use strict';
 const express = require('express');
 const request = require('request');
 const zip = require('zlib');
 var router = express.Router();
 
var headers = {
  "accept-charset" : "ISO-8859-1,utf-8;q=0.7,*;q=0.3",
  "accept-language" : "en-US,en;q=0.8",
  "accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "accept-encoding" : "gzip,deflate",
};

 router.use(function timeLog(req, res,next){
 	console.log("Time Log:"+Date.now());
 	next();
 });
 
// router.post('/signup', c_signup.signup); 
 router.post('/signup', function(req, res){
 console.log('port 8000 requesting singup....');
 	var options={
 		uri:'https://localhost:8443/api/signup',
 		method :'POST',
 		headers:headers,
 		body:req.body,
 		json:true,
 		rejectUnauthorized: false,
    	requestCert: true,
    	agent: false
 		}
 	request(options, function(data){
 		console.log(data);
 		res.send(data);
 	});
 	console.log('port 8000 completed singup');
 });
 
 router.post('/login', function(req, res){
 //console.log(req.body);
 var options= {
 	uri :'https://localhost:8443/api/login',
 	method :'POST',
 	headers:headers,
 	body : req.body,
 	json: true,
 	rejectUnauthorized: false,
    requestCert: true,
    agent: false
 	}
 	request(options, function(data){
 	console.log(data);
 		res.send(data);
 	});
});
	// request (options , function (error, response, body) {
// 		
//   		if (!error && response.statusCode == 200) {
//     			// If response is gzip, unzip first
//     		var encoding = response.headers['content-encoding']
//     			if (encoding && encoding.indexOf('gzip') >= 0) {
//       				zlib.gunzip(body, function(err, dezipped) {
//         					var json_string = dezipped.toString('utf-8');
//         					var json = JSON.parse(json_string);
//         					// Process the json..
//         					console.log(json);
//         					res.send(body);
//       				});
//       			}
//     	} else {
//       		// Response is not gzipped
//       		res.send(body);
//     	}
// });
 
//  router.post('/logout', c_loginout.logout);
 router.post('/logout', function(req, res){
 	var options={
 		uri:'https://localhost:8443/api/logout',
 		method :'POST',
 		headers:headers,
 		body:req.body,
 		json:true,
 		rejectUnauthorized: false,
    	requestCert: true,
    	agent: false
 		}
 	request(options, function(data){
 		console.log(data);
 		res.send(data);
 	});
});
	// request (options , function (error, response, body) {
// 		
//   		if (!error && response.statusCode == 200) {
//     		// If response is gzip, unzip first
//     		var encoding = response.headers['content-encoding']
//     			if (encoding && encoding.indexOf('gzip') >= 0) {
//       				zlib.gunzip(body, function(err, dezipped) {
//         				var json_string = dezipped.toString('utf-8');
//         				var json = JSON.parse(json_string);
//         				// Process the json..
//         				console.log(json);
//         				res.send(body);
//       				});
//       			}
//     	} else {
//       		// Response is not gzipped
//       		res.send(body);
//     	}
// });
  
 router.use(function(req, res, next) {

  var token = req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    	jwt.verify(token, 'SecureKey', function(err, decoded) {     
	
      		if (err) {
        		return res.json({ success: false, message: 'Failed to authenticate token.' });    
      		} else {
        		// if everything is good, save to request for use in other routes
        		req.decoded = decoded;    
        		next();
      		}
    	});

  } else {
    	// if there is no token
    	// return an error
    	return res.status(403).send({ 
        	success: false, 
        	message: 'No token provided.' 
    	});
  }
});

router.post('/user/items', function(req, res){
 	var options={
 		uri:'https://localhost:8443/api/user/items',
 		method :'POST',
 		headers:headers,
 		body:req.body,
 		json:true,
 		rejectUnauthorized: false,
    	requestCert: true,
    	agent: false
 		}
 	request(options, function(data){
 		console.log(data);
 		res.send(data);
 	});
 });
 
 
router.post('/user/bids', function(req, res){
 	var options={
 		uri:'https://localhost:8443/api/user/bids',
 		method :'POST',
 		headers:headers,
 		body:req.body,
 		json:true,
 		rejectUnauthorized: false,
    	requestCert: true,
    	agent: false
 		}
 	request(options, function(data){
 		console.log(data);
 		res.send(data);
 	});
 });


 module.exports = router;