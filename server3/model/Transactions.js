/*
 * This js implements the main logic and interacts with the database
 */ 
 
 'use strict';
 const db = require('../db.js');
 const bodyParser = require('body-parser');
 
 //Register the items posted by the user in Items table
 function updatetransactionsDb(bidid, itemid, bidamount, cb){
 	
 	var q = "insert into transactions (bidid, itemid, bidamount)"
 			+"values(?,?,?)";
 	var values =[
 		bidid,
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
 
 exports.registertransactions = function(req, res){
	var bidid = req.body.bidid ? req.body.bidid : null;
	var itemid = req.body.itemid ? req.body.itemid :null;
	var bidamount = req.body.bidamount ? req.body.bidamount: null;
	

 	updatetransactionsDb(bidid, itemid, bidamount, function(err, data){
 		if (err){
 			res.send(err, null);
 		}else {
 			res.send(null,data);
 		}
 	});
 }