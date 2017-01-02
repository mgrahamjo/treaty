'use strict';

module.exports = function (callback) {

    var treaty = void 0,
        results = void 0,
        catcher = void 0,
        error = void 0,
        _then = void 0;

    function resolve() {
        results = Array.prototype.slice.call(arguments);
        if (_then) {
            _then.apply(_then, results);
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
        then: function then(handler) {
            if (results) {
                handler.apply(handler, results);
            } else {
                _then = handler;
            }
            return treaty;
        },
        'catch': function _catch(handler) {
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