// My Node Modules
const express = require('express');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');
const path = require('path');

// App and Server setup
var app = express();
var server = app.listen(5888, () => {
	console.log('Server Up and Running on port 5888!');
});

// Chosen urls to make requests to
var url = 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350';
request(url, (error, response, body) => {
	if (error) {
		console.log('Error: '+error);
	} else {
		// just too much things in console for no reason
		// console.log('Body: '+body);
	}
});

// Destination (where I want the thing to save) 
var destination = fs.createWriteStream('./myDownloadedCatPic.jpg');
request(url).pipe(destination).on('finish', finish).on('error', error);
destination.on('finish', finish); // Different way to the same thing as above

// My Functions
function finish () {
	console.log('Yay, cat pic was downloaded!');
}

function error () {
	console.log('Oh no, an error occured!');
}

// Example of using request to get API JSON data
var apiJSON = '';
request('http://www.json-generator.com/api/json/get/ceZCeIigwO?indent=2', function (error, response, body) {
	apiJSON = response.body;
});

// Routes
app.get('/', function (req, res) {
	res.send(apiJSON);
});

// Getting specific data of a sites HTML
request('https://www.producthunt.com/', function (error, response, body) { // Body is pretty much the html page (with all elements etc)
	var $ = cheerio.load(body); // Initializing cheerio to work
	var frontPage = $('div .white_09016, .border_64d93, .margin_1b96e');
	var children = frontPage.children();
	console.log(children.length);
	for (var i = 0; i < frontPage.length; i++) {
		var attr = frontPage[i].attribs;
		//console.log(attr);
	}
});