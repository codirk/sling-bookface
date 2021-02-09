define([
        "module",
        "lodash",
        "jquery",
        "./constants",
        "./logger",
        'postal',
        'bluebird',
        'postal.request-response'
    ], function (module, _, $, constants, logger, postal, Bluebird) {

// We need to tell postal how to get a deferred instance
        postal.configuration.promise.createDeferred = function () {
            return new $.Deferred();
        };
// We need to tell postal how to get a "public-facing"/safe promise instance
        postal.configuration.promise.getPromise = function (dfd) {
            return dfd.promise();

            //return new Bluebird(dfd);
        };
    }
);
