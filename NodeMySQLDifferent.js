const mysql = require('mysql');
const express = require('express');
const app = express();
const http = require('http').Server(app).listen(4112);
var theDB = 'randomNodeDatabase';
var dbData = [{name: 'Valeri', address: 'Varna, Bulgaria'}, {name: 'Arham', address: 'Islamabad, Pakistan'}, {name: 'Max', address: 'Vienna, Austria'}, {name: 'Hussain', address: 'Doha, Qatar'}, {name: 'Giovanni', address: 'Rome, Italy'}, {name: 'Connor', address: 'Vienna, Austria'}, {name: 'Jeremiah', address: 'Manila, Philippines'}, {name: 'Dodo', address: 'Varna, Bulgaria'}, {name: 'Dimitri', address: 'Moscow, Russia'}, {name: 'Luis', address: 'Berlin, Germany'}];

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	pass: '',
	database: theDB
});

connection.connect(function (error) {
	if (error) console.log(error);
	else {
		console.log('Connected...');
		// The IF NOT EXISTS is so that if the application gets restarted and a database is already created an error doesn't occur
		connection.query('CREATE DATABASE IF NOT EXISTS randomNodeDatabase', function (error, result) {
			if (error) console.log(error);
			console.log('Database created!');
			theDB = 'randomNodeDatabase';
			// Everything else works only if this connection is okay
			theCreation();
		});
	}
});

function theCreation () {
var sql = '';

	// Creates tables and later inserts data into it
	sql = 'CREATE TABLE IF NOT EXISTS customers (id int AUTO_INCREMENT, name VARCHAR(255), address VARCHAR(255), PRIMARY KEY (id))';
	// The connection to the database + .query is a default method with parameters ('SQL METHOD', function () {})
	connection.query(sql, (error, result) => { // => is same as function (error, result) {} just shorter
		if (error) console.log(error);
		console.log('Table created!');
	});

	for (var i = 0; i < dbData.length; i++) {
		connection.query('INSERT INTO customers (id, name, address) VALUES (NULL, "'+dbData[i].name+'", "'+dbData[i].address+'")', (error, result) => {
			if (error) console.log(error);
			// result.affectedRows returns number of rows added to database from the insert
			console.log('Data inserted: ' + result.affectedRows);
		});
	}

	// Creates a form with button on server port 4112
	app.get('/', function (request, response) { // The '/' is the default route (no route changes required)
		response.send('<form action="/" method="post" enctype="multipart/form-data"> <button type="submit"> Click Me </button> </form>');
	});

	// Does a lot of fancy stuff after the button click
	app.post('/', function (request, response) {
		// Selects all data from table and adds it in results
		connection.query("SELECT * FROM customers", function (error, results) {
			if (error) throw error; // Similar method to console.log(error)
			response.json(results); // I use .json() instead of .send so I can actually get into the JSON data eg. results[0].address
		});

		// // Finds a specifc data match (eg. first user with id 1)
	 //  	connection.query("SELECT * FROM customers WHERE id = '1'", function (err, result) {
	 //    if (err) throw err;
	 //    console.log(result);
	 //  	});


	 //  	// Sorts the db data (could also be name DESC not just name when name is any variable can also be pass for example)
	 //  	connection.query("SELECT * FROM customers ORDER BY name", function (err, result) {
	 //    if (err) throw err;
	 //    console.log(result);
	 //  });

	 //  	// the limit method is so u select specifci data (the 2 is for where the data starts from and the 5 is for how many users it will return [this eg returns 3,4,5,6,7])
	 //  	sql = "SELECT * FROM customers LIMIT 2, 5";
	 //  connection.query(sql, function (err, result) {
	 //    if (err) throw err;
	 //    console.log(result);
	 //  });


	 //  	// Deletes db data
	 //  	sql = "DELETE * FROM customers";
	 //  connection.query(sql, function (err, result) {
	 //    if (err) throw err;
	 //    console.log("Number of records deleted: " + result.affectedRows);
	 //  });

	 // Makes table ready for reuse (faster delete method)
	 // connection.query("TRUNCATE TABLE customers", function (error, results) {
		// 	if (error) throw error;
		// 	console.log('Table ready for use')
		// });

	 //  // Updates informatio in tables
	 //  sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Varna, Bulgaria'";
	 //  connection.query(sql, function (err, result) {
	 //    if (err) throw err;
	 //    console.log(result.affectedRows + " record(s) updated");
	 //  });

	 //  // Deletes table only if exits
	 //  sql = "DROP TABLE IF EXISTS customers";
	 //  connection.query(sql, function (err, result) {
	 //    if (err) throw err;
	 //    console.log(result);
	 //  });

		console.log('All tables were updated and then deleted...');
	});
}

console.log('Server started on port 4112...'); // try and fix console.log('Server started on port ' + app.get('port') + '...');
// Make a custom json url with which you get data to make 3-5 users in the table after that
// show them, update them, delete and all possible options