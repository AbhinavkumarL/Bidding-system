/*
 *These are the standard routes for the Bidding system server
 */
 'use strict';
 const express = require('express');
 const request = require('request');
 const zip = require('zlib');
 const path = require("path");
 const redis = require('redis');
 const client = redis.createClient(6379); 
 
 var router = express.Router();
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

 router.get('/login', function(req, res) {
      
      res.sendFile(path.join(__dirname+'/views/login.html'));
  });

 router.get('/profile',auth, function(req, res) {

    res.sendFile(path.join(__dirname+'/views/profile.html'));
  });

 router.get('/dashboard',auth,  function(req, res) {

      res.sendFile(path.join(__dirname+'/views/dashboard.html'));
  });

 router.get('/postitems',auth,  function(req, res) {

      res.sendFile(path.join(__dirname+'/views/postitems.html'));
  });

 router.get('/mybids',auth,  function(req, res) {

      res.sendFile(path.join(__dirname+'/views/mybids.html'));
  });

  router.get('/myitems',auth,  function(req, res) {

      res.sendFile(path.join(__dirname+'/views/myitems.html'));
  });

  router.get('/mypo',auth,  function(req, res) {

      res.sendFile(path.join(__dirname+'/views/mypo.html'));
  });

  router.get('/myitembids',auth,  function(req, res) {

      res.sendFile(path.join(__dirname+'/views/myitembids.html'));
  });

  router.get('/search',auth,  function(req, res) {

      res.sendFile(path.join(__dirname+'/views/search.html'));
  });

    router.get('/error',  function(req, res) {

      res.sendFile(path.join(__dirname+'/views/errorpage.html'));
  });

    router.get('*', function(req, res) {

      res.redirect('/api/error');
  });

 module.exports = router;