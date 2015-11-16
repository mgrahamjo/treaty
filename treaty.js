'use strict';

module.exports = callback => {

    let treaty,
        results,
        catcher,
        error,
        then;

    function resolve() {
        results = Array.prototype.slice.call(arguments);
        if (then) {
            then.apply(then, results);
        }
    }

    function reject(err) {
        if (catcher) {
            catcher(err);
        } else {
            error = err;
        }
    }

    treaty = {
        then: handler => {
            if (results) {
                handler.apply(handler, results);
            } else {
                then = handler;
            }
            return treaty;
        },
        'catch': handler => {
            if (error) {
                handler(error);
            } else {
                catcher = handler;
            }
            return treaty;
        }
    };

    callback(resolve, reject);

    return treaty;
};