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
    "utils/componentInitializer"
    // ADD ALL NEEDED DEPENDENCIES HERE e.g. 'datatables.net' installed by npm install --save datatables.net
], function (module, _, $, constants, logger, postal, componentInitializer) {

    logger.debug(`Component ${module.id} loaded.`);

    // PLACE YOUR CODE HERE
    class Class {

        constructor($element) {
            this.$element = $element;
        }

        initialize() {
            var channel = postal.channel('stories');
            // TODO implement deeplink funtionality by suffix resource or by anchor hash
            if (this.$element.data('path')) {
                channel.subscribe(this.$element.data('path'), $.proxy(this.update, this));
            }

            channel.subscribe('story.change', $.proxy(this.update, this));

            var channel = postal.channel('item-deleted');
            channel.subscribe('update-details', $.proxy(this.delete, this));

        }

        delete(data) {
            if (data.path == this.$element.data('path')) {
                // delete all children
                $('*', this.$element).fadeOut("slow", function () {
                    $(this).remove();
                });
            }
        }

        update(data) {
            componentInitializer.ajax(data.path + '.html', this.$element);
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