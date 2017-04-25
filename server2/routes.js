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
 const c_profile = require('./controllers/profileInfo.js');
 const jwt = require('jsonwebtoken');
 const zip = require('zlib');
 const redis = require('redis');
 const client = redis.createClient(6379); 
 
 var router = express.Router();
 
var headers = {
  "accept-charset" : "ISO-8859-1,utf-8;q=0.7,*;q=0.3",
  "accept-language" : "en-US,en;q=0.8",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":"X-Requested-With",
  "accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "accept-encoding" : "gzip,deflate",
};

router.post('/login', c_loginout.login);

var auth = function(req, res, next){

	client.get('session', function(err, data){
		if (data === null){
			console.log("44:session expired. Please login again");
			res.status(401).send("session expired. Please login again");
		}else{
			return next();
		}
	})
  }
// function pickup(req, response) {
// 	if (request.method == 'OPTIONS') {
// 		response.setHeader('Access-Control-Allow-Origin', '*');
// 		response.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
// 		response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
// 		response.end();
// 	}
// 	else {
// 		response.setHeader('Access-Control-Allow-Origin', '*');
// 		response.setHeader('Authorization',req.session.userid);
// 	}
// }
// router.use(pickup);

 router.use(function timeLog(req, res,next){
 	console.log("Time Log:"+Date.now());
 	next();
 });
 
 router.get('/allitems',c_items.allitems);
 router.post('/signup', c_signup.signup); 

 router.post('/logout',auth,c_loginout.logout);
 router.get('/user/profileInfo', auth,c_profile.profileInfo);
 router.post('/user/editprofile', auth,c_profile.updateprofile);
 
 router.get('/user/userbidstatus', auth, c_bids.bidstatus);
 router.post('/user/postbids', auth, c_bids.postbids);
 router.delete('/user/deletebid',auth, c_bids.deletebids);

 
 //router.get('/user/items',auth, c_items.listuseritems);
 router.get('/user/bidsonitem', auth,c_bids.bidsonitem);
 router.post('/user/postitems', auth, c_items.postitems);
 router.delete('/user/deleteitems',auth, c_items.deleteitems);
 
 router.get('/user/purchaseorder', auth, c_trans.purchaseorder);
 router.get('/user/searchitems', auth, c_items.searchitems);
 
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