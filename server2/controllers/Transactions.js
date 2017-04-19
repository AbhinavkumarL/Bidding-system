/*
 * Transactions.js : Completes a transaction once the shelf time is completed.
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
function purchaseditems(userid, callback){
	var options = {
		uri:'https://localhost:9443/api/user/purchaseorder',
 		method :'GET',
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
			console.log("line 77",body);
        		callback(false, body);
	});
}
//************************************************************
//************************************************************
exports.purchaseorder = function(req, res){
	var userid = req.query.userid ? (req.query.userid) : null;
 	
	purchaseditems( userid, function(err, data){
		if (err){
			console.log(err, null);
		}else {
			console.log(null, data);
		}
	});
}
