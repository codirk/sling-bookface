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
            // register this instance to some event
             this.$element.click($.proxy(this.click, this));

            // $ curl -F":operation=delete" http://host/content/sample
        }

        click() {
            $.post(this.$element.data('path'), { ':operation': "delete" } );

            var channel = postal.channel('item-deleted');
            channel.publish(this.$element.data('path'), {});




            // location.reload();
            //TODO send message to messagebus
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