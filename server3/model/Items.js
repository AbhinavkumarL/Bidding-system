/*
 * This js implements the main logic and interacts with the database
 */ 
 
 'use strict';
 const db = require('../db.js');
 
 //To verify if the item posted is a duplicate
 function verifyItemsDB(desc, userid, cb){
 var values = [
 	desc, 
 	userid
 ]
 var q = "select * from items where item_desc like '"+desc+"' and user_id = "+userid;
 	db.query(q, values, function(err, data){
 		if (err){
 			cb.send(err, null);
 		}else {
 			cb.send(null, data);
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
 			cb.send(err, null);
 		}else {
 			cb.send(null,data);
 		}
 	});
 }
 
 //***************************************************************
 //***************************************************************
 
 
 exports.registerItems = function(desc, userid, initbid, shefltime, cb){
 	verifyItemDB(desc, userid , function(err, data){
 		if (err){
 			cb.send(err);
 		}else if(data.length===0){
 			registerItemDB(desc, userid, initbid, shefltime , function(err, data){
 				if (err){
 					cb.send(err, null);
 				}else {
 					cb.send(null,data);
 				}
 			});
 		}
 	});
 }