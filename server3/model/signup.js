/*
 *This is a sign up file in model
 */
 'use strict';
 
 const uuid = require('uuid');
 const db = require('../db.js');
 const url = require('url');
 const md5 = require('md5');
 
 //verify if the user already exists
 var checkUser = function(email, callback){
 	var q = "select * from users where email= ?";
 	db.query(q, email, function(err, data){
 		if (err){
 			callback(err, null);
 		}else {
 			console.log(data);
 			callback(null, data);
 		}
 	});
 };
 // Add new user if user does not exist
 var addUsersDB = function(body , ip, callback){

 		var id =uuid.v1();
 		var q = "insert into users ( ipaddress, username, password, salt " 
 			+",email, first_name, last_name, gender, dob, address, address2,"
 			+"city , state, zip_code, phone,country,status"
 			+")values"
 			+"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
 		var values = [
 		ip,
 		body.username,
 		md5(body.password+id),
 		id,
 		body.email,
 		body.firstname,
 		body.lastname,
 		body.gender,
 		body.dob,
 		body.address,
 		body.address2,
 		body.city,
 		body.state,
 		body.zipcode,
 		body.phone,
 		body.country,
 		//Date.now(),
 		'suspended',
 		//Date.now()
 		]
 		console.log("line53:",body.password, id, md5(body.password+id));
 		db.query( q, values, function(err, data){
 			if (err){
 				callback(err, null);
 			}else {
 				callback(null, data);
 			}
 		});
}
 
 /******************************************************
 *******************************************************/
 exports.add = (function(body, ip, callback){

	checkUser(body.email, function(err, data){
 		if (err){

 			callback(err, null);
 		}
 		if(data.length===0){
 		
 			console.log("line 83"+data.length);
 		
 			addUsersDB(body, ip, function(err, data){
 				if (err){
 					callback(err, null);
 				}else {
 					callback(null, data);
 				}
 			});
			
 		}else {

		callback(null, data);
		}
 	})
 });