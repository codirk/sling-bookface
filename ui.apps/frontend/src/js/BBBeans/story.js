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
            // this.$element.click($.proxy(this.click, this));
            this.path = this.$element.data('path');
            //postal.subscribe('document.ready',$.proxy(this.currentPath, this))
            var channel = postal.channel('document');
            channel.subscribe('ready', $.proxy(this.currentPath, this))

        }

        currentPath() {
            this.channel = postal.channel('stories');
            this.channel.publish('story.change', {path: this.$element.data('path')});
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