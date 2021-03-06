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
    // ADD ALL NEEDED DEPENDENCIES HERE e.g. 'datatables.net' installed by npm install --save datatables.net
    'jquery-form'
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
            $('input[name="created"]', this.$element).val(new Date());

            $('form[name="containerResource"]', this.$element).ajaxForm().submit();

            var me = this;

            $('form[name="newResource"]', this.$element).ajaxForm(function () {
                var channel = postal.channel('resource-update');
                channel.publish(me.$element.data('path'), {});
            }).submit();

            /*
            var $form = $('<form>');
            $form.attr('action', '/content/sling-bookface/stories/story/characters');
            $form.attr('method', 'post');
            var $input= $('<input>').attr('name','sling:resourceType').attr('value','/test/dummy');
            $form.append($input);
            $form.ajaxForm().submit();
            $form.remove();
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