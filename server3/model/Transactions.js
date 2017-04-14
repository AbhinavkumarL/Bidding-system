/*
 * This js implements the main logic and interacts with the database
 */ 
 
 'use strict';
 const db = require('../db.js');
 const bodyParser = require('body-parser');
 
 //Register the items posted by the user in Items table
 function updatetransactionsDb(bidid, itemid, bidamount, cb){
 	console.log(bidid, itemid, bidamount);
 	var q = "insert into transactions (bid_id, item_id, trans_value)"
 			+"values(?,?,?)";
 	var values =[
 		bidid,
 		itemid,
 		bidamount
 	];
 	
 	db.query(q,values, function(err, data){
 		if (err){
 		console.log(err);
 			cb(err, null);
 		}else {
 			cb(null,data);
 		}
 	});
 }
 
 //***************************************************************
 //***************************************************************
 
 exports.registertransactions = function(req, res){
	var bidid = req.body.bidid ? req.body.bidid : null;
	var itemid = req.body.itemid ? req.body.itemid :null;
	var bidamount = req.body.bidamount ? req.body.bidamount: null;
	

 	updatetransactionsDb(bidid, itemid, bidamount, function(err, data){
 	
 		if (err){
 			res.status(404).send(err);
 		}else {
 			res.status(200).send("Transaction completed for the item :"+itemid);
 		}
 	});
 }