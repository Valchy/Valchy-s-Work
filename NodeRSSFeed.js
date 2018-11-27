// Това е много по-добър и ефикасен начин да се взима информация от друг сайт от колкото web-scraping
// Web-scraping трябва да се използва само в критически ситуации където няма друг начин да се вземе информацията
// Required modules
const express = require('express');
const rssParser = require('rss-parser');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
const request = require('request');
const socket = require('socket.io');
const fs = require('fs');

// Setting up express & rssParser
var app = express();
var theParser = new rssParser();

// Global Variables
var data = [], topics = [];

// Setting up the server
var server = app.listen(2987, () => {
	var randomExampleArray = ['Server up and running on port 2987', '..', '.', '\n'];
	for (let i of randomExampleArray) { // in & of work with: arrays, objects and strings
		// Prints out text on the same line (not like console log - new line)
		process.stdout.write(i);
	}
});

// Socket setup
var ioServer = socket(server); // I need to pass the server as a parameter

// Body Parser Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));

// Handlebars middleware
app.set('views', ''); // Sets views directory which is '' aka the same folder
app.engine('handlebars', handlebars({ // Configures routes of the layouts etc.
	defaultLayout: 'NodeRSSFeed',
	layoutsDir:'',
	extname: '.handlebars'
}));
app.set('view engine', 'handlebars');

// This listens to any connections made and then fires a callback function
ioServer.on('connection', function (theSocket) { // theSocket has all the information about the socket made between the specific client and the server
	// This sends data to connected client
	(async () => {
		try {
			await getData('undefined'); // Gets data
			theSocket.emit('madeConnection', data, topics);
		} catch (error) {
			console.log('Cought error: '+error);
		}
	})();

	// (later on you can add error handling for offline connections etc)

	theSocket.on('newData', function (theCategory) {
		(async () => {
			try {
				await getData(theCategory); // Gets data
				theSocket.emit('madeConnection', data, null);
			} catch (error) {
				console.log('Cought error: '+error);
			}
		})();
	});
});

// Handling requests
app.get('/', (req, res) => {
	res.render('NodeRSSFeed.handlebars');
});

// Getting data using RSS
async function getData (cat) { // Here we craete a syncronouse function (waits for each piece of code)
	var feed = await theParser.parseURL('https://www.producthunt.com/feed?category='+cat); // Awaits makes feed become the promise (retuned value)
	var info = [], links = [];

	// Getting all product hunt categories
	await request('https://www.producthunt.com/topics', function (error, response, body) {
		if (error) { // Error handling
			return reject('Error: '+error);
		} else {
			// Getting product categories into array
			var $ = cheerio.load(body);
			topics = [];
			$('.item_a4926 a.info_8be9f').each(function (index, element) {
				var tmpCat = $(this).attr('href');
				var cat = tmpCat.split('/topics/');
				topics.push(cat[1]);
			});
		}
	});

	for (let x in feed.items) {
		// Creating temporarrly object and then pushing it into an array
		var obj = {img: '', title: feed.items[x].title, author: feed.items[x].author, published: feed.items[x].pubDate, link: feed.items[x].link};
		links.push(obj.link);
		info.push(obj);
	}

	// Getting img links data
	var res = await getImageLink(links);
	for (let y in res) {
		info[res[y].id].img = res[y].link;
	}

	// Placing final data into data array
	data = JSON.stringify(info);
};

// Getting link data
function getImageLink (urls) {
	var finalLinks = [];
	return new Promise(function (resolve, reject) {
		for (let x in urls) {
			request(urls[x], function (error, response, body) {
				if (error) { // Error handling
					return reject('Error: '+error);
				} else {
					// Getting img links for each product
					var $ = cheerio.load(body);
					var newLink = $('div.thumbnail_f9ee1 img').attr('src');
					console.log(newLink);
					finalLinks.push({link: newLink, id: x});

					// Checks when to exit the function
					if (finalLinks.length == urls.length) {
						console.log(newLink);
						resolve(finalLinks);
					}
				}
			});
		}
	});
}