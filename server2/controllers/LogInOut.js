/*
 *This a LogIn and LogOut routes in Controller
 */
 
 'use strict';
 const bodyParser = require('body-parser');
 const request = require('request');
 const async = require('async');
 
 var headers = {
  "accept-charset" : "ISO-8859-1,utf-8;q=0.7,*;q=0.3",
  "accept-language" : "en-US,en;q=0.8",
  "accept" : "text/html,application/xhtml+xml,application/xml;",
  "accept-encoding" : "gzip,deflate",
}

//***********************************************************
//***********************************************************
function verifylogin(email, password, callback) {
	
	async.waterfall([
		checkcredentials,
		createsession
	], function(err, result){
		if (err){
		callback(err,null);
			console.log("line 28",err);
		}else {
		callback(null,result);
// 			console.log("line30",result);
		}
	});
	
	function checkcredentials(callback){
		var options = {
			uri:'https://localhost:9443/api/login/checkcredentials',
 			method :'POST',
 			headers:headers,
 			body:{email, password},
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
				console.log("line 51: User verified: userid =",body[0].user_id);
        			callback(false, body[0].user_id);
 			});
	}
			
	function createsession(args1, callback){
		console.log("line 58:",args1);
		var userid = args1;
	  	if (args1.length===0){
	  		callback(null, "user verified but session not created");
	  	}else{
			var options = {
				uri:'https://localhost:9443/api/login/createsession',
 				method :'POST',
 				headers:headers,
 				body:{userid},
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
					
					console.log("line 78: response:",response.body);
        				callback(false, body);
 			})
 		}
	}	
}
//***************************************************
function updatelogininfo(loginlocation,userid, callback){
	console.log("line 87:", loginlocation,userid);
	var options = {
			uri:'https://localhost:9443/api/user/updatelogininfo',
 			method :'POST',
 			headers:headers,
 			body:{loginlocation,userid},
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
				console.log("line 102: response:",response.body);
        			callback(false, body);
 		})
}

//***************************************************
function killsession(userid, callback){
	var options = {
		uri:'https://localhost:9443/api/logout/killsession',
 		method :'POST',
 		headers:headers,
 		body:{userid},
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

//********************************************************
//********************************************************
exports.login = function(req, res) {
var email = req.body.email ? req.body.email : null;
var password = req.body.password ? req.body.password : null;
var loginlocation = req.body.loginlocation ? req.body.loginlocation : null;
var userid ;

		if (!email || !password) {
			res.send('login failed. Invalid Credentials'); 
		}
		
	verifylogin( email, password, function(err, data){
		if (err){
			console.log(err);
			res.status(404).send(err);
		}else {
			console.log("line 147:",data);
    		req.session.userid = data.userid;
    		userid = data.userid;
    		updatelogininfo(loginlocation, userid, function(err, data){
    		console.log("line 152: updating login location ", loginlocation," for user id:",userid);
				if (err){
					console.log(err, null);
					console.log("login Information not updated");
				}
				else{
					console.log(null, data);
					console.log("login informtaiont updated");
				}
			});
        		console.log("Line 100:session userid:",req.session);
			res.status(200).send("login success! userid :"+data.userid);
		}
	});
}
//********************************************************
exports.logout = function(req, res){
	console.log("line 131:session values:",req.session.userid);
	var userid = req.session.userid ? req.session.userid : null;
// 	var userid = req.body.userid ? req.body.userid : null;
	
	killsession( userid , function(err, data){
		if (err){
			console.log(err);
			res.status(404).send(err);
		}else {
			console.log(data);
			res.status(200).send(data);
		}
		
	})
}
