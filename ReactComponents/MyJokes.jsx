const jokesData = [
	{
		"id": 205,
		"question": "Funny Joke",
		"punchline": "Answer #1"
	},
	{
		"id": 394,
		"question": "'Let the Bodies Hit the Floor'",
		"punchline": "was originally written as Chuck Norris' theme song."
	},
	{
		"id": 362,
		"question": "ValchyGaming",
		"punchline": "Period"
	},
	{
		"id": 365,
		"question": "Chuck Norris has never won an Academy Award for acting...",
		"punchline": "because he's not acting."
	},
	{
		"id": 138,
		"punchline": "Chuck Norris can slam a revolving door."
	}
];
let theCheck = false;

function MyJokes() {
	// Filtering Jokes
	const filterJokes = jokesData.filter(function(joke) {
		if (joke.question && joke.question.length > 20) {
			return joke.question;
		}
	});

	// this saves me from writing <Joke hardCodeAttr=""/> multiple times
	const jokeComponents = filterJokes.map(joke => <Joke key={joke.id} question={joke.question} punchline={joke.punchline}/>);
	// jokeComponets becomes a new object with data and tags

	return ( // Notice how I put an object and it automatically shows all of them (no need of a loop)
		<React.Fragment>
			<h3> Only Filtered Jokes Showed </h3>
			{jokeComponents}
		</React.Fragment>
	);
}

function Joke(props) {
	let divStyles = {
		display: 'inline-block',
		margin: '10px 30px'
	}

	if (theCheck) {
		theCheck = false;
		return (
			<React.Fragment>
				<div style={divStyles}>
					<center> {props.question} </center> <br/>
					<img src="https://i.imgflip.com/qiev6.jpg" style={{alignSelf: 'flex-end'}} width="100" height="50"/> <br/>
					<center> {props.punchline} </center>
				</div>
				<br/>
			</React.Fragment>
		);
	} else {
		theCheck = true;
		return (
			<div style={divStyles}>
				<center> {props.question} </center> <br/>
				<img src="https://i.imgflip.com/qiev6.jpg" style={{alignSelf: 'flex-end'}} width="100" height="50"/> <br/>
				<center> {props.punchline} </center>
			</div>
		);
	}
}