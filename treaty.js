'use strict';

module.exports = function (callback) {

    var treaty = function () {

        var error = {},
            results = {},
            handlers = {};

        function handleArgs(data, args, handler) {
            data.value = Array.prototype.slice.call(args);
            if (handlers[handler]) {
                handlers[handler].apply(handlers[handler], data.value);
                treaty = undefined;
            } else {
                data.exists = true;
            }
        }

        function handleHandler(data, thenOrCatch) {
            return function (handler) {
                if (data.exists) {
                    handler.apply(handler, data.value);
                    treaty = undefined;
                } else {
                    handlers[thenOrCatch] = handler;
                }
                return methods;
            };
        }

        function resolve() {
            handleArgs(results, arguments, 'then');
        }

        function reject() {
            handleArgs(error, arguments, 'catch');
        }

        var methods = {
            then: handleHandler(results, 'then'),
            'catch': handleHandler(error, 'catch')
        };

        callback(resolve, reject);

        return methods;
    }();

    return treaty;
};