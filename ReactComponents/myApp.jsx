class ShopRemake extends React.Component {
	constructor() {
		super();
		this.state = {
			cost: 0,
			total: 0,
			items: {},
			info: counterData
		}

		this.changeTotal = this.changeTotal.bind(this);
		this.addItem = this.addItem.bind(this);
		this.reset = this.reset.bind(this);
	}

	changeTotal() {
		this.setState(function(prevState) {
			return {
				total: ++prevState.total
			}
		});
	}

	addItem(id, name, price, img) {
		this.setState(function(prevState) {
			if (prevState.info[id].inStock.quantity == 1) prevState.info[id].inStock.stock = false;
			if (prevState.items[name] == undefined) prevState.items[name] = {count: 1, tcost: price, url: img};
			else prevState.items[name] = {count: ++prevState.items[name].count, tcost: prevState.items[name].tcost + price};

			let decrement = --prevState.info[id].inStock.quantity;
			prevState.info[id].inStock.quantity = decrement;

			return {items: prevState.items, info: prevState.info, cost: prevState.cost + prevState.info[id].price};
		});
	}

	reset() {
		this.setState(function(prevState) {
			for (let index in prevState.items) {
				for (let i = 0; i < prevState.info.length; i++) {
					if (prevState.info[i].label === index) {
						prevState.info[i].inStock.quantity += prevState.items[index].count;
						prevState.info[i].inStock.stock = true;
					}
				}

				prevState.cost -= prevState.items[index].tcost;
				prevState.total -= prevState.items[index].count;
			};

			prevState.items = [];
			return prevState;
		});
	}

	render() {
		return (
			<React.Fragment>
				<div>
					<MyItem info={this.state.info} addItem={this.addItem} changeTotal={this.changeTotal}/>
				</div>
				<div>
					<MyCart items={this.state.items} cost={this.state.cost} reset={this.reset} total={this.state.total}/>
				</div>
			</React.Fragment>
		);
	}
}

function MyItem(props) {
	let css = {
		padding: '10px',
		width: '160px',
		height: '200px',
		border: '1px solid black',
		backgroundColor: 'white'
	}

	const items = props.info.map(function(item, index) {
		return (
			<React.Fragment>
				<div className="theItem">
					<img className="foodImg" src={item.imgUrl}/>
					<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',padding: '10px'}}>
						<div style={{display: 'flex', flexDirection: 'column'}}>
							<b> {item.label} </b>
							<span> {item.price.toLocaleString("en-us", {style: "currency", currency: "BGN"})} </span>
						</div>
						<div style={{display: 'flex', flexDirection: 'column'}}>
							<button disabled={!item.inStock.stock} onClick={() => {props.changeTotal(); props.addItem(index, item.label, item.price, item.imgUrl)}}> Add To Cart </button>
							<span> In stock: {props.info[index].inStock.quantity} </span>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	});

	return (
		<React.Fragment>
			{items}
		</React.Fragment>
	);
}

function MyCart(props) {
	return (
		<div>
			<span> Total Items: {props.total} </span> <br/>
			<span> Total Cost: {props.cost.toLocaleString("en-us", {style: "currency", currency: "BGN"})} </span>
			<button onClick={() => {shop(props.total, props.cost.toFixed(2), props.items)}}> Check Out </button>
			<button onClick={props.reset}> Reset </button>
		</div>
	);
}