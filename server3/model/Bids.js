/*
 * This js implements the main logic and interacts with the database
 */ 
 
 'use strict';
 const db = require('../db.js');
 const bodyParser = require('body-parser');
 
 //Register the items posted by the user in Items table
 function registerBidsDB(userid, itemid, bidamount, cb){
 	
 	var q = "insert into items (user_id, item_id, bid_amount)"
 			+"values(?,?,?)";
 	var values =[
 		userid,
 		itemid,
 		bidamount
 	];
 	
 	db.query(q,values, function(err, data){
 		if (err){
 			cb(err, null);
 		}else {
 			cb(null,data);
 		}
 	});
 }
 
 //***************************************************************
 //***************************************************************
 
 exports.registerbids = function(req,res){
 	var userid = req.body.userid ? (req.body.userid) : null;
 	var itemid = req.body.itemid ? (req.body.itemid) : null;
 	var bidamount = req.body.bidamount ? (req.body.bidamount) : null;

 	registerBidsDB(userid, itemid, bidamount, function(err, data){
 		if (err){
 			res.send(err, null);
 		}else {
 			res.send(null,data);
 		}
 	});
 }