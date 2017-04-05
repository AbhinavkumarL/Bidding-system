/*
 *This a singUp route in Controller
 */
 
 'use strict';
 const bodyParser = require('body-parser');
 const m_signup = require('../model/signup.js');

 exports.signup= function(req, reply){

 	var body = req.body;
 	var ip = (req.headers['x-forwarded-for'] || '192.27.3.1').split(',')[0];
 	
 		m_signup.add(body, ip, function (err, data){
 			if (err){
 				console.log("line 14"+err);
 				return (err);
 			}
 			else {
 				console.log("line 24"+data);
 				return (data);
 			}
 		});
 }
