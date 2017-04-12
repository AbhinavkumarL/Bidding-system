/*
 *This a singUp route in Controller
 */
 
 'use strict';
 const bodyParser = require('body-parser');
 const m_signup = require('../model/signup.js');

 exports.signup= function(req, reply){
 console.log('port 9443 executing sign up');
 	var body = req.body;
 	var ip = (req.headers['x-forwarded-for'] || '192.27.3.1').split(',')[0];
 	
 		m_signup.add(body, ip, function (err, data){
 			if (err){
 				console.log("signup Not successful, response sent to 8443");
 				return (err);
 			}
 			else {
 				console.log("signup successful, response sent to 8443");
 				return (data);
 			}
 		});
 }
