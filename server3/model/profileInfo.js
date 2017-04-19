
'use strict';
 const db = require('../db.js');
 const bodyParser = require('body-parser');
 const uuid = require('uuid');
 const md5 = require('md5');
//******************************************************
function profileInfoDb(userid, cb){
	var q = 'select * from users where user_id = ?'; 

	db.query(q, userid, function(err,data){
		if(err){
			console.error('Server 3, model: profileInfoDb.js:' + err);
			cb(err,null);
		}
		else{
			cb(null,data);
		}
	});
}
//******************************************************
function editprofileDb(body, cb){
	var firstname = body.firstname ? body.firstname :null;
	var lastname = body.lastname ? body.lastname :null;
	var email = body.email ? body.email :null;
	var password = body.password ? body.password : null;
	var userid = body.userid ? body.userid :null;
	
 		var id =uuid.v1();
 		var q = "update users  set password = ?, email=?, first_name =?, last_name =?  where user_id = ?" 
 			
 		var values = [
 		md5(body.password+id),
 		body.email,
 		body.firstname,
 		body.lastname,
 		body.userid
 		]
 		// console.log("line53:",body.password, id, md5(body.password+id));
 		
 		db.query( q, values, function(err, data){
 		console.log("line 43",q);
 			if (err){
 				console.log(err);
 				callback(err, null);
 			}else {
 				console.log("line 48:",data);
 				callback(null, data);
 			}
 		});
}
//******************************************************
//******************************************************
exports.profileInfo = function(req, res){
var userid = req.query.userid ? req.query.userid :null;

	profileInfoDb(userid,function(err,data){
		if(err){
			console.log('Server 3, model: profileInfo.js' + err);
			res.status(400).send(err);
		}
		else{
			res.status(200).send(data);
		}
	});
}
//******************************************************
exports.updateprofile = function(req, res){
	var body = req.body;
	var email = req.body.email ? req.body.email :null;
	var password = req.body.password ? req.body.password : null;
	
	if (email ===null || password ===null){
		res.status(500).send("email or password can not be NULL");
	}
	
	
	editprofileDb(body,function(err,data){
		if(err){
			console.log('Server 3, model: profileInfo.js' + err);
			res.status(400).send(err);
		}
		else{
			res.status(200).send(data);
		}
	});
}