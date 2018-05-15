const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');
const ejs = require('ejs');
const path = require('path');

var app = express();
var server = app.listen(2666, () => {
	console.log('Server running on port 2666');
});

// EJS Middleware
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', '');

// Bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (request, response) => {
	response.render('JavaScriptThings.html', {
		homePage: true,
		result: '',
		defaultValue: '#858685'
	});
});

app.post('/submited', (request, response) => {
	var theResult = getColor(request.body.theColor);
	response.render('JavaScriptThings.html', {
		homePage: false,
		result: theResult,
		defaultValue: request.body.theColor
	});
});

function getColor (color) {
	var tmpColor = color.slice(1);
	tmpColor = '0x'+tmpColor;

	var noBlue = tmpColor >> 8;
	var green = noBlue & 255;
	console.log("GREEN: ", green);

	var noBlueGreen = tmpColor >> 16;
	var red = noBlueGreen & 255;
	console.log("RED: ", red);

	var blue = tmpColor & 255;
	console.log("BLUE: ", blue);

	return tmpColor;
}

function getHTML () {
	var source = "<h1> {{title}} </h1> <br> <span> {{color}} </span>";
	var template = handlebars.compile(source);
 
	var data = {title: 'Hello World', color};
	var result = template(data);
}