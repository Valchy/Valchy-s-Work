// Requires http library aka module (which allows the server to use: Hyper Text Transfer Protocol (HTTP))
var http = require('http'); // More info at: https://www.w3schools.com/nodejs/ref_modules.asp
var events = require('events'); // Allows the use of events
var theEvent = new events.EventEmitter(); // Creates event emitter
var fs = require('fs'); // This is so I can use system file methods
var anyVar = require('./customNodeModule'); // In order to include custom module (notice how the there is a ./ it makes node know the file is in the same folder)
var url = require('url');
var express = require('express');
var app = express();
var httpApp = require('http').Server(app).listen(1888);
var upload = require('express-fileupload');
app.use(upload());
var adress = 'https://api.darksky.net/forecast/40ed7206c490196fa2056dccb448bfc0/12.33,23.55?lang=bg&exclude=hourly,daily&units=si';
var result = url.parse(adress, true);
console.log(result.query);

// The '/' stands for the default route
app.get('/', function (req, res) {
	// This opens a file in the same directory (__dirname is a default method)
	res.sendFile(__dirname+'/HelloNodeForm.html'); // Send file is the method with which the response sends back a file to the client
});
app.post('/', function (req, res) {
	if (req.files) {
		var file = req.files.filename,
			filename = file.name;
		// Notice the ./FOLDERNAME/ and the backslash again at the end
		file.mv('./NodeJSUploadFolder/'+filename, function (err) {
			if (err) {
				console.log(err);
				res.send('Error occured');
			}
			else {
				console.log('Successful Upload!');
				res.send('Done!');
			}
		});
	}
});

// Creates event Handler
var theEventFunction = function () {
	console.log('An event was fired!');
}

// Assign event handler to actual event
theEvent.on('RandomName', theEventFunction);

// Fire the 'RandomName' event
theEvent.emit('RandomName');

// This creates a localhost server :D
http.createServer(function (request, response) { // The parameters names don't matter but the order does, first one is always the request and second one always the response
	// the: , {'Content-Type': 'text/html'} makes the text from all javascript be default to HTML :D
	response.writeHead(200, {'Content-Type': 'text/html'}); // 200 is the status code which. 200 means 'OK' in other words no probelm (e.g status code could be 404 - Not found)
	response.write('Hello, my name is Valeri and this is my first node.js server! <br>' + anyVar.customModule() + '<br>'); // Responses body writes a message to client
	response.write('The request url: '+request.url); // If you write a '/somethingTotalyRandom' it will display aka displays the url after the port
	response.end(); // Ends the server response
}).listen(1288); // Makes the server listen to a specific port

// Localhost server two, on a different port (1331)
http.createServer(function (req, res) {
	// Instead of .readFile you can also use .appendFile(), .writeFile(), .open(), .unlink() or .rename() [fs.method('File_name', 'theChange', function (err) {})]
	fs.readFile('WindsurfApp.html', function(err, data) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data); // Loads only html...
		res.end();
	});
}).listen(1331);

// Console message is gets shown only if or when the server is created
console.log('Server running on Port 1288 & 1331 & 1888...');