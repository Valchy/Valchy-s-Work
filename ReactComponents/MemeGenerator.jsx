class MemeGenerator extends React.Component {
	constructor() {
		super();
		this.state = {
			header: '',
			footer: '',
			img: 'https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA5OC81NzYvb3JpZ2luYWwvZGVuYWxpLXRvbnMtb2YtcG9vcC5qcGc='
		};

		this.onInput = this.onInput.bind(this);
		this.changeMeme = this.changeMeme.bind(this);
	}

	componentDidMount() {
		fetch('https://api.imgflip.com/get_memes')
		.then(response => response.json())
		.then(data => this.setState((prevState) => {
			let tmp = data.data.memes;
			return {
				data: tmp
			}
		}));
	}

	onInput(e) {
		let {value, name} = e.target;
		this.setState({
			[name]: value
		});
	}

	changeMeme() {
		let randomMeme = this.state.data[Math.floor(Math.random() * this.state.data.length)].url;
		this.setState({
			img: randomMeme
		});
	}

	deleteText = () => {
		this.setState({
			header: '',
			footer: ''
		});
	}

	render() {
		return (
			<div style={{display: 'flex', flexDirection: 'column'}}>
				<h2> Meme Generator </h2>
				<input name="header" placeholder="Meme Header..." type="text" value={this.state.header} onChange={this.onInput}/>
				<div style={{background: 'url('+this.state.img+') no-repeat'}} className="memeGenerator">
					<Header header={this.state.header}/>
					<Footer footer={this.state.footer}/>
				</div>
				<input name="footer" placeholder="Meme Footer..." type="text" value={this.state.footer} onChange={this.onInput}/>
				<button onClick={this.changeMeme}> Generate Meme </button>
				<button onClick={this.deleteText}> Delete Text </button>
			</div>
		);
	}
}

function Header(props) {
	return (
		<div className="memeTitle">
			<span> {props.header} </span>
		</div>
	);
}

function Footer(props) {
	return (
		<div className="memeTitle">
			<span> {props.footer} </span>
		</div>
	);
}