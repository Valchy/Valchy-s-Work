class ConRendering extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoading: true,
			msg: []
		};
	}

	componentDidMount() {
		// The timeout is meant to be like an api call (having to wait for data essentially)
		setTimeout(() => {
			this.setState({
				isLoading: false
			})
		}, 1500);
	}

	render() {
		// Try to make it so when renering conditional it really just renders what it needs to while the logic still stays inside the parent
		return (
			<div>
				{this.state.isLoading ? <h1> loading... pleaase wait! </h1> : <Conditional/>}
				{this.state.msg.length > 0 && <span> You have {this.state.msg.length} unread messages </span>}
				{this.state.msg.length > 0 || <span> You dont have any {this.state.msg.length} unread messages </span>}
			</div>
		);
	}
}

function Conditional(props) {
	return (
		<div>
			<h1> Loaded! </h1>
		</div>
	);
}