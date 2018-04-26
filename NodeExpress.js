const bodyParser = require('body-parser'); // Body-parser actually has middleware which essentially is lines of code to set up the module in this case
const express = require('express'); // Best and most popular module in node.js as in 2018
const path = require('path'); // This module simplifies the paths... (read in google for more info)
const expressValidator = require('express-validator'); // This is so that form fields such as inputs can be validated in a way (also has middleware so that it can make it work)
const mysql = require('mysql');
var createdAccounts = [];

// Simple fix for the 'Connection error: Error: Cannot enqueue Handshake after already enqueuing a Handshake.' is to remove the .connect() and .end() methods
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	pass: '',
	database: 'node_express'
});

// Random data variables
var person = {'name': 'Valeri', 'age': 16, 'playsGames': true}
var people = [
	{'name': 'Erik', 'age': 8, 'playsGames': true},
	{'name': 'Sunny', 'age': 17, 'playsGames': false},
	{'name': 'Tiffany', 'age': 10, 'playsGames': true}
]

var app = express();

// This is kind of like a onLoad function in which you can do things such as even stopping the request
var logger = function (req, res, next) { // It really doesn't matter if I use function or the => method (its the same thing)
	console.log('Logging...'); // This will show everytime somebody opens the page (if you have time connect this to a database so you can count the amount of times the page was opened)
	next();
}

app.use(logger);

// View Template Engine
app.set('view engine', 'ejs'); // Sets ejs as the method of using templated JavaScript if that makes sence xD
app.set('views', path.join(__dirname, 'NodeJSUploadFolder'));

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Setting static path (commented since I am showing an ejs index file instead)
// app.use(express.static(path.join(__dirname, 'NodeJSUploadFolder'))); // This always searches and open the index.html file from the chosen folder

// Global Vars
app.use((req, res, next) => {
	res.locals.errors = null; // This fixes an error which causes 'errors' to be undefined or have an uncought reference
	next();
});

// Express Validator Middleware
app.use(expressValidator()); 

// Get request to visit specific page for example
app.get('/', (req, res) => {
	// res.send('<h1> Hello World </h1>'); // Send method prints out whatever you put onto the screen (could also be HTML code)
	// res.json(person); // I have to comment all res.send() since you can't sed more than one response (at least not with this method)

	connection.query('SELECT * FROM account', function (error, results) {
		if (error) console.log('Error: '+error);
		else {
			console.log(results.length);
			for (var i = 0; i < results.length; i++) {
				console.log(results);
				if (createdAccounts.length != 0) {
					if (createdAccounts[i].id === results[i].id) {
						console.log('User already added');
					}
					else {
						var tmpObjeict = {'id': results[i].id, 'firstName': results[i].firstName, 'lastName': results[i].lastName, 'email': results[i].email};
						createdAccounts.push(tmpObjeict);
					}
				}
				else {
					var tmpObjeict = {'id': results[i].id, 'firstName': results[i].firstName, 'lastName': results[i].lastName, 'email': results[i].email};
					createdAccounts.push(tmpObjeict);
				}
			};

			//createdAccounts.join(' | ');

			res.render('index', { // Renders and shows the ejs index file
				'header': 'Numbers from a for loop:',
				'users': people,
				'account': createdAccounts
			});
		}
	});
			console.log('Connected to database...');
});

app.post('/', (req, res) => {
	res.render('index', { // Renders and shows the ejs index file
		'header': 'Numbers from a for loop:',
		'users': people,
		'account': createdAccounts
	});
});

app.post('/user/add', (req, res) => { // Notice how the route on the app.post and on the form action have to be the same
	var theSubmitedPerson = { // Here I create my own person object of the data submited in the form
		'firstName': req.body.first_name,
		'lastName': req.body.last_name,
		'email': req.body.email
	}

	// Checks whether there is an empty input
	req.checkBody('first_name', 'First Name is required').notEmpty();
	req.checkBody('last_name', 'Last Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();

	var errors = req.validationErrors();

	if (errors) { // Make it so that if there is an error it goes to main page but not main page with wring route
		res.render('index', { // Renders and shows the ejs index file
			'header': 'Numbers from a for loop:',
			'users': people,
			'errors': errors,
			'account': createdAccounts
		});
		console.log('An error occured...');
	}
	else { // You can use something like \ to seperate the lines and have rows instaed of one long row with everything inside
		res.send(req.body.first_name+'\'s family name is: '+req.body.last_name+'<br> <form method="POST" action="/"> <input type="submit" value="Go Back!"> </form>');
		
		if (createdAccounts.length === 0) {
			connection.query('INSERT INTO account (id, firstName, lastName, email) VALUES (NULL, "'+req.body.first_name+'", "'+req.body.last_name+'", "'+req.body.email+'")', function (error, result) {
				if (error) console.log(error);
				console.log('Account created!');
			});
		}
		else {
			// This stops users to create multiple accounts with the same email
			for (var i = 0; i < createdAccounts.length; i++) {
				if (createdAccounts[i].email != req.body.email) {
					connection.query('INSERT INTO account (id, firstName, lastName, email) VALUES (NULL, "'+req.body.first_name+'", "'+req.body.last_name+'", "'+req.body.email+'")', function (error, result) {
						if (error) console.log(error);
						console.log('Account created!');
					});
				}
			}

			console.log('Form Submited!');
		}
	}
});

// A call back function or an unames function is what we can see below, () => {} or the function () {}
app.listen(5532, () => {
	console.log('Listening on port 5532...');
});

// MAKE IT SO THAT YOU CAN CONNECT TO A DATABASE ADD USERS AND DELETE AS WELL AS EDIT THEM
// ALSO MAKE IT SO UPON RELOAD IT SHOWS ALL USERS OR SOMETHING
// HAVE ALERTS UPON THINGS YOU DO AS WELL AS A CONFIRMATION UPON DELETE OR EDIT (ARE YOU SURE YOU WANT TO...)
// FIX SO THAT EVERYTHING WORKS