class ShopRow extends React.Component {
	render() {
		// getting specific items
		const filterItems = counterData.filter((obj) => {
			if (this.props.id == 1) {
				if (obj.id <= 4 && obj.id >= 1) {
					return obj;
				}
			} else if (this.props.id == 2) {
				if (obj.id <= 8 && obj.id >= 5) {
					return obj;
				}
			} else if (this.props.id == 3) {
				if (obj.id <= 12 && obj.id >= 9) {
					return obj;
				}
			}
		});

		const items = filterItems.map(function(thing) {
			return <Item id={thing.id} key={thing.id} label={thing.label} price={thing.price} imgUrl={thing.imgUrl} inStock={thing.inStock.stock} quantity={thing.inStock.quantity}/>
		});

		return (
			<div className="shop-row">
				{items}
			</div>
		);
	}
}

class Item extends React.Component {
	constructor() {
		super();
		this.state = {};
		this.removeItem = this.removeItem.bind(this);
	}

	removeItem() {
		let proceed = checkLogin();
		if (!proceed) {
			let result = confirm('Please login to access the shop!');
			if (result) {
				let pass, user = prompt('Please enter your username!');
				if (user != null) pass = prompt('Now enter your passowrd!');
				return socket.emit('login', {user, pass});
			} else return;
		}

		let disableNext = false;
		if (this.state.quantity == 1 || this.props.quantity == 1) disableNext = true;

		if (this.state.quantity != undefined) {
			this.setState(function(prevState) {
				if (disableNext) return {quantity:  --prevState.quantity, disable: true}
				return {quantity: --prevState.quantity};
			});
		} else {
			this.setState(function (prevState) {
				if (disableNext) return {quantity: --this.props.quantity, disable: true}
				return {quantity: --this.props.quantity};
			});
		}
	}

	render() {
		let decider;
		if (this.state.quantity == undefined) decider = this.props;
		else decider = this.state;

		let extraHTML = '';
		if (this.props.id === 4 || this.props.id === 8 || this.props.id === 12) extraHTML = <br/>
		return (
			<React.Fragment>
				<div className="theItem">
					<img className="foodImg" src={this.props.imgUrl} />
					<div className="someFlex">
						<div style={{margin: '5px 0px 0px 3px'}}>
							<b> {this.props.label} </b> <br/>
							<span> {this.props.price.toLocaleString("en-us", {style: "currency", currency: "BGN"})} </span>
						</div>
						<div style={{marginTop: '7px'}}>
							<button onClick={this.removeItem} disabled={(this.state.disable != undefined) ? this.state.disable : !this.props.inStock} className="toCartButton"> Add to Cart </button> <br/>
							<span> Stock Left: {decider.quantity} </span>
						</div>
					</div>
				</div>
				{extraHTML}
			</React.Fragment>
		);
	}
}

class Cart extends React.Component {
	constructor() {
		super();
		this.state = {
			total: 0
		}
	}

	render() {
		let divStyle = {
			width: '100%',
			display: 'flex',
			flexDirection: 'column'
		};

		return (
			<div style={divStyle}>
				<img onClick={() => {shop(0)}} style={{margin: '10px 10px 20px 0px', alignSelf: 'flex-end'}} width="50" height="50" src="https://image.flaticon.com/icons/png/512/2/2772.png"/>
				<span style={{alignSelf: 'flex-end'}}> Total Cost: <br/> {this.state.total.toLocaleString("en-us", {style: "currency", currency: "BGN"})} </span>
			</div>
		);
	}
}

// Rendering the components
ReactDOM.render(
    <MyForms/>, // simply render different things in order to change the different tasks, // simply render different things in order to change the different tasks
    document.getElementById('root')
);

/*
<React.Fragment>
	<div>
	    <ShopRow id="1"/>
	    <ShopRow id="2"/>
	    <ShopRow id="3"/>
	</div>
	<Cart/>
</React.Fragment>, // simply render different things in order to change the different tasks
*/