// My Node Modules
const express = require('express');
const fs = require('fs');
const cheerio = require('cheerio'); // jquery but for node js
const request = require('request');
const path = require('path');
const requestPromise = require('request-promise'); // helps with ajax request to other sites
const table = require('cli-table'); // helps me construct table in console

var userData = [];
var theTable = new table({
	head: ['username', 'likes', 'chanllenges'],
	colWidths: [15, 15, 15]
})

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
		// console.log('Body: '+body); // just too much things in console for no reason
	}
});

// Destination (where I want the thing to save) 
var destination = fs.createWriteStream('./myDownloadedCatPic.jpg');
request(url).pipe(destination).on('finish', finishFunc).on('error', error);
destination.on('finish', finishFunc); // Different way to the same thing as above

// My Functions
function finishFunc () {
	console.log('Yay, cat pic was downloaded!');
}

function error () {
	console.log('Oh no, an error occured!');
}

// Example of using request to get API JSON data
var apiJSON = '';
request('http://www.json-generator.com/api/json/get/ceZCeIigwO?indent=2', function (error, response, body) { // Response is what the server gives back e.g api call
	apiJSON = response.body;
});

// Routes
app.get('/', function (req, res) {
	res.send(apiJSON);
});

app.get('/freecodecampscrape', (req, res) => {
	res.send('Everything is inside the terminal as a log');
	const options = { // try using ''
		url: `https://forum.freecodecamp.org/directory_items?period=weekly&order=likes_received&_=1537717838689`,
		json: true
	};

	requestPromise(options)
		.then((data) => {
			for (var user of data.directory_items) {
				userData.push({name: user.user.username, likes: user.likes_received});
			}

			process.stdout.write('loading \n'); // Its like console log but doesnt put the message on a new line everytime
			getChallangedCompletedAndPushToUserArray();
		})
		.catch((err) => {
			if (err) {
				console.log(err);
			}
		});
});

function getChallangedCompletedAndPushToUserArray () {
	for (i = 0; i < userData.length; i++) {
		var diffOptions = {
			url: `https://www.freecodecamp.org/`+userData[i].name,
			transform: body => cheerio.load(body)
		}

		requestPromise(diffOptions)
			.then(function ($) {
				process.stdout.write(`.`);
				const fccAccount = $('h1.landing-heading').length == 0;
				const challangePassed = fccAccount ? $('tbody tr').length : 'unknown';
				theTable.push([userData[i].name, userData[i].likes, challangePassed]);
			});
	}

	console.log(theTable.toString());
}

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