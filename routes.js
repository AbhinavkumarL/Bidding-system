/*
 *These are the standard routes for the Bidding system server
 */
 'use strict';
 const express = require('express')
 const c_signup = require('./controllers/signup.js')
 const c_loginout = require('./controllers/LogInOut.js')
 // const bodyParser = require('body-parser')
 var router = express.Router();
 //var sess;
 router.use(function timeLog(req, res,next){
 	console.log("Time Log:"+Date.now());
 	//console.log(req.body);
 	next();
 });
 
 router.get('/', function(req, res){
 	//sess = req.session;
 	//sess.username;
 	// sess.eamil;
 	console.log(req);
 });
 

 router.post('/signup', c_signup.signup); 
 
 router.post('/login', c_loginout.login);
 console.log("line 28:");
 router.post('/logout', c_loginout.logout);

  
 router.use(function(req, res, next) {

  var token = req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    	jwt.verify(token, 'SecureKey', function(err, decoded) {     
	
      		if (err) {
        		return res.json({ success: false, message: 'Failed to authenticate token.' });    
      		} else {
        		// if everything is good, save to request for use in other routes
        		req.decoded = decoded;    
        		next();
      		}
    	});

  } else {
    	// if there is no token
    	// return an error
    	return res.status(403).send({ 
        	success: false, 
        	message: 'No token provided.' 
    });

  }
});


 module.exports = router;