const express = require('express');
const ejs = require('ejs');
const socket = require('socket.io');
const sql = require('mysql');
const fs = require('fs');
const bodyParser = require('body-parser');
const request = require('request');

// App setup
var app = express();
var server = app.listen(3255, function () {
	console.log('Server is running on port 3255...');
});

// Socket setup
var io = socket(server); // I need to pass the server as a parameter

// Important Global Variables
var indexFile = 'ChatApp.html';
var theChat = fs.readFileSync('ChatSave.txt');

// EJS Middleware
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', '');

// Body Parser Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));

var connection = sql.createConnection({
	host: 'localhost',
	user: 'root',
	pass: '',
	database: 'chatapp'
});

// This listens to any connections made and then fires a callback function
io.on('connection', function (theSocket) { // theSocket has all the information about the socket made between the specific client and the server
	console.log('Connection was made with: '+theSocket.id); // For example here I console.log() the socket's id
	theSocket.on('chat', function (data) { // on('WHATEVER') is what was placed inside the javascript - data is the message send pretty much (like theSocket from above)
		// This reffers to all sockets - pretty much whatever data was send gets send back to all sockets (clients)
		io.sockets.emit('chat', data);

		// Saves entire chat into local file
		var chatty = '<p><strong>'+data.handle+': </strong>'+data.message+'</p>';
		fs.appendFile('ChatSave.txt', chatty, function (err) {
			if (err) console.log(err);
			else {
				console.log('Chat Saved!\n'+data.message);
			}
		});
	});

	theSocket.on('typing', function (data) {
		theSocket.broadcast.emit('typing', data); // Sends data to all sockets expect the user who send it himself
	});
});

// Connects to database
connection.connect(function (error) {
	if (error) return error;
	else {
		console.log('Connected to Database');
	}
});

// Routes
app.get('/', function (req, res) {
	res.render(indexFile, {
		chat: theChat,
		status: false,
		alert: false,
		theUser: "anonymous"
	});
});

app.post('/logging', function (req, res) {
	var theUser = req.body.userName;
	var theCaptchaResponse = req.body.captchaCheck;

	if (theCaptchaResponse === undefined || theCaptchaResponse === '' || theCaptchaResponse === null) {
		res.send({'msg': 'Please click captcha!'});
		return console.log('Captcha was not clicked!');
	} else {
		// Secret Key
		const secreyKey = '6LeYUHAUAAAAAJ7VPGgitCkxjuhwe0S_bfq4AgMy';

		// Verify Url (защо `` и ${}) - ``
		const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secreyKey}&response=${theCaptchaResponse}&remoteip=${req.connection.remoteAddress}`

		// Make request to verify url
		request(verifyUrl, function (err, response, body) {
			body = JSON.parse(body);

			// If not successful
			if (body.success !== undefined && !body.success) {
				res.send({'msg': 'Failed captcha verification!'});
				return console.log('Captcha did not pass verification!');
			}

			// If successful
			console.log('Captcha was successful');
		});
	}

	connection.query('SELECT * FROM users WHERE name = "'+theUser+'"', function (err, data) {
		if (err) return err;
		else {
			var wasMatched = false, theStatus, theAlert;
			if (data.length != 0) {
				wasMatched = true;
			}

			if (req.body.theOption == 'true') {
				if (wasMatched) {
					theStatus = false;
					theAlert = true;
				} else {
					theStatus = true;
					theAlert = false;

					// Inserts new user into database
					connection.query('INSERT INTO users (name) VALUES ("'+theUser+'")'); // No callback func (bad?)
				}
			} else if (req.body.theOption == 'false') {
				if (wasMatched) {
					theStatus = true;
					theAlert = false;
				} else {
					theStatus = false;
					theAlert = true;
				}
			}

			// Renders appropriate parts of the page
			res.render(indexFile, {
				chat: theChat,
				status: theStatus,
				alert: theAlert,
				theUser: theUser
			});
		}
	});
});

// Possibly add recaptcha to confirm you r not a robot and then also make it so you can login and have an accout. After you confirm you r not a human you can get the 
// opportunity to choose a user name for the chat. Also make it so that two people can not have the same user name. Finally make sure the chat gets saved

// Add loading screen till chat loads && make it so that when loads of text is written there is a break made && make all names have first letter uppercase no matter what and rest small

// BUGS so far:
// 1. need typing a mesage for more than one user. 2. when someone else finishes typing it erases the typing for the first person. 3. send message deletes other messages 4. start typing and then stop typing 5. Developer tools name switch...