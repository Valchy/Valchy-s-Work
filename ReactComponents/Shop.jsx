const data = [
	{id: 1, name: 'Apple', price: 1, desc: 'A fruit.'},
	{id: 2, name: 'Banana', price: 2, desc: 'A fruit.'},
	{id: 3, name: 'Cucumber', price: 5, desc: 'A vegetable.'},
	{id: 4, name: 'Football', price: 20, desc: 'A toy to play with.'},
	{id: 5, name: 'Bed', price: 100, desc: 'Something you sleep on.'},
	{id: 6, name: 'Bread', price: 0.25, desc: 'An essential.'}
];


function Shop() {
	const sortUponPrice = data.sort(function(a, b) {
		return b.price - a.price;
	});

	const products = sortUponPrice.map(function(product) {
		return <Products key={product.id} label={product.name} money={product.price} info={product.desc}/>;
	});

	return (
		<div>
			{products}
		</div>
	);
}

function Products(props) {
	return (
		<div style={{display: 'flex', 'flex-direction': 'column'}}>
			<label> {props.label} </label>
			<span> {props.money.toLocaleString("en-us", {style: "currency", currency: "EUR"})} </span>
			<p style={{margin: '0px 0px 5px 0px'}}> {props.info} </p>
			<hr style={{backgroundColor: '#000', height: '2px'}}/>
		</div>
	);
}