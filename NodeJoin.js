var coords = [{lat: 13.454, lng: 10.345}, {lat: 45.129, lng: 56.324}, {lat: 57.528, lng: 12.998}, {lat: 34.519, lng: 32.564}, {lat: 25.565, lng: 35.532}];
const mysql = require('mysql');
const http = require('http');
const https = require('https');
var information = 'Loading, please wait...';
var queryCounter = 0;

http.createServer(function (request, response) {
	response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
	response.write(information);
	response.end();
}).listen(4321);

var connection = mysql.createConnection({ // needed parameters: host, user, pass, database
	host: 'localhost',
	user: 'root',
	pass: '',
	database: 'tableone'
});

for (var i = 0; i < coords.length; i++) {
	https.get('https://api.darksky.net/forecast/40ed7206c490196fa2056dccb448bfc0/'+coords[i].lat+','+coords[i].lng+'?lang=bg&exclude=hourly,daily&units=si', (response) => {  
	var data = '';

	// A chunk of data has been recieved.
	response.on('data', (chunk) => {
		data += chunk; // += is because there is a chance that the response is slip into different parts
	});

	// The whole response has been received. Print out the result.
	response.on('end', () => {
		var tempCoords = coords[i].lat+coords[i].lng;
		var theData = JSON.parse(data);
		connection.query('INSERT INTO windspeed (id, windspeed, winddirection) VALUES ("'+tempCoords+'", "'+theData.currently.windSpeed+'", "'+theData.currently.windGust+'")', (error, result) => {
		});
	});

	}).on('error', (err) => {
		console.log("Error: " + err.message);
	});
}

connection.connect((error) => {
var queries = ['CREATE TABLE IF NOT EXISTS windspeed (id VARCHAR(255), windspeed VARCHAR(255), winddirection VARCHAR(255), PRIMARY KEY (id))', 'CREATE TABLE IF NOT EXISTS location (id VARCHAR(255), location VARCHAR(255), PRIMARY KEY (id))',];
var counter = 0;

	if (error) console.log(error);
	else {
		for (var i = 0; i < queries.length; i++) {
			connection.query(queries[i], (error, result) => {
				if (error) console.log(error);
				counter = counter + 1;
				if (counter >= queries.length) {
					console.log('Databases created!');
				}
			});
		}
	}
});

function theJoin () {

	connection.end();
}

console.log('Server listening on port 4321...')