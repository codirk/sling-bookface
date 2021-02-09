define([
        "module",
        "lodash",
        "jquery",
        "utils/constants",
        "utils/logger",
        "utils/componentInitializer",
        'bluebird',
        './init-postal'
    ],
    function (module, _, $, constants, logger, componentInitializer, Bluebird) {
        logger.info("Module '" + module.id + "' loaded.");
        componentInitializer.initializeComponents();

        return {}
    }
);
