const treaty = require('../treaty');

function asyncThing(one, two) {
	return treaty(resolve => {
		resolve(one, two);
	});
}

function asyncReject(error) {
	return treaty((resolve, reject) => {
		reject(error);
	});
}

exports.resolve = function(test) {
	asyncThing('foo', 'bar').then((one, two) => {
		test.ok(one === 'foo' && two === 'bar');
	    test.done();
	});
};

exports.reject = function(test) {
	asyncReject('error').then(() => {
		// This should not run
		test.ok(false);
	}).catch(err => {
		test.ok(err === 'error');
		test.done();
	});
};