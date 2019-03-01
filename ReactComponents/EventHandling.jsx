class EventHandling extends React.Component {
	constructor() {
		super();
		this.state = {
			width: 350,
			height: 200
		}
	}

	render() {
		return (
			<div>
				<img onMouseOver={() => {console.log('Over!');}} width={this.state.width} height={this.state.height} src="https://news.nationalgeographic.com/content/dam/news/2018/05/17/you-can-train-your-cat/02-cat-training-NationalGeographic_1484324.ngsversion.1526587209178.adapt.1900.1.jpg"/>
				<br/> <button onClick={myFunction}> Click Me </button>
			</div>
		);
	}
}

function myFunction() {
	console.log('My first event!');
}

class Button extends React.Component {
	constructor() {
		super();
		this.state = {
			count: 0
		}

		// Binding my method (allows me to use this.state)
		this.increment = this.increment.bind(this);
	}

	increment() {
		// This is one way fo doing this
		// let tmpCount = this.state.count;
		// tmpCount++;
		// this.setState({
		// 	count: tmpCount
		// });

		// Second method - this.state() can also have a function that returns an obj
		this.setState((prevState) => {
			return {
				count: ++prevState.count
			}
		});
	}

	render() {
		return (
			<React.Fragment>
				<span> {this.state.count} </span> <br/>
				<button onClick={this.increment}> Add </button>
			</React.Fragment>
		);
	}
}