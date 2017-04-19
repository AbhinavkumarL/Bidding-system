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
//*******************************************************
function loadProfile(userid, callback){
	console.log("line 50:",userid);
	var options = {
		uri:'https://localhost:9443/api/user/profileInfo',
		qs:{userid},
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
			console.log("line 50",body);
        		callback(false, body);
	});
}
//******************************************************
function editprofile(body, callback){
	var options = {
		uri:'https://localhost:9443/api/user/updateprofile',
		method :'POST',
		body:body,
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
			console.log("line 50",body);
        		callback(false, body);
	});
}
//******************************************************
//******************************************************
exports.profileInfo = function(req, res){
	var userid = req.query.userid ? req.query.userid :null;

	console.log("line 50:",userid);
	
	loadProfile(userid, function(err, data){
		if (err){
			console.log(err, null);
			res.send(err);
		}else {
			console.log(null, data);
			res.send(data);
		}
		
	});
}
//*********************************************************
exports.updateprofile = function(req, res){
	var body = req.body;
	
	 editprofile(body, function(err, data){
	 	if (err){
			console.log(err, null);
			res.send(err);
		}else {
			console.log(null, data);
			res.send(data);
		}
	 }) 
}
