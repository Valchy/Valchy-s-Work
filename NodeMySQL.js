// Differene between var and const is that the const is a variable that will and can't be changed
const express = require('express');
const mysql = require('mysql');

var theApp = express();
// The '=>' basically means function ()...
const http = require('http').Server(theApp).listen(8118, () => {
	console.log('Server is running on port 8118...');
});

// Creates connection to Database (db = database)
var db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'node_database'
});

// Connects to Database
db.connect(function (err) {
	// Returns true or false and goes into the 'if' if true
	if (err) {
		console.log('There was an error...');
		throw err;
	}

	console.log('MySQL connected');
});

// VERY IMPORTANT: the '/somethingRandom' creates a route
// Create Database (once created it doesn't create a new one)
theApp.get('/valeri', function (request, response) {
	let sql = 'CREATE DATABASE IF NOT EXISTS node_database';
	db.query(sql, function (err, result) {
		if (err) throw err;
		console.log(result);
		response.send('Database: true, everything is OK!');
	});
});

// Create Database table (once created, doesn't create again)
theApp.get('/table', function (req, res) {
	// Learn all possible sql commands (also neccessary to be capital?)
	let sql = 'CREATE TABLE IF NOT EXISTS message(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
	db.query(sql, function (err, result) {
		if (err) throw err;
		console.log(result);
		res.send('Database Table: created!');
	});
});

// Insert post one in table
theApp.get('/insert', function (req, res) {
	var message = {title: 'My first Message', body: 'Hello there, I am a body message'};
	let sql = 'INSERT INTO message SET ?'; // After the question mark is what going to be added
	let query = db.query(sql, message, function (err, result) {
		if (err) throw err;
		console.log(result);
		res.send('Message one: Added');
	});
});

// Console logs all existing messages from table in database
theApp.get('/show', function (req, res) {
	let sql = 'SELECT * FROM message'; // After the question mark is what going to be added
	let query = db.query(sql, function (err, results) {
		if (err) throw err;
		console.log(results);
		res.send('Messages: fetched');
	});
});

// Console logs specific message from table in database
theApp.get('/show/:id', function (req, res) {
	let sql = `SELECT * FROM message WHERE id = ${req.params.id}`; // After the question mark is what going to be added
	let query = db.query(sql, function (err, result) {
		if (err) throw err;
		console.log(result);
		console.log(req.params); // This will show all possible parameters of the request (url)
		res.send('Message: fetched');
	});
});

// Updates a message
theApp.get('/update/:id', function (req, res) {
    let newTitle = 'Updated Title';
    let sql = `UPDATE message SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Message: updated');
    });
});

// Deletes a message
theApp.get('/delete/:id', function (req, res) {
    let newTitle = 'Updated Title';
    let sql = `DELETE FROM message WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Message: deleted');
    });
});