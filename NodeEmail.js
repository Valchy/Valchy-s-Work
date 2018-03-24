// IMPORTANT: go to https://myaccount.google.com/lesssecureapps and turn on in order to make this work
const http = require('http').Server().listen(2002);
const nodemailer = require('nodemailer');
const fs = require('fs');

// This only allows me to use my self made certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Notice how I use read file sync (this is ssl certificate etc)
var options = {
	key: fs.readFileSync('abels-key.pem'),
	cert: fs.readFileSync('abels-cert.pem')
};

// Options changed for security reaosns on github etc.
var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'mymail@gmail.com',
		pass: 'mypass'
	}
});

var mailOptions = {
	from: 'mymail@gmail.com',
	to: 'friendsemail@gmail.com',
	subject: 'NodeJS Mailer',
	text: 'This email was send though my node server.'
};

transporter.sendMail(mailOptions, function (err, result) {
	if (err) console.log('There was an error: ' + err);
	else {
		console.log('Email was sent');
	}
});

console.log('Server Running on port 2002...');