class APICall extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	componentDidMount() {
		// Maybe a little more explenation how this works, practise it
		fetch('https://swapi.co/api/people/1')
		.then((response) => response.json())
		.then((data) => this.setState({character: data}))
		.then(() => console.log(this.state));
	}

	render() {
		console.log();
		return (
			<span> Hi there... {this.state.character != undefined && this.state.character.name} </span>
		);
	}
}