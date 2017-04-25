/*
 *These are the standard routes for the Bidding system server
 */
 'use strict';
 const express = require('express');
 const request = require('request');
 const zip = require('zlib');
 var router = express.Router();
 var path = require("path");
 const redis = require('redis');
 const client = redis.createClient(6379); 
 
router.use(express.static(path.join(__dirname+'/views/')));

router.use(function timeLog(req, res,next){
 	console.log("Time Log:"+Date.now());
 	next();
 });
 
 var auth = function(req, res, next){
 client.get('session', function(err, data){
		if (data === null){
			console.log("44:session expired. Please login again");
			res.sendFile(path.join(__dirname+'/views/login.html'));
		}else{
			return next();
		}
	});
 }
 router.use(auth);

 router.get('/login', function(req, res) {
      res.sendFile(path.join(__dirname+'/views/login.html'));
  });

 router.get('/profile', auth, function(req, res) {
	res.sendFile(path.join(__dirname+'/views/profile.html'));
  });

 router.get('/test',auth,  function(req, res) {

      res.sendFile(path.join(__dirname+'/views/test.html'));
  });



 module.exports = router;