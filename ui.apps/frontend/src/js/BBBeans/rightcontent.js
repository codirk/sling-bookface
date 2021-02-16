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
    'postal'
    // ADD ALL NEEDED DEPENDENCIES HERE e.g. 'datatables.net' installed by npm install --save datatables.net
], function (module, _, $, constants, logger, postal) {

    logger.debug(`Component ${module.id} loaded.`);

    // PLACE YOUR CODE HERE
    class Class {

        constructor($element) {
            this.$element = $element;
        }

        initialize() {

            var channel = postal.channel('rightcontent');
            channel.subscribe('toggle',  $.proxy(this.toggle, this));
            channel.subscribe('hide',  $.proxy(this.hide, this));
        }

        toggle() {
            this.$element.fadeToggle('fast');
        }

        hide() {
            this.$element.fadeOut('fast');
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