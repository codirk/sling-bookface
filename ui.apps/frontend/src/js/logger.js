define(["./constants"], function (constants) {
    "use strict";

    function debug(args) {
        if (constants.LOG_LEVEL >= 2) {
            console.dir(args);
        }
    }

    function info(args) {
        if (constants.LOG_LEVEL >= 1) {
            console.dir(args);
        }
    }

    function error(args) {
        console.dir(args);
    }

    return {
        debug: debug,
        info:info,
        error: error
    };
});