/*
 *This a LogIn and LogOut routes in Controller
 */
 
 'use strict';
 const bodyParser = require('body-parser');
 const request = require('request');
 const async = require('async');
//  const  cache = require('express-redis-cache')({
//   host: '127.0.0.1', port: 6379});
  const redis = require('redis');
  const client = redis.createClient(6379); 
 
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
// 			console.log("line 28",err);
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
				//console.log("line 51: User verified: userid =",body[0].user_id);
        			callback(false, body[0].user_id);
 			});
	}
			
	function createsession(args1, callback){
		//console.log("line 58:",args1);
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
					//console.log("line 78: response:",response.body);
        				callback(false, body);
 			})
 		}
	}	
}
//***************************************************
function updatelogininfo(loginlocation,userid, callback){
// 	console.log("line 87:", loginlocation,userid);
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
// 				console.log("line 102: response:",response.body);
        			callback(false, body);
 		})
}

//***************************************************
function killsession(userid, callback){
console.log("killing session",userid);
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
        	client.del("session",function(err, added){
// 		console.log("session cached");
 			if(err){
 				console.log("line 214",err);	
 			}else{
 				console.log("line 217", added);
        		}
 		});
 		client.del("userid", function(err, added){
 			if(err){
 				console.log("line223",err);
 			}else{
 				console.log("line 226", added);					
        		}
        	});
        	
        	client.del("profileinfo", function(err, added){
 			if(err){
 				console.log("line223",err);
 			}else{
 				console.log("line 226", added);					
        		}
 		});
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

    		userid = data.userid;
    		updatelogininfo(loginlocation, userid, function(err, data){
				if (err){
					console.log(err, null);
					console.log("login Information not updated");
				}
				else{
					console.log(null, data);
					console.log("login informtaiont updated");
				}
			});
		client.set("session", JSON.stringify(data.sessionToken),function(err, added){
		console.log("session cached");
 					if(err){
 						console.log("line 170",err);
        					//callback(err, null); 	
 					}else{
 						console.log("line 173", added);
        					//callback(null, added); 					
        				}
 				});
 		client.set("userid", JSON.stringify(data.userid),function(err, added){
 					if(err){
 						console.log("line 58",err);
        					//callback(err, null); 	
 					}else{
 						console.log("line 58", added);
        					//callback(null, added); 					
        				}
 				});
		res.status(200).send({"userid":data.userid,"sessionToken":data.sessionToken});
		}
	});
}
//********************************************************
exports.logout = function(req, res){
var userid;
// 	console.log("line 131:session values:",req.session.userid);
//  var userid = req.session.userid ? req.session.userid : null;
// 	var userid = req.body.userid ? req.body.userid : null;
  async.waterfall([
  	getuserid, 
  	killuser
  ], function(err, result){
  		if(err){
 			console.log("line 199",err);
 			res.status(404).send("cache error occured");
 		}else{
 			res.status(200).send("User successfully logged out");			
        	}
  });
  
  function getuserid (callback){
  	client.get("userid",function(err, data){
 		if(err){
 			console.log("line 199",err);
 			callback(null);
 		}else{
 			userid = parseInt(data);
 			console.log("line 202", data ,"; ", userid);
 			callback(null,userid);				
        	}
 	});
  }
  
  function killuser(args1, callback){
		console.log(" 204:userid from cache:", userid);
		killsession( userid , function(err, data){
			if (err){
				console.log(err);
				res.status(404).send(err);
			}else {
				console.log(data);
				res.status(200).send(data);
			}
		});
	}
}
