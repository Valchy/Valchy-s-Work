window.onload = () => {
	let adventOptions = document.getElementsByClassName('advent-calendar-option');
	let timer = 0, imageCounter = 1, date = new Date();
	let jokes = [
		'What\'s the best thing about Switzerland? I don\'t know, but the flag is a big plus.',
		'Why don\'t scientists trust atoms? Because they make up everything.',
		'Why can\'t you explain puns to kleptomaniacs? They always take things literally.',
		'What did the left eye say to the right eye? Between you and me something smells.',
		'What did the shark say when he ate the clownfish? This tastes a little funny.'
	]; // Literally the worst jokes ever xD

	// Error handling - new user
	if (!window.localStorage.clickedDays) window.localStorage.clickedDays = JSON.stringify([]);

	// Finding the biggest number from an array - task #1
	document.getElementById('alert-task').addEventListener('click', () => {
		let numbers = [-5, -2, -6, 0, -1];
		window.alert('Out of the following numbers: [-5, -2, -6, 0, -1]\nThis is the biggest one: '+Math.max(...numbers));
	});

	// Adding event lister for advent calendar
	for (let i = 0; i < adventOptions.length; i++) {
		// Changing styles to already clicked advent calendar options
		if (JSON.parse(window.localStorage.clickedDays).includes(i)) {
			adventOptions[i].querySelector('span').style.textDecoration = 'solid line-through #000';
		}

		adventOptions[i].addEventListener('click', () => {
			let clickedDays = JSON.parse(window.localStorage.clickedDays);

			// If option isn't included add it
			if (date.getDate() >= adventOptions[i].getAttribute('day') && !clickedDays.includes(i)) {
				clickedDays.push(i);
				window.localStorage.clickedDays = JSON.stringify(clickedDays);
				adventOptions[i].querySelector('span').style.textDecoration = 'solid line-through #000';
				document.getElementById('joke-popup-joke').innerHTML = jokes[i].split('?').join('?<br>').split('!').join('!<br>').split('.').join('.<br>');
				document.getElementById('joke-popup').style.opacity = 1;
			} else if (date.getDate() >= adventOptions[i].getAttribute('day')) {
				document.getElementById('joke-popup-joke').innerHTML = jokes[i].split('?').join('?<br>').split('!').join('!<br>').split('.').join('.<br>');
				document.getElementById('joke-popup').style.opacity = 1;
			}
		});
	}

	// Joke button event listener
	document.getElementById('joke-btn').addEventListener('click', () => {
		fetch('http://api.icndb.com/jokes/random/')
		.then(response => response.json())
		.then(response => {
			document.getElementById('joke-popup-joke').innerHTML = response.value.joke.split('?').join('?<br>').split('!').join('!<br>').split('.').join('.<br>');
			document.getElementById('joke-popup').style.opacity = 1;
		});
	});

	// Main loop to show count down and change slideshow images
	setInterval(() => {
		let actualTime = new Date(Date.now());
		let adventCalendarStart = new Date(2019, 11, 16);
		let lanPartyStart = new Date(2019, 11, 20, 13, 30);
		let timeLeft = timeLeftFunc(lanPartyStart.getTime() - actualTime.getTime());

		// Updating time left to event start
		document.getElementById('days-left').innerHTML = timeLeft.days;
		document.getElementById('hours-left').innerHTML = timeLeft.hours;
		document.getElementById('minutes-left').innerHTML = timeLeft.minutes;
		document.getElementById('seconds-left').innerHTML = timeLeft.seconds;

		timer += 10; // Incrementing timer elapsed
		document.getElementById('progress-bar').style.width = (timer / 80)+'%'; // Changing progression %
		document.getElementById('loader').style.width = ((actualTime.getTime() - adventCalendarStart.getTime()) / (lanPartyStart.getTime() - adventCalendarStart.getTime()) * 100)+'%'; // Changing loader's %

		if (timer == 8000) {
			timer = 0; // Resetting timer

			// Incrementing image counter
			if (imageCounter == 3) imageCounter = 1;
			else imageCounter++;

			// Changing backgrund image
			document.getElementById('slideshow-wrapper').style.backgroundImage = 'url(imgs/stolen-img-lan-party-'+imageCounter+'.jpg)';
		}
	}, 10);

	document.getElementById('body').style.opacity = 1;
}

function timeLeftFunc(ms){
	days = Math.floor(ms / (24 * 60 * 60 * 1000));
	hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
	minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
	seconds = Math.floor((ms % (60 * 1000)) / (1000));

	// Returning time left in days, hours, minutes and seconds
	return {days, hours, minutes, seconds}
}