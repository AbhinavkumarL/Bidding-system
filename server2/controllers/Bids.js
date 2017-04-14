/*
 * Bid.js : Registers bids posted by users in Bids table.
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
function loadbids(userid, itemid, bidamount, callback){
	var options = {
		uri:'https://localhost:9443/api/user/bids',
 		method :'POST',
 		headers:headers,
 		body:{userid, itemid, bidamount},
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
			console.log("line 35",body);
        		callback(false, body);
	});
}

function completetransactions( bidid, itemid, bidamount, callback){
	var options = {
		uri:'https://localhost:9443/api/user/transactions',
 		method :'POST',
 		headers:headers,
 		body:{bidid, itemid, bidamount},
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

//**********************************************************

exports.postbids = function(req, res){
	var userid = req.body.userid ? (req.body.userid) : null;
 	var itemid = req.body.itemid ? (req.body.itemid) : null;
 	var bidamount = req.body.bidamount ? (req.body.bidamount) : null;
	
	loadbids( userid, itemid, bidamount, function(err, data){
		if (err){
			console.log(err, null);
			res.status(404).send(err);
		}else {
			console.log(null, data);
			res.status(200).send(err);
		}
		
	});
}

exports.autocomplete = function(req, res){
	var bidid = req.body.bidid ? req.body.bidid :null;
	var itemid = req.body.itemid ? req.body.itemid : null;
	var bidamount = req.body.bidamount ? req.body.bidamount :null;
	
	console.log(bidid, itemid, bidamount);
	completetransactions( bidid, itemid, bidamount, function(err, data){
		if (err){
			console.log(err, null);
			res.status(404).send(err);
		}else {
			console.log(null, data);
			res.status(200).send(err);
		}
	});
}