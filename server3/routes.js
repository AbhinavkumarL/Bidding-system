/*
 *These are the standard routes for the Bidding system server
 */
 'use strict';
 const express = require('express')
 const m_signup = require('./model/signup.js');
 const m_loginout = require('./model/LogInOut.js');
 const m_items = require('./model/Items.js');
 const m_bids= require('./model/Bids.js');
 const m_trans = require('./model/Transactions.js');
 const m_profile = require('./model/profileInfo.js');
 const m_email = require('./model/mailer.js');
 
 var router = express.Router();

 router.use(function timeLog(req, res,next){
 	console.log("Time Log:"+Date.now());
 	next();
 });
 router.get ('/allitems',m_items.allitems);
 router.post('/signup/verifyuser', m_signup.verifyuser); 
 router.post('/signup/adduser', m_signup.adduser);
 
 router.post('/login/checkcredentials', m_loginout.checkuser);
 router.post('/login/createsession',m_loginout.createsession);
  router.post('/user/updatelogininfo',m_loginout.updatelogininfo);
  
 router.post('/logout/killsession',m_loginout.killsession);
 
 router.get('/user/profileInfo',m_profile.profileInfo);
 router.post('/user/updateprofile',m_profile.updateprofile);

 router.post('/user/items',m_items.registeritems);
 router.get('/user/bidsonitem',m_bids.bidsonitem);
 router.post('/user/deleteitems', m_items.deleteitems);
 
 router.get('/user/highestbidonitem',m_items.highestbidonitem);
 router.post('/user/bids',m_bids.registerbids);
 router.get('/user/bidstatus',m_bids.bidstatus);
 
 router.get('/user/purchaseorders',m_trans.itemsuserpurchase);
 router.get('user/searchitems',m_items.searchitems);
  router.post('/user/transactions',m_trans.registertransactions);
//  router.post('./user/sendmail',m_email.sendMail);
 
 
 module.exports = router;