const resetObj = {
	input: 'ValchyGaming',
	textarea: 'I am 16 years old.',
	select: 'CS:GO',
	radio: 'male',
	checked1: true,
	checked2: true,
	checked3: false
}

class MyForms extends React.Component {
	constructor() {
		super();
		this.state = {
			input: 'ValchyGaming',
			textarea: 'I am 16 years old.',
			select: 'CS:GO',
			radio: 'male',
			checked1: true,
			checked2: true,
			checked3: false
		};

		this.formReset = this.formReset.bind(this);
		this.formSubmit = this.formSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	formReset() {
		this.setState(resetObj);
	}

	formSubmit(e) {
		e.preventDefault();
		socket.emit('myForm', this.state);
	}

	handleChange(event) {
		let {value, name, type, checked} = event.target;
		(type == 'checkbox') ? this.setState({[name]: checked}) : this.setState({[name]: value});
	}

	render() {
		// Return a form with an input, textarea, submit button, radio button, checkbox, reset button, select
		return (
			<form style={{backgroundColor: '#fff', border: '1px solid black', padding: '10px 30px'}}>
				<label style={{fontSize: '16px', letterSpacing: '2px'}}> A form with everything </label> <hr style={{backgroundColor: '#000'}}/> <br/>
				<label> Normal Input </label> <br/> <input name="input" type="text" onChange={this.handleChange} value={this.state.input}/> <br/> <br/>
				<label> A Text Area </label> <br/> <textarea name="textarea" onChange={this.handleChange} value={this.state.textarea}/> <br/> <br/>

				<label> Check Buttons: </label> <br/>
					<input name="checked1" onChange={this.handleChange} checked={this.state.checked1} type="checkbox"/> <span> Cats </span>
					<input name="checked2" onChange={this.handleChange} checked={this.state.checked2} type="checkbox"/> <span> Dogs </span>
					<input name="checked3" onChange={this.handleChange} checked={this.state.checked3} type="checkbox"/> <span> Turtles </span>
				<br/> <br/>

				<label> Radio Buttons: </label> <br/>
					<input name="radio" onChange={this.handleChange} value="male" checked={this.state.radio == 'male'} type="radio"/> <span> Male </span> <br/>
					<input name="radio" onChange={this.handleChange} value="female" checked={this.state.radio == 'female'} type="radio"/> <span> Female </span> <br/>
					<input name="radio" onChange={this.handleChange} value="other" checked={this.state.radio == 'other'} type="radio"/> <span> Other </span> <br/>
				<br/>

				<label> Favourite Game: </label> <br/>
				<select name="select" onChange={this.handleChange} value={this.state.select}>
					<option value="CS:GO"> CS:GO </option>
					<option value="LOL"> LOL </option>
					<option value="COD"> COD </option>
				</select> <br/> <br/>

				<div style={{display: 'flex', justifyContent: 'space-around'}}>
					<button onClick={this.formSubmit} type="submit"> Submit </button>
					<button onClick={this.formReset} type="reset"> Reset </button>
				</div>
			</form>
		);
	}
}

class Forms extends React.Component {
	constructor() {
		super();
		this.state = {
			val: '',
			secVal: ''
		};

		this.onKeyPress = this.onKeyPress.bind(this);
	}

	onKeyPress(event) {
		const {name, value} = event.target;
		this.setState({[name]: [value]});
	}

	render() {
		return (
			<form>
				<input name="val" onChange={this.onKeyPress} type="text" placeholder="Type in me..."/> <br/>
				<label> <center> {this.state.val} || {this.state.secVal} </center> </label>
				<input name="secVal" onChange={this.onKeyPress} type="text" placeholder="Type in me... (something different)"/> <br/> <br/>
				<textarea rows="10" value="Did you know that textarea in react is made to function like an input though usually there is an opening and closing element and the text is in between."/>
			</form>
		);
	}
}