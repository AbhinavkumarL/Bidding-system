/*
 * Items.js : Registers items posted by users in the bidding system.
 */
 
 'use strict';
 const bodyParser = require('body-parser');
 const request = require('request');
 const async = require('async');
 
 var headers = {
  "accept-charset" : "ISO-8859-1,utf-8;q=0.7,*;q=0.3",
  "accept-language" : "en-US,en;q=0.8",
  "accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "accept-encoding" : "gzip,deflate",
}
 
//***************************************************
function loaditems(desc, userid, initbid, shelftime, callback){
	console.log("line 19:",desc, userid, initbid, shelftime);
	var options = {
		uri:'https://localhost:9443/api/user/items',
 		method :'POST',
 		headers:headers,
 		body:{desc, userid, initbid, shelftime},
 		json:true,
 		rejectUnauthorized: false,
    	requestCert: true,
    	agent: false
 		}
	request(options, function(err, response, body){
 		if(err) { 
 			console.log(err); 
 			callback(true); 
 			return; 
 		}
			console.log("line 37",body);
        		callback(false, body);
	});
}

//************************************************
function listitems(callback){
	var options = {
		uri:'https://localhost:9443/api/allitems',
 		method :'GET',
 		headers:headers,
 		json:true,
 		rejectUnauthorized: false,
    	requestCert: true,
    	agent: false
 		}
	request(options, function(err, response, body){
 		if(err) { 
 			console.log(err); 
 			callback(true); 
 			return; 
 		}
			console.log("line 58",body);
        		callback(false, body);
	});
}
//************************************************
function deleteitemsuser(itemid, callback){
	var options = {
		uri:'https://localhost:9443/api/user/deleteitems',
 		method :'POST',
 		headers:headers,
 		body:{itemid},
 		json:true,
 		rejectUnauthorized: false,
    	requestCert: true,
    	agent: false
 		}
	request(options, function(err, response, body){
 		if(err) { 
 			console.log(err); 
 			callback(true); 
 			return; 
 		}
			console.log("line 81",body);
        		callback(false, body);
	});
}
//************************************************
//************************************************
exports.postitems = function(req, res){
	var desc = req.body.desc ? req.body.desc :null;
	var userid = req.body.userid ? req.body.userid :null;
	var initbid = req.body.initbid ? req.body.initbid :null;
	var shelftime = req.body.shelftime ? req.body.shelftime :null;
	console.log("line 46:",desc, userid, initbid, shelftime);
	
	loaditems( desc, userid, initbid, shelftime, function(err, data){
		if (err){
			console.log(err, null);
			res.send(err);
		}else {
			console.log(null, data);
			res.send(data);
		}
		
	});
}
//************************************************
exports.allitems = function(req, res){
	
	listitems (function(err, data){
		if (err){
			console.log(err);
			res.status(404).send(err);
		}
		else {
			console.log(null, data);
			res.status(200).send(data);
		}
	})
}
//*************************************************
exports.deleteitems = function(req, res){
	var itemid = req.body.itemid ? req.body.itemid : null;
	
	deleteitemsuser(itemid, function(err, data){
		if (err){
			console.log(err);
			res.status(404).send(err);
		}
		else {
			console.log(null, data);
			res.status(200).send(data);
		}
	})
}