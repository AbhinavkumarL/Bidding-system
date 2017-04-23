/*
 *These are the standard routes for the Bidding system server
 */
 'use strict';
 const express = require('express');
 const request = require('request');
 const c_signup = require('./controllers/signup.js');
 const c_loginout = require('./controllers/LogInOut.js');
 const c_items = require('./controllers/Items.js');
 const c_bids= require('./controllers/Bids.js');
 const c_trans = require('./controllers/Transactions.js');
  const c_profile = require('./controllers/profileInfo.js')
 const jwt = require('jsonwebtoken');
 const zip = require('zlib');
 var router = express.Router();
 
 
var headers = {
  "accept-charset" : "ISO-8859-1,utf-8;q=0.7,*;q=0.3",
  "accept-language" : "en-US,en;q=0.8",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":"X-Requested-With",
  "accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "accept-encoding" : "gzip,deflate",
};

var auth = function(req, res, next) {
  if (req.session && req.session.userid)
    return next();
  else
    return res.status(401).send("User not logged in");
};

 router.use(function timeLog(req, res,next){
 	console.log("Time Log:"+Date.now());
 	console.log(req.session);
 	next();
 });
 
 router.get('/allitems',c_items.allitems);
 router.post('/signup', c_signup.signup); 
 router.post('/login', c_loginout.login);
 router.post('/logout',auth,c_loginout.logout);
 router.post('/user/postitems', auth, c_items.postitems);
 router.post('/user/postbids', auth, c_bids.postbids);
 router.post('/user/bids/updatetrans', auth,c_bids.autocomplete);
 router.get('/user/bidsonitem', auth,c_bids.bidsonitem);
 router.get('/user/profileInfo', auth,c_profile.profileInfo);
 router.post('/user/deleteitems',auth, c_items.deleteitems);
 router.post('/user/editprofile', auth,c_profile.updateprofile);
// router.get('/user/items',auth, c_items.listuseritems);
//  router.get('/user/searchitem',auth, c_items.searchitem);
//  router.post('/user/deletebid',auth, c_bids.deletebids);
 router.get('/user/userbidstatus', auth, c_bids.bidstatus);
 router.get('/user/purchaseorder', auth, c_trans.purchaseorder);


// 
//  router.use(function(req, res, next) {
//   console.log("line 36:",req.session.cookie);
//   
//   var cookie = req.session.cookie;
//   var token = req.session.cookie.token;
//   console.log("line 37:token passed:",token);
// 
//   // decode token
//   if (token) {
//     // verifies secret and checks exp
//     	jwt.verify(token, 'SecureKey', function(err, decoded) {     
// 	
//       		if (err) {
//       		console.log(err);
//         		return res.json({ success: false, message: 'Failed to authenticate token.' }); 
//         		router.post('/logout',c_loginout.logout);
//       		} else {
//         		// if everything is good, save to request for use in other routes
//         		req.decoded = decoded;    
//         		next();
//       		}
//     	});
// 
//   } else {
//     	// if there is no token
//     	// return an error
//     	return res.status(403).send({ 
//         	success: false, 
//         	message: 'No token provided.' 
//     });
// 
//   }
// });
// 

//router.post('/user/transactions',c_trans.completetransaction);

// request (options , function (error, response, body) {
// 			
//   			if (!error && response.statusCode == 200) {
//     			// If response is gzip, unzip first
//     			var encoding = response.headers['content-encoding']
//     			if (encoding && encoding.indexOf('gzip') >= 0) {
//       			zlib.gunzip(body, function(err, dezipped) {
//         			var json_string = dezipped.toString('utf-8');
//         			var json = JSON.parse(json_string);
//         			// Process the json..
//         			console.log(json);
//         			res.send(body);
//       			});
//     		} else {
//       			// Response is not gzipped
//       			res.send(body);
//     		}
//  });
  

 module.exports = router;