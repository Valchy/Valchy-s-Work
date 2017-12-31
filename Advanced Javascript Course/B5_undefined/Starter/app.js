b();
console.log(a);

var a;

function b() {
  console.log('Called b!');
}

// Yay this works xd...
if (typeof a === undefined) {
	console.log('a is not defined');
}
else {
	console.log('a is defined')
}