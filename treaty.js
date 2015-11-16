'use strict';

module.exports = callback => {

    let isResolved,
        treaty,
        results,
        catcher,
        then;

    function resolve() {
        results = Array.prototype.slice.call(arguments);
        if (then) {
            then.apply(then, results);
        } else {
            isResolved = true;
        }
    }

    function reject(error) {
        if (catcher) {
            catcher(error);
        }
    }

    treaty = {
        then: handler => {
            if (isResolved) {
                handler.apply(handler, results);
            } else {
                then = handler;
            }
            return treaty;
        },
        'catch': handler => {
            catcher = handler;
            return treaty;
        }
    };

    callback(resolve, reject);

    return treaty;
};