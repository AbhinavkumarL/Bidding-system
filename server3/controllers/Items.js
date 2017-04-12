/*
 * Items.js : Registers items posted by users in the bidding system.
 */
 
 'use strict';
 const bodyParser = require('body-parser');
 const m_items = require('../model/Items.js');
 
 //***************************************************************
 
 exports.registerItems=function(req, res){
 	
 	var desc = req.body.desc ? (req.body.desc) : null;
 	var userid = req.body.userid ? (req.body.userid) : null;
 	var initbid = req.body.initbid ? (req.body.initbid) : null;
 	var shelftime = req.body.shelftime ? (req.body.shelftime) : null;

 	m_items.registerItems(desc, userid, initbid, shelftime, function(err, data){
 		if (err){
 			console.log(err);
 			res.send(err);
 		}else {
 			res.send(data);
 		}
 	});
 }