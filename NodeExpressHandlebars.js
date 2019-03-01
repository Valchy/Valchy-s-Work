const express = require('express');
const path = require('path');
const expressHandlebars = require('express-handlebars');
var people = ['Valeri', 'Jhon', 'Sarah'];

var app = express();

// Handlebars middleware (configuration to make it work)
app.set('views', ''); // Sets views directory which is '' aka the same folder
app.engine('handlebars', expressHandlebars({ // Configures routes of the layouts etc.
	defaultLayout: 'main',
	layoutsDir:'',
	extname: '.handlebars'
}));
app.set('view engine', 'handlebars');

app.listen(6116, () => {
	console.log('Server running on port 6116...');
});

app.get('/', (req, res) => {
	res.render('main.handlebars', {
		content: 'This is come epic content',
		published: true,
		people
	});
});

app.get('/person/:name', (req, res) => {
	res.render('main.handlebars', {
		// Takes whatever value is after person/ANYVALUE which is the name value and it is then passed on into the template
		person: req.params.name
	});
});