const path = require('path');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

var randomToken = randomTokenGenerator();
var app = express();
var server = app.listen(5222, function () {
	console.log('Server running on port 5222');
});

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	pass: '',
	database: 'sqlinjection'
});

connection.connect(function (error) {
	if (error) console.log(error);
	else {
		console.log('Connected to database...');
		connection.query('TRUNCATE TABLE randomlogin', function (error, result) {
			if (error) console.log(error);
		});
		connection.query('INSERT INTO randomlogin VALUES (NULL, NULL, "'+randomToken+'")', function (error, result) {
			if (error) console.log(error);
			console.log('Token Inserted');
		});
	}
})

// EJS Middleware
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', '');

// Body Parser Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (request, response) {
	response.render('SQLInjectionLogin.html', {
		token: randomToken,
		loggedin: false,
		alert: false
	});
});

app.post('/login', function (request, response) {
	if (request.body.userName != '' && request.body.password != '') {
		connection.query('UPDATE randomlogin SET username = ?, password = ? WHERE specialtoken = ?', [request.body.userName, request.body.password, request.body.specialToken], function (error, result) {
			if (error) console.log(error);
			else {
				connection.query('SELECT * FROM randomlogin', function (error, result) {
					if (error) console.log(error);
					else {
						var theToken = result[0].specialtoken,
							theUsername = result[0].username,
							thePassword = result[0].password,
							loginStatus;

						if (theUsername == 'null' || thePassword == 'null') {
							loginStatus = false;
						} else {
							loginStatus = true;
						}

						response.render('SQLInjectionLogin.html', {
							token: theToken,
							userName: theUsername,
							password: thePassword,
							loggedin: loginStatus,
							alert: !loginStatus
						});
					}
				});
			}
		});
	} else {
		console.log('Special Token did not match or an input was left empty!');
		response.render('SQLInjectionLogin.html', {
			token: randomToken,
			loggedin: false,
			alert: true
		});
	}
});

function randomTokenGenerator () {
	var abc = "abcdefghijklmnopqrstuvwxyz1234567890".split("");
	var token = "";
	for (i = 0; i < 18; i++) {
		token += abc[Math.floor(Math.random() * abc.length)];
	}
	return token; // Returns random token
}