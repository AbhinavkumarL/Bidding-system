/*
 *This a LogIn and LogOut routes in Controller
 */
 
 'use strict';
 const bodyParser = require('body-parser');
 const m_loginout = require('../model/LogInOut.js');
 
exports.login= function(req,res){
// 	console.log(" line 13 username:",req.body.username, req.body.password);
    var username= (req.body.username) ? req.body.username : null;
    var password= (req.body.password) ? req.body.password : null;
	
		m_loginout.verifyLogin(username, password,function(err, data){
			if (err === 'unauthorized') {
        			res.status(401).send({message:data});
    		} else if (data) {
        			res.send(true);
    		} else {
        			res.status(500).send({message:'Internal Server Error'});
			}
		});
}

exports.logout = function(req, res){
	var user_id = req.body.user_id ? req.body.user_id : null;
	
	m_loginout.logout(user_id,function(err, data){
		if (err){
			res.status(401).send({message:data});
		}else {
			res.send(data);
		}
	})
	
}