const express = require('express');
const bcrypt = require('bcrypt');
const sql = require('mysql');
const ejs = require('ejs');
const socket = require('socket.io');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const keys = require('./keys'); // credentials

// Fixes email error - This only allows me to use my self made certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Setting up the server
var app = express();
var server = app.listen(7111, () => {
	console.log('Server started on port 7111');
});

// Socket setup
var io = socket(server); // I need to pass the server as a parameter

// Sql Connection
db = sql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'reactlogin'
});

db.query(`CREATE TABLE IF NOT EXISTS clients (username VARCHAR(255), password VARCHAR(255))`, (err, result) => {
	if (err) console.log('Table err: '+err);
});

io.on('connection', (theSocket) => {
	theSocket.on('login', (credentials) => {
		db.query(`SELECT * FROM clients`, (err, result) => {
			if (!err) {
				bcrypt.compare(credentials.pass, result[0].password, (err, checkResult) => {
					var expDate = new Date().setDate(new Date().getDate() + (1/86400000*40000)); // Expires 40 sec from now
					var allowLogin = false, res = '', jwttoken;
					if (result[0].username === credentials.user && checkResult) {
						allowLogin = true;
						res = result[0].extra_info.split(" at ");

						// Creating a jwt
						jwttoken = jwt.sign({
							iss: res[0],
							sub: result[0].username,
							iat: new Date().getTime(),
							exp: expDate
						}, 'random_auth');
					}

					theSocket.emit('afterCheck', {check: allowLogin, user: result[0].username, email: res[1], name: res[0], token: jwttoken, exp: expDate});
				});
			}
		});
	});

	theSocket.on('myForm', function(obj) {
		console.log(obj);
	});

	theSocket.on('email', (email, name, data) => {
		var mailOptions = {
			from: keys.email.user,
			to: email,
			subject: 'Your recent purchase!',
			html: '<h1>Welcome, '+name+'</h1><p>'+data+'</p>'
		}

		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: keys.email.user,
				pass: keys.email.pass
			}
		});

		transporter.sendMail(mailOptions, function(error, info){
			if (error) {
				console.log('Sending email error: '+error);
				theSocket.emit('emailConf', 'Something failed, we will get back to you soon... :/');
			} else {
				theSocket.emit('emailConf', 'Purchase was successfuly bought, please check your email!');
			}
		});
	});

	theSocket.on('settings', (name, email) => { // could easily make this for all users but no need atm
		db.query(`UPDATE clients SET extra_info = "${name} at ${email}" WHERE username = "user"`, (err, result) => {
			if (err) console.log('err while update');
		});
	});

	theSocket.on('checkCookie', (cookie) => {
		jwt.verify(cookie, 'random_auth', (err, decoded) => {
			if (decoded === undefined) return theSocket.emit('checkedCookie', {check: false});;
			if (decoded.exp - new Date().getTime() > 0) {
				db.query(`SELECT * FROM clients`, (err, result) => {
					if (err) console.log('err cookies etc');
					var res = result[0].extra_info.split(" at ");
					theSocket.emit('checkedCookie', {check: true, user: result[0].username, email: res[1], name: res[0]});
				});
			} else {
				theSocket.emit('checkedCookie', {check: false});
			}
		});
	});
});

// EJS Middleware
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', '');
app.use('/js', express.static(__dirname+'/'));

// Routes
app.get('/', (req, res) => {
	res.render('HelloReactWorld.html');
});