/*
 * This js implements the main logic and interacts with the database
 */ 
 
 'use strict';
 const db = require('../db.js');
 
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
 			cb.send(err, null);
 		}else {
 			cb.send(null,data);
 		}
 	});
 }
 
 //***************************************************************
 //***************************************************************
 
 
 exports.registerBids = function(userid, itemid, bidamount, cb){

 	registerBidsDB(userid, itemid, bidamount, function(err, data){
 		if (err){
 			cb.send(err, null);
 		}else {
 			cb.send(null,data);
 		}
 	});
 }