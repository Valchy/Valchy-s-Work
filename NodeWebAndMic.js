// My Needed Node Modules
const express = require('express');
const path = require('path');
const socket = require('socket.io');
const fs = require('fs');

// Creating app object
var app = express();

// Creating Server
var server = app.listen(4222, () => {
	console.log('Server running on port 4222...');
});

// Connecting the socket server to the localhost
var socketIo = socket(server);

// Setting up socket io connection with client
socketIo.on('connection', (theSocket) => {
	// Piping & Streams & Buffers
	var myReadStream = fs.createReadStream(__dirname+'/randomText.txt', 'utf-8'); // Gives 2 buffers
	var myWriteStram = fs.createWriteStream(__dirname+'/writtenTetx.txt');

	// Event listener (listening to the on 'data' event)
	myReadStream.on('data', function (chunk) {
		theSocket.emit('text', chunk);

		// The benefit if this is that we can save the data without having to wait for all of it to load
		myWriteStram.write(chunk);
	});

	// The entire on data function above is the same as this line of code using pipe method
	myReadStream.pipe(myWriteStram);
});

// Setting up default route
app.get('/', (request, response) => {
	response.sendFile(__dirname+'/NodeWebAndMic.html');
});