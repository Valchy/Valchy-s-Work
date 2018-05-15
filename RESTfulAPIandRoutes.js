// Neccessary Node Modules
const express = require('express');
const fs = require('fs');

// My JSON data ;D
var theJsonData = fs.readFileSync('JsonApi.json');
var jsonObject = JSON.parse(theJsonData);
console.log(jsonObject);

// I initialise that the default index.html should have a different name (not 'index' but whatever)
var options = {
	index: 'RESTfulAPIandRoutes.html'
};

// Creates the server and makes it listen to port 3000
var app = express();
var server = app.listen(3000, function () {
	console.log('Listening on port 3000!...');
});

// View Template Engine (middleware)
app.engine('html', require('ejs').renderFile); // This allows me to have the render() method open a .html file instead of an .ejs while still being able to template in the file (use <%= someVar %>)
app.set('view engine', 'html'); // Sets ejs as the method of using templated JavaScript if that makes sence xD
app.set('views', ''); // Sets views folder path to be the one this file is in

// This makes the home page '/' be the specific file (currently not using this since I have a app.use('/' function(){}))...
// app.use(express.static('C:/Users/Valeri/Desktop/HTML + JavaScript', options));

// This handles the get request to the home / main page (the '/')
app.get('/', function (request, response) {
	response.render(options.index, {
		homePage: true
	});
});

// Allows users to add data into the database
app.get('/add/:param/:value', function (request, response) {
	var data = request.params;
	// very interesting method of adding values into an object
	jsonObject[data.param] = data.value;
	response.render(options.index, {
		homePage: false
	});
});

app.get('/search/:flowerName?', function (request, response) { // :something? question mark at the end means it is optional
	var data = request.params; // This grabs all :something values and places them into an object
	if (!data.flowerName) { // Checks if data.flowerName is empty !... is the same as === ''
		response.send('You did not choose a flower'); // Simple response send method to send back something to the client
	} else {
		response.send('You chose the flower '+data.flowerName); // data.flowerName grabs the value from the object under flowerName	
	}
});

app.get('/searchfor/:param', function (request, response) {
	var paramData = request.params;

	if (jsonObject[paramData.param] && paramData.param != 'bio') {
		response.send(paramData.param+' was found...');
	} else if (paramData.param === 'bio') {
		// jsonObject.bio(); // Calling a function from a JavaScript object
		global[jsonObject.bio]();
		response.send('bio function was executed...;)');
	} else {
		response.send(paramData.param+' was not found...');
	}
});

// Fetches the post from the form and sends a response via a call back function
app.post('/searchfor/all', sendAll); // sendAll is a callback function in this example

function sendAll (request, response) {
	response.send(jsonObject);
}

// USE MYSQL INJECTION TO PROTECT DATABASE WITH DATA FOR API ETC