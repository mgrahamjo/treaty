# Treaty

You can think of a treaty as a Promise with one key difference: you can resolve a treaty with multiple arguments.


```javascript
const treaty = require('treaty');

let test = treaty((resolve, reject) => {

	let message = 'this was fun';

	doSomethingAsync((error, data) => {
		
		if (error) {
			reject(error);
		} else {
			// Resolve with any number of arguments:
			resolve(data, message);
		}
	});
});

// Arguments get passed here:
test.then((data, message) => {
	console.log(message);
	doSomethingWith(data);
});

test.catch(error => {
	console.error(error);
});
```

And of course, you can chain it all together if that's your style:

```javascript
require('treaty')((resolve, reject) => {

	let message = 'this was fun';

	doSomethingAsync((error, data) => {
		
		if (error) {
			reject(error);
		} else {
			resolve(data, message);
		}
	});
}).then((data, message) => {
	console.log(message);
	doSomethingWith(data);
}).catch(error => {
	console.error(error);
});
```