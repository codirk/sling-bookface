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
           // $('input', this.$element).blur($.proxy(this.save, this));
            // register this instance to some event
            //  ${'input', this.$element);
            //                 .click($.proxy(this.click, this));
            $('textarea', this.$element).on('input', this.autoExpand);
            $('textarea', this.$element).blur($.proxy(this.save, this));
        }

        save() {
            // alert('Hello Component Clicked');
           // debugger;
            var me=this;
            this.$element.ajaxForm(function() {
                logger.debug(`${this.url} done `);
                var channelName=me.$element.data('channel');
                var topic=me.$element.data('topic');
                if(channelName && topic) {
                    var channel = postal.channel(channelName);
                    channel.publish(topic+me.$element.attr('action'), {title: $('textarea', me.$element).val()});
                }
            }).submit();;
        }

         autoExpand () {

            // Reset field height
            this.style.height = 'inherit';

            // Get the computed styles for the element
            var computed = window.getComputedStyle(this);

            // Calculate the height
            var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                + parseInt(computed.getPropertyValue('padding-top'), 10)
                + this.scrollHeight
                + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

            this.style.height = height + 'px';

        };


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