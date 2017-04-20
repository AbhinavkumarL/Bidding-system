'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'abhi.4125@gmail.com',
        pass: '10bch0032'
    }
});
//***********************************************
exports.sendMail = function(json, cb){
	
	var mailOptions = {
    	from: 'abhi.4125@gmail.com',
    	to: json[0].to_email,
    	subject: 'Purchase Confirmation',    	
    	text: 'Hello, Congratulation you own the auction on item'+ json[0].description +'. Your transaction id is :'+json[0].transid +'.Please, Check your account for purchase order details. Thank you :):)'
    	};
	
	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
    	if (error) {
        	return console.log(error);
        	cb(error, null);
    	}
    	console.log('Message %s sent: %s', info.messageId, info.response);
    	cb(null,info);
	});
}
//*************************************************
//*************************************************
// exports.mailer = function(req, res){
// 	var email = req.body.email ? req.body.email : null;
// 	var desc = req.body.desc ? req.body.desc : null;
// 	sendMail(email, desc, function(err, data){
// 		if (err){
// 			res.status(404).send(error);
// 		}else{
// 			res.status(200).send(info);
// 		}
// 	});
// }
