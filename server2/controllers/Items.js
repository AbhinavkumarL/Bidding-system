/*
 * Items.js : Registers items posted by users in the bidding system.
 */
 
 'use strict';
 const bodyParser = require('body-parser');
 const request = require('request');
 const async = require('async');
 const redis = require('redis');
 const client = redis.createClient(6379);
 const c_profile = require('./profileinfo.js');

 var headers = {
  "accept-charset" : "ISO-8859-1,utf-8;q=0.7,*;q=0.3",
  "accept-language" : "en-US,en;q=0.8",
  "accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "accept-encoding" : "gzip,deflate",
}
 
//***************************************************
function loaditems( userid, desc,initbid, shelftime, callback){
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
        		callback(false, {"body":body});
	});
}

//************************************************
function listitems(callback){
	client.get('allitems', function(err, res){
		if (err) {
			console.log("cache error:",err);
			callback(err, null);
		} else if (res && res.length > 0) {
			console.log("result from cache:",JSON.parse(res));
			callback(null,JSON.parse(res));
		} else {
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
 				console.log("output :", body);
 				client.set('allitems', JSON.stringify(body),function(err, added){
 					if(err){
//  						console.log("line 58",err);
        					callback(err, null); 	
 					}else{
//  						console.log("line 58",added , body);
        					callback(null, {"body":body}); 					
        				}
 				})
					
			});
		}
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
// 			console.log("line 81",body);
        		callback(false, {"body":body});
	});
}
//************************************************
function searchitemsuser(desc, callback){
	var options = {
		uri:'https://localhost:9443/api/user/searchitems',
 		method :'GET',
 		headers:headers,
 		qs:{desc},
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
// 			console.log("line 81",body);
        		callback(false, {"body":body});
	});
}
//************************************************
function listitemsuser(userid, callback){
	var options = {
		uri:'https://localhost:9443/api/user/deleteitems',
 		method :'POST',
 		headers:headers,
 		qs:{userid},
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
// 			console.log("line 81",body);
        		callback(false, {"body":body});
	});
}
//************************************************
//************************************************
exports.postitems = function(req, res){
var desc = req.body.desc ? req.body.desc :null;
var initbid = req.body.initbid ? req.body.initbid :null;
var shelftime = req.body.shelftime ? req.body.shelftime :null;
 
async.waterfall([
  	getuserid, 
  	loadingitems
  ], function(err, result){
  		if(err){
 			console.log("line 199",err);
 			res.send(err);
 		}else{
 			res.send(result);
        	}
  });
  
  function getuserid (callback){
  	client.get("userid",function(err, data){
 		if(err){
 			console.log("line 199",err);
 			callback(null);
 		}else{
 			console.log("line 202", parseInt(data));
 			callback(null,parseInt(data));				
        	}
 	});
  }
  function loadingitems(arg1, callback){
  var userid = arg1;
  	loaditems(userid, desc,initbid, shelftime, function(err, data){
			if (err){
// 				console.log(err, null);
				callback(err, null);
			}else {
// 				console.log(null, data);
				callback(null, data);
			}
		});
  	}
}
	

//************************************************
exports.allitems = function(req, res){
	
	listitems(function(err, data){
		if (err){
// 			console.log(err);
			res.status(404).send(err);
		}
		else {
// 			console.log(null, data);
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
//*************************************************
exports.searchitems = function(req, res){
	var desc = req.query.desc ? req.query.desc : null;
	
	searchitemsuser(desc, function(err, data){
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
exports.listitems = function(req, res){
	//var desc = req.query.userid ? req.query.userid : null;
// 	var userid = req.session.userid ? req.session.userid :null;

			
async.waterfall([
  	getuserid, 
  	listitemsuser
  ], function(err, result){
  		if(err){
 			console.log("line 199",err);
 			res.status(404).send("cache error occured");
 		}else{
 			res.status(200).send(result);			
        	}
  });
  
  function getuserid (callback){
  	client.get("userid",function(err, data){
 		if(err){
 			console.log("line 199",err);
 			callback(null);
 		}else{
 			callback(null,parseInt(data));				
        	}
 	});
  }
  
  function listitemsuser(arg1, callback){
// 		console.log("line 50:",userid);
		listuseritems(userid, function(err, data){
		if (err){
			console.log(err);
			callback(err, null);
		}
		else {
			console.log(null, data);
			callback(null, data);
		}
	})
	}
}


