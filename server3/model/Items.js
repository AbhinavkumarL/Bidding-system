/*
 * This js implements the main logic and interacts with the database
 */ 
 
 'use strict';
 const db = require('../db.js');
 const bodyParser = require('body-parser');
 
 //To verify if the item posted is a duplicate
 function verifyItemsDB(desc, userid, cb){
 var values = [
 	desc, 
 	userid
 ]
 var q = "select * from items where item_desc like ? and user_id = ?";
 	db.query(q, values, function(err, data){
 		if (err){
 			cb(err, null);
 		}else {
 			cb(null, data);
 		}
 	})
 	
 }
 
 //Register the items posted by the user in Items table
 function registerItemsDB(desc, userid, initbid, shelftime, cb){
 	
 	var q = "insert into items (item_desc, user_id, init_bid, shelf_time)"
 			+"values(?,?,?,?)";
 	var values =[
 		desc,
 		userid,
 		initbid,
 		shelftime
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
 
 exports.registeritems = function(req, res){
 	console.log("line 52:",req.body);
	var desc = req.body.desc ? req.body.desc :null;
	var userid = req.body.userid ? req.body.userid :null;
	var initbid = req.body.initbid ? req.body.initbid :null;
	var shelftime = req.body.shelftime ? req.body.shelftime :null;
	
 	verifyItemsDB(desc, userid , function(err, data){
 		if (err){
 			res.status(404).send(err);
 		}else if(data.length===0){
 			registerItemsDB(desc, userid, initbid, shelftime , function(err, data){
 				if (err){
 					res.status(404).send(err);
 				}else {
 					res.status(200).send("Items Successfully registered");
 				}
 			});
 		}
 	});
 }