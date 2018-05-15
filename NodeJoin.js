var coords = [{lat: 13.454, lng: 10.345}, {lat: 45.129, lng: 56.324}, {lat: 57.528, lng: 12.998}, {lat: 34.519, lng: 32.564}, {lat: 25.565, lng: 35.532}];
var addresses = ['Zinder Region, Niger', 'Beyneu District, Kazakhstan', 'Sexdrega, Sweden', 'Cyprus, Greece', 'Marsa Alam, Egypt'];
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app).listen(4321);
const https = require('https');
var information = 'Loading, please wait...';
var queryCounter = 0,
	dataCounter = -1,
	dataCounterTwo = -1,
	tfWindspeed = false,
	tfLocation = false,
	chosenCriteriaObject = [],
	chosenSearchCriteria = '';

var connection = mysql.createConnection({ // needed parameters: host, user, pass, database
	host: 'localhost',
	user: 'root',
	pass: '',
	database: 'thejoin'
});

// View Template Engine
app.set('view engine', 'ejs'); // Sets ejs as the method of using templated JavaScript if that makes sence xD
app.set('views', '');

// EXTRA NOTE: Images may not show, fix: have full url to the image
// This is just a simpler and a better way to display a HTML, CSS and JS files on my server
app.use(express.static('C:/Users/Valeri/Desktop/HTML + JavaScript')); // Notice that I am expressing a static and then folder (always opens the index)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/chosenAnimal', function (request, response) { // Very important the order of everything, notice how this is the last thing (the route)
	// I made it work by having request.body.chosenAnimal instead of just request.chosenAnimal
	response.send('Animal: ' + request.body.chosenAnimal);
});

// Try having one post function with some if statement
app.post('/chosenCriteria', function (request, response) { // Very important the order of everything, notice how this is the last thing (the route)
	if (request.body.searchCriteria === 'Address' || request.body.searchCriteria === 'Coordinates') {
		chosenSearchCriteria = 'location';
	}
	else if (request.body.searchCriteria === 'Windspeed' || request.body.searchCriteria === 'Wind Direction') {
		chosenSearchCriteria = 'windspeed';
	}

	connection.query('SELECT * FROM '+chosenSearchCriteria, (error, results) => {
		if (error) console.log(error);

		chosenCriteriaObject = [];
		if (request.body.searchCriteria === 'Address') {
			for (var i = 0; i < results.length; i++) {
				chosenCriteriaObject.push(results[i].address);
			}
		}
		else if (request.body.searchCriteria === 'Coordinates') {
			for (var i = 0; i < results.length; i++) {
				chosenCriteriaObject.push(results[i].id);
			}
		}
		else if (request.body.searchCriteria === 'Windspeed') {
			for (var i = 0; i < results.length; i++) {
				chosenCriteriaObject.push(results[i].windspeed);
			}
		}
		else if (request.body.searchCriteria === 'Wind Direction') {
			for (var i = 0; i < results.length; i++) {
				chosenCriteriaObject.push(results[i].winddirection);
			}
		}
		
		response.render('Select.ejs', {
			'data': chosenCriteriaObject
		});
	});
});

var queries = ['CREATE TABLE IF NOT EXISTS windspeed (id VARCHAR(255), windspeed VARCHAR(255), winddirection VARCHAR(255), PRIMARY KEY (id))', 'CREATE TABLE IF NOT EXISTS location (id VARCHAR(255), address VARCHAR(255), PRIMARY KEY (id))',];
var counter = 0;

for (var i = 0; i < queries.length; i++) {
	connection.query(queries[i], (error, result) => {
		if (error) console.log(error);
		counter = counter + 1;
		if (counter >= queries.length) {
			console.log('Databases created!');
		}
	});
}

connection.query('TRUNCATE TABLE windspeed', (error, results) => {
	if (error) console.log('Truncate error: '+error);
	else {
		var tempCounter = -1;

		for (var i = 0; i < coords.length; i++) {
			https.get('https://api.darksky.net/forecast/40ed7206c490196fa2056dccb448bfc0/'+coords[i].lat+','+coords[i].lng+'?lang=bg&exclude=hourly,daily&units=si', (response) => {  
			var data = '';

			// A chunk of data has been recieved.
			response.on('data', (chunk) => {
				data += chunk; // += is because there is a chance that the response is slip into different parts
			});

			response.on('end', () => {
				dataCounter++;
				var theData = JSON.parse(data);
				connection.query('INSERT INTO windspeed (id, windspeed, winddirection) VALUES ("Lat: '+coords[dataCounter].lat+' | Lng: '+coords[dataCounter].lng+'", "'+theData.currently.windSpeed+'", "'+theData.currently.windGust+'")', (error, result) => {
					if (error) console.log(error);
					tempCounter++;
					console.log('Data for: '+coords[tempCounter].lat+' || Lng: '+coords[tempCounter].lng+' inserted...');
					if (tempCounter === addresses.length-1) {
						tfWindspeed = true;
						theJoin(tfWindspeed, tfLocation);
					}
				});
			});

			}).on('error', (err) => {
				console.log("Error: " + err.message);
			});
		}
	}
});

connection.query('TRUNCATE TABLE location', (error, results) => {
	if (error) console.log('Truncate error: '+error);
	else {
		var tempCounterTwo = -1;

		for (var i = 0; i < addresses.length; i++) {
			dataCounterTwo++;
			connection.query('INSERT INTO location (id, address) VALUE ("Lat: '+coords[dataCounterTwo].lat+' | Lng: '+coords[dataCounterTwo].lng+'", "'+addresses[dataCounterTwo]+'")', (error, results) => {
			if (error) console.log(error);
				tempCounterTwo++;
				console.log('Data for: '+coords[tempCounterTwo].lat+' | Lng: '+coords[tempCounterTwo].lng+' inserted...');
				if (tempCounterTwo === addresses.length-1) {
					tfLocation = true;
					theJoin(tfWindspeed, tfLocation);
				}
			});
		}
	}
});

function theJoin (windspeed, location) {
	if (windspeed && location) { // Ще ми трябва малко помощ тук
		// Try out different joins (eg left join, inner join and so on)
		connection.query('SELECT windspeed.windspeed AS windspeed, location.address AS address FROM windspeed JOIN location ON windspeed.id = location.id', (error, results) => {
			if (error) console.log('In join function error: '+error);
			console.log(results);
			connection.query('ALTER TABLE windspeed ADD FOREIGN KEY (id) REFERENCES location(id)', (error, results) => {
				if (error) console.log(error);
			});
		});
	}
}

console.log('Server listening on port 4321...');
// Expand this by having both selects some how mixed together into one big select