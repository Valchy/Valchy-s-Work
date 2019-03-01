class Lifecycle extends React.Component {
	/*Lifecycle Hooks (showing what gets called in order):
	1. Mount =>
		a) constructor - we specify things life super() and state in here
		b) render - what gets rendered
		c) componentDidMount - code executed after the render function finishes

	2. Update =>
		a) render - the component gets rerendered new html etc
		b) componentDidUpdate - executes code after the component has updated

	3. Unmount =>
		a) componentWillUnmount - executes code before the component gets removed*/

	constructor() {
		super();
		this.state = {};
	}

	// The three lifecycle methods
	componentDidMount() {
		// GET the data I need to corectly display
		// fires after the component has been made e.g when data loads
	}

	shouldComponentUpdate(prevProps, prevState) {
		// return true if you want to update
		// return false if you dont want to
	}

	componentWillUnmount() {
		// teardown or cleanup your code before your component disappears
		// E.g remove event listener (if you made one in componentDidMount())
	}

	//Methods in replace of the ones being deleted
	static getDerivedStateFromProps(props, state) {
		// return the new updated state based upon the propbs
		// React team discureges people from using this since it causes wierd bugs most of the times
	}

	getSnapshopBeforeUpdate() {
		// create a backup of the current way things are
	}

	// The methods below are getting removed (instead of will its did)
	// componentWillRecieveProps(nextProps) { // dont learn it
	// 	if (nextProps.whatever !== this.props.whatever) {
	// 		// do something important here
	// 	}
	// }

	// componentWillMount() {
	// 	//no need to learn it
	// }

	// componentWillUpdate() {
	// 	// no need to learn it
	// }

	render() {
		return (
			<h1> Hello Lifecycles </h1>
		);
	}
}