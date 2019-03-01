// function MyApp() {
// 	return (
// 		<div style={{fontWeight: '900'}}>
// 			<TodoItem item="Cleaned My Room" completed={false}/>
// 			<TodoItem item="Finished My Homework" completed={false}/>
// 			<TodoItem item="Took A Shower" completed={true}/>
// 		</div>
// 	);
// }

// The function above is exactly the same as this class except the class allows me to do more
class MyApp extends React.Component {
	constructor() {
		super();
		this.state = {
			items: [
				{
					text: 'Cleaned My Room',
					completed: false
				},
				{
					text: 'Finished My Homework',
					completed: false
				},
				{
					text: 'Took A Shower',
					completed: true
				}
			]
		}
	}

	myMethod() { // REMEMBER .map() doesn't work with this.state since thats an object and .map() needs an array
		const todos = this.state.items.map(thing => <TodoItem item={thing.text} completed={(thing.completed)}/>);
		return (
			<div style={{fontWeight: '900'}}>
				{todos}
			</div>
		);
	}

	render() {
		return (
			this.myMethod()
		);
	}
}

// same as the function below (in order to reach the props property use this.props)
class TodoItem extends React.Component {
	constructor() {
		super();
		this.state = {};
		this.checkIt = this.checkIt.bind(this);
	}

	checkIt() {
		if ((this.state.completed != undefined) ? this.state.completed : this.props.completed) {
			this.setState({completed: false});
		} else {
			this.setState({completed: true});
		}
	}

	render() {
		let spanStyle = {};
		if ((this.state.completed != undefined) ? this.state.completed : this.props.completed) {
			spanStyle.textDecoration = 'line-through';
			spanStyle.color = 'cdcdcd';
		}

		return (
			<React.Fragment>
				<input type="checkbox" onChange={this.checkIt} checked={(this.state.completed != undefined) ? this.state.completed : this.props.completed}/> <span style={spanStyle}> {this.props.item} </span> <br/>
			</React.Fragment>
		);
	}
}

// function TodoItem(props) {
// 	let spanStyle = {};
// 	if (props.completed) spanStyle.textDecoration = 'line-through';

// 	return (
// 		<React.Fragment>
// 			<input type="checkbox" checked={props.completed}/> <span style={spanStyle}> {props.item} </span> <br/>
// 		</React.Fragment>
// 	);
// }

class Login extends React.Component {
	// If I would miss spell 'constructor' it doesn't work and it becomes a method
	constructor() {
		super();
		this.state = {
			logged: true
		}
	}

	render() {
		return (
			<div>
				<h1>You are currently logged {this.state.logged ? 'in!' : 'out!'} </h1>
			</div>
		);
	}
}