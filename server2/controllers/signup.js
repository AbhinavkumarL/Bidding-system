
 'use strict';
 const bodyParser = require('body-parser');
 const request = require('request');
 const async = require('async');
 
 var headers = {
  "accept-charset" : "ISO-8859-1,utf-8;q=0.7,*;q=0.3",
  "accept-language" : "en-US,en;q=0.8",
  "accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "accept-encoding" : "gzip,deflate",
};

 exports.signup= function(req, reply){
 console.log('port 8443 executing sign up');
 	var body = req.body;
 	var ip = (req.headers['x-forwarded-for'] || '192.27.3.1').split(',')[0];
 		
		async.waterfall([
			verfiyUser,
    		addUser
    	], function (err, result) {
    		if (err){
    			console.log("line 17",err);
    		}else{
    			console.log(result);
    		}
    	});
		
		function verfiyUser(callback) {
		console.log("verifying if the user exists");
			var options={
 					uri:'https://localhost:9443/api/signup/verifyuser',
 					method :'POST',
 					headers:headers,
 					body:req.body,
 					json:true,
 					rejectUnauthorized: false,
    				requestCert: true,
    				agent: false
 				}
 			request(options, function(err, response, body){
 				if(err) { console.log(err); callback(true); return; }
//         				obj = JSON.parse(body);
console.log("line 45",body);
        				callback(false, body);
 			});
		}
		
		function addUser(arg1, callback) {
		console.log("Adding user",arg1);
    		if (arg1.length===0){
    			var options={
 					uri:'https://localhost:9443/api/signup/adduser',
 					method :'POST',
 					headers:headers,
 					body:req.body,
 					json:true,
 					rejectUnauthorized: false,
    				requestCert: true,
    				agent: false
 				 	}
 				request(options,function(err, response, body){
 					if(err) { console.log(err); callback(true); return; }
//         					obj = JSON.parse(body);
        					callback(false, body);
 				});
    		} else {
    		callback(null, "User Already exists with that email");
    		}
    	};
 }
