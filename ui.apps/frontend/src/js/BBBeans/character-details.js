"use strict";
/**
 * Bertie Bott Bean
 *
 * 1) Register this bean in ./frontend/src/js/utils/componentInitializer.js !
 * 2) mark to component with data-component-name="dam.cardview"
 * 3) have fun
 */
define([
    "module",
    "lodash",
    "jquery",
    "utils/constants",
    "utils/logger",
    'postal',
    "utils/componentInitializer",
    // ADD ALL NEEDED DEPENDENCIES HERE e.g. 'datatables.net' installed by npm install --save datatables.net
    'jquery-form'
], function (module, _, $, constants, logger, postal, componentInitializer) {

    logger.debug(`Component ${module.id} loaded.`);

    // PLACE YOUR CODE HERE
    class Class {

        constructor($element) {
            this.$element = $element;
        }

        initialize() {
            var channel = postal.channel('item-selected');
            // TODO implement deeplink funtionality by suffix resource or by anchor hash
            if (this.$element.data('path')) {
                channel.subscribe(this.$element.data('path'), $.proxy(this.update, this));
            }

            channel.subscribe('*', $.proxy(this.update, this));
        }

        update(data) {
            componentInitializer.ajax(data.path + '.details.html', this.$element);
        }


    };

    // PLACE YOUR CODE HERE
    class Factory {
    };
    Factory.prototype.create = function (...options) {
        return new Class(...options);
    }
    return {
        factory: new Factory()
    }
});