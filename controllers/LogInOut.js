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
        			res.status(401).send({message:res});
    		} else if (res) {
    		console.log("line 18:");
        			res.send(res);
    		} else {
        			res.status(500).send({message:'Internal Server Error'});
			}
		});
}
exports.logout = function(req, res){
	
}