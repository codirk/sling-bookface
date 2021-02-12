"use strict";
/**
 * Bertie Bott Bean
 *
 * 1) Register this bean in ./frontend/src/js/utils/componentInitializer.js !
 * 2) mark to component with data-component-name="dam.cardview"
 * 3) have fun */
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
            var me=this;
            $('div button', this.$element).each(
                function (){
                    var $button=$(this);
                    $button.click($.proxy(me.click, me , $button));
                }
            )
        }

        click($button) {

            var tabName=$button.data('tab-name')

            $('.tabcontent', this.$element).each(
                function (){
                    var $tabContent=$(this);
                    $tabContent.hide();
                }
            );
            $('button', this.$element).each(
                function (){
                    var $tabContent=$(this);
                    $tabContent.removeClass("active");
                }
            );
            $button.addClass("active");



            var $tab = $(`*[name ="${tabName}"]`, this.$element);
            //TODO to load data if it's not done
            $tab.show();
            $tab.addClass("active");
        }

    };

    // END PLACE YOUR CODE HERE


    class Factory {
    };
    Factory.prototype.create = function (...options) {
        return new Class(...options);
    }
    return {
        factory: new Factory()
    }
});