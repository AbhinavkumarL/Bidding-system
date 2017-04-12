/*
 * Bid.js : Registers bids posted by users in Bids table.
 */
 
 'use strict';
 const bodyParser = require('body-parser');
 const m_bids = require('../model/Bids.js');
 
 //***************************************************************
 
 exports.registerBids=function(req, res){
 	
 	var userid = req.body.userid ? (req.body.userid) : null;
 	var itemid = req.body.itemid ? (req.body.itemid) : null;
 	var bidamount = req.body.bidamount ? (req.body.bidamount) : null;

 	m_bids.registerBids(userid, itemid, bidamount, function(err, data){
 		if (err){
 			console.log(err);
 			res.send(err);
 		}else {
 			res.send(data);
 		}
 	});
 }