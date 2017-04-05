/*
 *This a LogIn and LogOut routes in Controller
 */
 
 'use strict';
 const bodyParser = require('body-parser');
 const m_loginout = require('../model/LogInOut.js');
 const jwt = require('jsonwebtoken');
 const db = require('../db.js');
 const md5 = require('md5'); //to hash function to create a token and store it.

//verify if a user exists with the given credentials
function verifyUserDb (username, callback) {
	var q = 'select username, password, salt, user_id from users where '
		+ 'username = "' + username + '"';
	//console.log(username);
	db.query(q, function(err, res){
		if (err) {
			console.error('LoginOut.js: verifyUserDb: err: ' + err);
			callback(err, null);
		} else if (res && res.length) {
			console.info('LoginOut.js: verifyUserDb: success');
			callback(null, res);
		} else {
			console.info('users.js: verifyUserDb: null');
			callback(null, null);
		}
	})
}


//Create a session and store the data in sessions table and send the cookie in response
function createSessionDb (user_id, cookie, callback) {
	var url = 'http://localhost:3000/login';
	var q = 'insert into sessions (user_id, sesskeyapi) values(?,?)';
	var values =[
	user_id, 
	cookie
	]
	console.log("sessions values are stored in user_id and sesskeyapi columns")
	db.query(q, values, function(err, res){
		if (err) {
			console.error('LogInOut.js: createSessionDb: err: ' + err);
			callback(err, null);
		} else if (res) {
			callback(null, true);
		} else {
			callback(null, null);
		}
	})
}

var createSession = function(user_id, callback) {

	var token = jwt.sign({ user_id: user_id }, 'SecureKey');
	console.log("line 53:",user_id, token);
	createSessionDb(user_id, token, function(err, res){
	//console.log(username);
		if (err) {
			callback(err, null);
		} else if (res) {
		console.log("line 62:");
			callback (null, {user_id: user_id, sessionToken: token});
			console.log("line 64:");
		} else {
			callback(null, null);
		}
	})
}

//***********************************************************
//***********************************************************
exports.verifyLogin = function(username, password, callback) {

	verifyUserDb(username, function(err, res){
			if (err) {
			callback(err, null);
			} else if (res && res.length) {
				if (md5(password+res[0].salt) === res[0].password) {
				    console.log("password verified , Creating Session");
					createSession(res[0].user_id, function(err, res){ // we are creating  a session if it is a valid user.
						if (err) {
							callback(err, null);
						} else if (res) {
						console.log("line 83:");
							callback(null, res);
						console.log("line 85:");
						} else {
							callback(null, null);
						}
					});				
				} else {
					callback('unauthorized', 'Wrong password');
				}
		} else {
			callback('unauthorized', 'User not found');
		}
	})
}
exports.logout = function(body, callback){
	
}