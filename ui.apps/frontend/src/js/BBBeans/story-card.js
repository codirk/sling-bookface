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
        }

        click() {
            $('.story-card',this.$element.parent().parent()).each(
                function ($element){
                   $('div',$element).removeClass("active");
                }
            )
            debugger;
            this.$element.toggleClass("active");
            history.pushState({}, null, this.$element.data('url'));
            /*
              or
             window.history.replaceState(statedata, title, url);

            TODO trigger the load of the content by using the messagebus
            */

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