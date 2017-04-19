/*
 * This js implements the main logic and interacts with the database
 */ 
 
 'use strict';
 const db = require('../db.js');
 const bodyParser = require('body-parser');
 const mailer = require('./mailer.js');
 //***************************************************************
 //Register the items posted by the user in Items table
 function itemstatusupdateDb(itemid, cb){
 
 	 	var q = "update items set status = 'soldout' where item_id ="+itemid;
 	 	db.query(q, function(err, data){
 		if (err){
 		console.log(err);
 			cb(err, null);
 		}else {
 			console.log("Item status updated to soldout");
 			cb(null,"Item status updated to soldout");
 		}
 	});
 }
 //***************************************************************
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
 function itemsuserpurchasedDB(userid, cb){
 	
 	var q = "select i.item_id, i.item_desc, t.trans_id, t.bid_id, t.trans_value from items i, bids b, transactions t  where t.bid_id=b.bid_id and b.item_id = i.item_id and i.status ='soldout'and b.user_id =?";
 	
 	db.query(q, userid, function(err, data){
 		if (err){
 			cb(err, null);
 		}else {
 			cb(null,data);
 		}
 	});
 } 
 //*********************************************************
 function sendmail(bidid, itemid, callback){
 	var values= [
 			bidid, 
 			itemid
 		]
 	var q = "select u.user_id userid, u.email to_email from bids b, users u where u.user_id = b.user_id and b.bid_id="+bidid+" and item_id ="+itemid;
 	console.log("line 65:",q);
 	db.query(q,function(err, data){
 		if (err){
 			console.log(err);
 			callback(err, null);
 		}else{
 			console.log("line 67:",data);
 			var details = JSON.stringify(data); 
 			console.log("line 68:",values);
 			mailer.sendMail(details, function(err,data){
 				console.log("line 74:",values);
			
 					if (err){
 						console.log(err);
 						callback(err, null);
 					}else{
 						console.log(err);
 						callback(null,data);
 					}
 				})
 		}
 	});
 	// console.log("line 72:",values);
//  	mailer.sendMail(values, function(err,data){
//  	console.log("line 74:",values);
// 
//  		if (err){
//  			console.log(err);
//  			callback(err, null);
//  		}else{
//  			console.log(err);
//  			callback(null,data);
//  		}
//  	})
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
 			itemstatusupdateDb(itemid, function(err, logs){
 				if (err){
 					console.log(err);
 				}else{
 					console.log(logs);
 				}
 			});
 			sendmail(bidid, itemid, function(err, data){
 				if (err){
 					console.log(err, null);
 				}else {
 					console.log(null, data);
 				}
 			})
 			res.status(200).send("Transaction completed for the item :"+itemid);
 		}
 	});
 }
//*****************************************************************
exports.itemsuserpurchase = function(req, res){
	var userid = req.body.userid ? req.body.userid : null;
	
	itemsuserpurchasedDB(userid, function(err, data){
		if (err){
			console.log(err);
			res.status(404).send(err);
		}
		else {
			console.log(null, data);
			res.status(200).send(data);
		}
	});
}