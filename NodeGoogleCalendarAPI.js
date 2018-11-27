// Required Modules
const express = require('express'); // Main package
const socket = require('socket.io'); // For socket connection
const bodyParser = require('body-parser'); // To parse form body
const handlebars = require('express-handlebars'); // Template engine
const sql = require('mysql'); // For my database (sql)
const joi = require('joi');	// Validating data
const jwt = require('jsonwebtoken'); // Encoding data (if you want proper log out use black list for each token that still hasent expired)
const bcrypt = require('bcrypt'); // For hashing passwords (once hashed cannot redo but only compare)
const morgan = require('morgan'); // Helps with login request details (check console)
const fs = require('fs'); // Read file system and more
const request = require('request'); // sending request from node js
const myKeys = require('./keys'); // Requiring my own module (./ means in same folder)

// Still needs configuration
const passportSocket = require('passport.socketio'); // Handle security with socket io

// Setting up global variables
var theInfo = '', app = express();
app.use(bodyParser.json()); // Bodyparser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev')); // Makes more info show upon request in console

// Handlebars middleware
app.set('views', ''); // Sets views directory which is '' aka the same folder
app.engine('html', handlebars({ // Configures routes of the layouts etc.
	defaultLayout: '',
	layoutsDir:'',
	extname: '.html'
}));
app.set('view engine', 'html');

// Connecting to database
var sqlConnection = sql.createConnection({
	host: 'localhost',
	user: 'root',
	pass: '',
	database: 'googlecalendar'
})

sqlConnection.connect((err) => {
	if (err) return console.log('Error while connecting to database: '+err);
	else { // Example for character set only on one column ... tableName (username VARCHAR(255) CHARACTER SET utf COLLATE utf8_unicode_ci, password VARCHAR(255)) etc.
		sqlConnection.query('CREATE TABLE IF NOT EXISTS users (username VARCHAR(255), password VARCHAR(255), email VARCHAR(255)) CHARACTER SET utf8 COLLATE utf8_unicode_ci', (err, result) => {
			if (err) return console.log('Error while creating table: '+err);
		});
	}
})

// Constructing a schema for varification
var schemaVerify = joi.object().keys({
    username: joi.string().alphanum().min(3).max(20).required(),
    password: joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required(),
    email: joi.string().email().required()
});

// Constructing a schema for ticket verification
var ticketReserveVerify = joi.object().keys({
	flyingFrom: joi.string().alphanum().required(),
	flyingTo: joi.string().alphanum().required()
});

// Setting up server
var server = app.listen(6444, () => {
	console.log('Server running on port 6444!');
});

// Connecting socket to server
var socketIO = socket(server);

// On client socket connection
socketIO.on('connection', (socketInfo) => {
	var referer = socketInfo.request.headers.referer;
	var check = referer.match(/^http?\:\/\/localhost\:6444\/.*/);

	if (check) { // Checking socket request
		socketInfo.on('viberChat', (theChat) => {
			// make a chat system
			console.log('Sent chat: '+theChat);
		});

		socketInfo.on('checkDatabase', (form, data, type) => {
			if (form) {
				sqlConnection.query('SELECT * FROM users WHERE username = ? OR email = ?', [data[0].val, data[2].val], (err, result) => {
				 	if (err) { // If database returns an error
				 		socketInfo.emit('checkedDatabase', form, 'Database error, please try again later!');
				 		return console.log('Error while selecting data: '+err);
				 	} else if (result == '') {
						// Validating information before inserting it into database
						//var result = joi.validate({username: 'abc', birthyear: 1994}, schemaVerify, function (error, value) { }); // different way of doing what done under
						var result = joi.validate({username: data[0].val, password: data[1].val, email: data[2].val}, schemaVerify);

						// Checking for error after validation
						if (result.error) { // Sending error back to client
						 	socketInfo.emit('checkedDatabase', form, result.error.details[0].message);
						} else if (result.error === null) { // result.error === null -> valid infromation
							bcrypt.genSalt(10, (err, salt) => {
								// Hashing password before saving it
							    bcrypt.hash(data[1].val, salt, function(err, hash) {
							        if (err) {
										socketInfo.emit('checkedDatabase', form, 'Database error please try again later!');
										return console.log('Error while hashing password: '+err);
									}

									sqlConnection.query('INSERT INTO users VALUES (?, ?, ?)', [data[0].val, hash, data[2].val], (err, result) => {
								 		if (err) {
								 			socketInfo.emit('checkedDatabase', form, 'Database error please try again later!');
								 			return console.log('Error while inserting data in users table: '+err);
								 		} else {
								 			// Sending form submit confirmation
						 					socketInfo.emit('checkedDatabase', form, true);
								 		}
								 	});
							    });
							});
						}
				 	} // When they secretly change data error handling
				 	else socketInfo.emit('checkedDatabase', form, 'Data Error, please check user details and try again!');
				});
			} else if (!form) {
				var sqlColums = ['username', 'password', 'email'];
				if (sqlColums.indexOf(type) == -1) return;

				// ? and then [] (array with for all ?) to escape possible sql attacks
				sqlConnection.query(`SELECT * FROM users WHERE ${type} = ?`, [data], (err, result) => {
				 	if (err) {
				 		socketInfo.emit('checkedDatabase', form, 'red', type);
				 		return console.log('Error while selecting data: '+err);
				 	} else if (result == '') socketInfo.emit('checkedDatabase', form, 'green', type);
				 	else socketInfo.emit('checkedDatabase', form, 'red', type);
				});
			}
		});
	}
});

// Routes
app.get('/login', (req, res) => { // pass some sort fo token...?
	res.render('NodeGoogleCalendarAPI.html', {info: '', notLogged: true, signup: false, token: ''});
});

app.get('/signup', (req, res) => {
	res.render('NodeGoogleCalendarAPI.html', {info: '', notLogged: true, signup: true, token: ''});
});

app.all('/google-login', (req, res) => {
	res.send('<script type="text/javascript"> window.opener.popupCallbackGoogle(window.location.href); window.close(); </script>');
});

app.all('/facebook-login', (req, res) => {
	res.send('<script type="text/javascript"> window.opener.popupCallbackFacebook(window.location.href); window.close(); </script>');
});

app.get('/thank-you-for-your-booking', (req, res) => {
	res.send('<center> <h1> Your booking was made! </h1> <br> <a href="http://localhost:6444/"> Click here to go back to Booking Page </a> </center>');
});

app.all('/', (req, res) => {
	// Distingushing different requests
	if (req.method == 'GET') {
		res.render('NodeGoogleCalendarAPI.html', {info: 'firstLogin', notLogged: true, token: ''});
	} else if (req.method == 'POST') {
		if (req.body.methodType == 'login') {
			sqlConnection.query(`SELECT * FROM users WHERE email = "${req.body.checkEmail}"`, (err, result) => {
				if (err) {
					res.send('Error status: 403');
					return console.log('Error while checking user at login: '+err);
				} else if (result != '') {
					bcrypt.compare(req.body.checkPassword, result[0].password, (err, checkResult) => {
						if (err) {
							res.send('Error status: 403');
							return console.log('Bcrypt error: '+err);
						} else if (checkResult) {
							// Creating JWT token back to client (jwt.io for refference)
							const token = jwt.sign({ // Usually dont use email to create / check tokens since user might change their email
								iss: result[0].username,
								sub: result[0].email,
								iat: new Date().getTime(), // Current date and time
								exp: new Date().setDate(new Date().getDate() + (1/86400000*600000)) // Expires 5 minutes from now
							}, myKeys.jwtProjects.googleCalendar); // Usually you woudnt do it like this but put a custom secret key (prevents people from recreating tokens)

							res.render('NodeGoogleCalendarAPI.html', {info: 'false||||'+result[0].username, notLogged: false, token});
						} else {
							res.render('NodeGoogleCalendarAPI.html', {info: 'true||||Incorrect password!||||'+req.body.checkEmail+'||||'+req.body.checkPassword, notLogged: true, token: ''});
						}
					});
				} else {
					res.render('NodeGoogleCalendarAPI.html', {info: 'true||||Incorrect email!||||'+req.body.checkEmail+'||||'+req.body.checkPassword, notLogged: true, token: ''});
				}
			});
		} else if (req.body.methodType == 'signup') {
			// Creating JWT token back to client (jwt.io for refference)
			const token = jwt.sign({ // Usually dont use email to create / check tokens since user might change their email
				iss: req.body.username,
				sub: req.body.email,
				iat: new Date().getTime(), // Current date and time
				exp: new Date().setDate(new Date().getDate() + (1/86400000*600000)) // Expires 5 minutes from now
			}, myKeys.jwtProjects.googleCalendar); // Usually you woudnt do it like this but put a custom secret key (prevents people from recreating tokens)

			res.render('NodeGoogleCalendarAPI.html', {info: 'false||||'+req.body.username, notLogged: false, token});
		} else if (req.body.methodType == 'google') {
			var googleRequestOpts = {
				url: 'https://www.googleapis.com/plus/v1/people/me?access_token='+req.body.loginData,
				method: 'GET'
			};

			// Sending request to google server
			request(googleRequestOpts, (err, reqResponse, body) => {
				if (err) {
					res.render('NodeGoogleCalendarAPI.html', {info: 'true||||Google login unsuccessful!', notLogged: true, token: ''});
					return console.log('Google request information error: '+err);
				} else {
					var parsedData = JSON.parse(body);

					sqlConnection.query(`SELECT * FROM users WHERE email = "${parsedData.emails[0].value}"`, (err, result) => {
						if (err) {
							res.send('Error status: 403');
							return console.log('Error while checking user at login: '+err);
						} else if (result == '') {
							bcrypt.genSalt(10, (err, salt) => {
								// Hashing password before saving it
							    bcrypt.hash(parsedData.id, salt, function(err, hash) {
							        if (err) {
										res.send('Error status: 403');
										return console.log('Error while hashing password: '+err);
									}

									sqlConnection.query(`INSERT INTO users VALUES ("${parsedData.displayName}", "${hash}", "${parsedData.emails[0].value}")`, (err) => {
										if (err) {
											res.send('Error status: 403');
											return console.log('Error while inserting values into table with google auth'+err);
										} else {
											// Creating JWT token back to client (jwt.io for refference)
											const token = jwt.sign({ // Usually dont use email to create / check tokens since user might change their email
												iss: parsedData.displayName,
												sub: parsedData.emails[0].value,
												iat: new Date().getTime(), // Current date and time
												exp: new Date().setDate(new Date().getDate() + (1/86400000*600000)) // Expires 5 minutes from now
											}, myKeys.jwtProjects.googleCalendar); // Usually you woudnt do it like this but put a custom secret key (prevents people from recreating tokens)

											res.render('NodeGoogleCalendarAPI.html', {info: 'false||||'+parsedData.displayName, notLogged: false, token: token});
										}
									});
							    });
							});
						} else {
							// Creating JWT token back to client (jwt.io for refference)
							const token = jwt.sign({ // Usually dont use email to create / check tokens since user might change their email
								iss: parsedData.displayName,
								sub: parsedData.emails[0].value,
								iat: new Date().getTime(), // Current date and time
								exp: new Date().setDate(new Date().getDate() + (1/86400000*600000)) // Expires 5 minutes from now
							}, myKeys.jwtProjects.googleCalendar); // Usually you woudnt do it like this but put a custom secret key (prevents people from recreating tokens)

							res.render('NodeGoogleCalendarAPI.html', {info: 'false||||'+parsedData.displayName, notLogged: false, token: token});
						}
					});
				}
			});
		} else if (req.body.methodType == 'facebook') {
			var facebookRequestOpts = {
				url: 'https://graph.facebook.com/me?fields=email,name&access_token='+req.body.loginData,
				method: 'GET'
			};

			// Sending request to google server
			request(facebookRequestOpts, (err, reqResponse, body) => {
				if (err) {
					res.render('NodeGoogleCalendarAPI.html', {info: 'true||||Facebook login unsuccessful!', notLogged: true, token: ''});
					return console.log('Facebook request information error: '+err);
				} else {
					var parsedData = JSON.parse(body);

					sqlConnection.query(`SELECT * FROM users WHERE email = "${parsedData.email}"`, (err, result) => {
						if (err) {
							res.send('Error status: 403');
							return console.log('Error while checking user at login: '+err);
						} else if (result == '') {
							bcrypt.genSalt(10, (err, salt) => {
								// Hashing password before saving it
							    bcrypt.hash(parsedData.id, salt, function(err, hash) {
							        if (err) {
										res.send('Error status: 403');
										return console.log('Error while hashing password: '+err);
									}

									sqlConnection.query(`INSERT INTO users VALUES ("${parsedData.name}", "${hash}", "${parsedData.email}")`, (err) => {
										if (err) {
											res.send('Error status: 403');
											return console.log('Error while inserting values into table with facebook auth'+err);
										} else {
											// Creating JWT token back to client (jwt.io for refference)
											const token = jwt.sign({ // Usually dont use email to create / check tokens since user might change their email
												iss: parsedData.name,
												sub: parsedData.email,
												iat: new Date().getTime(), // Current date and time
												exp: new Date().setDate(new Date().getDate() + (1/86400000*600000)) // Expires 5 minutes from now
											}, myKeys.jwtProjects.googleCalendar); // Usually you woudnt do it like this but put a custom secret key (prevents people from recreating tokens)

											res.render('NodeGoogleCalendarAPI.html', {info: 'false||||'+parsedData.name, notLogged: false, token: token});
										}
									});
							    });
							});
						} else {
							// Creating JWT token back to client (jwt.io for refference)
							const token = jwt.sign({ // Usually dont use email to create / check tokens since user might change their email
								iss: parsedData.name,
								sub: parsedData.email,
								iat: new Date().getTime(), // Current date and time
								exp: new Date().setDate(new Date().getDate() + (1/86400000*600000)) // Expires 5 minutes from now
							}, myKeys.jwtProjects.googleCalendar); // Usually you woudnt do it like this but put a custom secret key (prevents people from recreating tokens)

							res.render('NodeGoogleCalendarAPI.html', {info: 'false||||'+parsedData.name, notLogged: false, token: token});
						}
					});
				}
			});
		} else if (req.body.methodType == 'random') {
			if (req.body.storedToken != undefined && req.body.storedToken != '') {
				jwt.verify(req.body.storedToken, myKeys.jwtProjects.googleCalendar, (err, decoded) => {
					if (err) return res.redirect('/login');
					// Creating JWT token back to client (jwt.io for refference)
					const token = jwt.sign({ // Usually dont use email to create / check tokens since user might change their email
						iss: decoded.iss,
						sub: decoded.sub,
						iat: new Date().getTime(), // Current date and time
						exp: new Date().setDate(new Date().getDate() + (1/86400000*600000)) // Expires 5 minutes from now
					}, myKeys.jwtProjects.googleCalendar); // Usually you woudnt do it like this but put a custom secret key (prevents people from recreating tokens)

					// Getting html
					fs.readFile('NodeGoogleCalendarAPI.html', 'utf-8', (err, data) => {
						if (err) return res.redirect('/login');
						res.send({html: data, user: decoded.iss});
					});
				});
			}
		}
	}
});

// https://calendar.google.com/calendar/r/ to see the booking
app.post('/booking', (req, res) => {
	//Checking input info before reserving ticket
	jwt.verify(req.body.securityToken, myKeys.jwtProjects.googleCalendar, (err, decoded) => {
		if (err) {
			res.redirect('/login');
		} else {
			// Creating JWT token back to client (jwt.io for refference)
			const token = jwt.sign({ // Usually dont use email to create / check tokens since user might change their email
				iss: decoded.iss,
				sub: decoded.sub,
				iat: new Date().getTime(), // Current date and time
				exp: new Date().setDate(new Date().getDate() + (1/86400000*600000)) // Expires 5 minutes from now
			}, myKeys.jwtProjects.googleCalendar); // Usually you woudnt do it like this but put a custom secret key (prevents people from recreating tokens)

			// Validating form
			var result = joi.validate({flyingFrom: req.body.flyingFrom, flyingTo: req.body.flyingTo}, ticketReserveVerify);

			// Checking result after validation has been made
			if (result.error) { // Sending error back to client
			 	res.render('NodeGoogleCalendarAPI.html', {info: 'true||||False city name given!\nTry again later...||||', notLogged: true, token: token});
			} else if (result.error === null) { // result.error === null -> valid infromation
				var todaysData = new Date();
				var theDate = todaysData.getTime();

				if (req.body.flightType === 'round_trip') {
					var departDate = new Date(req.body.departing);
					var returnDate = new Date(req.body.returning);

					if (departDate.getTime() >= theDate && returnDate.getTime() > departDate.getTime() && (req.body.seatType == 'Economy class' || req.body.seatType == 'Business class' || req.body.seatType == 'First class') && (req.body.adultsCount > 0 && req.body.adultsCount <= 4) && (req.body.childrenCount >= 0 && req.body.childrenCount <= 4)) {
						var refreshUrl = {
							url: 'https://www.googleapis.com/oauth2/v4/token',
							method: 'POST',
							json: true,
							body: {
								client_id: myKeys.google.client_id,
								client_secret: myKeys.google.client_secret,
								refresh_token: myKeys.google.refresh_token,
								grant_type: 'refresh_token'
							}
						};

						request(refreshUrl, (err, reqResponse, body) => {
							if (err) return res.send('Request '+err);

							// Setting up request obj
							var addingEventParams = {
								headers: { // Sending Bearer <access_token>
									'Authorization': body.token_type+' '+body.access_token
								},
								url: `https://www.googleapis.com/calendar/v3/calendars/${myCredentials.calendar_id}/events`,
								method: 'POST',
								json: true,
								body: { // params guide: https://developers.google.com/calendar/v3/reference/events/insert
									'summary': 'Roundtrip '+req.body.seatType+' ticket booked from '+req.body.flyingFrom+' to '+req.body.flyingTo+'!',
									'location': req.body.flyingFrom+' to '+req.body.flyingTo,
									'description': 'This is a roundtrip '+req.body.seatType+' '+req.body.adultsCount+' adult(s) and '+req.body.childrenCount+' chhildren flight from '+req.body.flyingFrom+' to '+req.body.flyingTo+'.',
									'start': {
										'dateTime': req.body.departing+'T00:00:00',
										'timeZone': 'Europe/Sofia',
									}, // timezone help: http://www.timezoneconverter.com/cgi-bin/zonehelp.tzc
									'end': {
										'dateTime': req.body.returning+'T00:00:00',
										'timeZone': 'Europe/Sofia',
									}
								}
							}

							// Inserting event into google calendar
							request(addingEventParams, (err, reqResponse, body) => {
								if (err) return res.send('Request two '+err);

								res.redirect('/thank-you-for-your-booking');
							});
						});
					} else {
						res.render('NodeGoogleCalendarAPI.html', {info: 'true||||Insufficient Information!||||', notLogged: false, token: token});
					}
				} else if (req.body.flightType === 'one_way') {
					var departDate = new Date(req.body.departing);

					if (departDate.getTime() >= theDate && (req.body.seatType == 'Economy class' || req.body.seatType == 'Business class' || req.body.seatType == 'First class') && (req.body.adultsCount > 0 && req.body.adultsCount <= 4) && (req.body.childrenCount >= 0 && req.body.childrenCount <= 4)) {
						var refreshUrl = {
							url: 'https://www.googleapis.com/oauth2/v4/token',
							method: 'POST',
							json: true,
							body: {
								client_id: myKeys.google.client_id,
								client_secret: myKeys.google.client_secret,
								refresh_token: myKeys.google.refresh_token,
								grant_type: 'refresh_token'
							}
						};

						request(refreshUrl, (err, reqResponse, body) => {
							if (err) return res.send('Request '+err);

							// Setting up request obj
							var addingEventParams = {
								headers: { // Sending Bearer <access_token>
									'Authorization': body.token_type+' '+body.access_token
								},
								url: `https://www.googleapis.com/calendar/v3/calendars/${myCredentials.calendar_id}/events`,
								method: 'POST',
								json: true,
								body: { // params guide: https://developers.google.com/calendar/v3/reference/events/insert
									'summary': 'One way '+req.body.seatType+' ticket booked from '+req.body.flyingFrom+' to '+req.body.flyingTo+'!',
									'location': req.body.flyingFrom+' to '+req.body.flyingTo,
									'description': 'This is a one way '+req.body.seatType+' '+req.body.adultsCount+' adult(s) and '+req.body.childrenCount+' chhildren flight from '+req.body.flyingFrom+' to '+req.body.flyingTo+'.',
									'start': {
										'dateTime': req.body.departing+'T00:00:00',
										'timeZone': 'Europe/Sofia',
									}, // timezone help: http://www.timezoneconverter.com/cgi-bin/zonehelp.tzc
									'end': {
										'dateTime': req.body.departing+'T00:00:00',
										'timeZone': 'Europe/Sofia',
									}
								}
							}

							// Inserting event into google calendar
							request(addingEventParams, (err, reqResponse, body) => {
								if (err) return res.send('Request two '+err);

								res.redirect('/thank-you-for-your-booking');
							});
						});
					}  else {
						res.render('NodeGoogleCalendarAPI.html', {info: 'true||||Insufficient Information!||||', notLogged: false, token: token});
					}
				} else {
					res.render('NodeGoogleCalendarAPI.html', {info: 'true||||Error occurred!\nTry again later!||||', notLogged: false, token: token});
				}
			}
		}
	});
});

/* IF NEEDED LATER (to get access token and refresh token with post request etc)
	JS:
		var opts = {
		    'scope': 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
	    	'client_id': '1006633308118-01i8h57dm611rpko3ca4imma3bhdo42s.apps.googleusercontent.com',
		    'redirect_uri': 'http://localhost:6444/google-login',
		    'access_type': 'offline', // offline gets also refresh token
		    'prompt': 'select_account consent',
		    'response_type': 'code'
		};

	Node JS:
		var refreshUrl = {
			code: '4/mABcLUdqaKYLxZEFFa5zaYI843G61Myiusm0lt-jla4VlgNqeA9WRRJfMr8t0I3An9gAI2ZIc6ZxnFul_4UAq-E',
			client_id: '1006633308118-01i8h57dm611rpko3ca4imma3bhdo42s.apps.googleusercontent.com',
			client_secret: 'Qx6qoMrLbC_PWRWgF1l2n3WS',
			redirect_uri: 'http://localhost:6444/google-login',
			grant_type: 'authorization_code'
		};

		// Content-Type: application/x-www-form-urlencoded

		request.post({url:'https://www.googleapis.com/oauth2/v4/token?', form: refreshUrl}, (err, reqResponse, body) => {
			if (err) {
				console.log('Request err: '+err);
				return res.send('error')
			} else {
				console.log(body);
			}
		});
*/