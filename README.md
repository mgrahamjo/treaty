# Treaty

You can think of a Treaty as an ES2015 Promise with one key difference: you can resolve a promise with multiple arguments.


```javascript
const treaty = require('treaty');

let test = treaty((resolve, reject) => {

	let message = 'this was fun';

	doSomethingAsync((error, data) => {
		
		if (error) {
			reject(error);
		} else {
			resolve(data, message);
		}
	});
});

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