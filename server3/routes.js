/*
 *These are the standard routes for the Bidding system server
 */
 'use strict';
 const express = require('express')
 const m_signup = require('./model/signup.js')
 const m_loginout = require('./model/LogInOut.js')
 const m_items = require('./model/Items.js')
 const m_bids= require('./model/Bids.js')
 const m_trans = require('./model/Transactions.js')

 var router = express.Router();

 router.use(function timeLog(req, res,next){
 	console.log("Time Log:"+Date.now());
 	next();
 });

 router.post('/signup/verifyuser', m_signup.verifyuser); 
 router.post('/signup/adduser', m_signup.adduser);
 router.post('/login/checkcredentials', m_loginout.checkuser);
 router.post('/login/createsession',m_loginout.createsession);
 router.post('/logout/killsession',m_loginout.killsession);
 router.post('/user/items',m_items.registeritems);
 router.post('/user/bids',m_bids.registerbids);
 router.post('/user/transactions',m_trans.registertransactions);
 

  module.exports = router;