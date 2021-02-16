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
            this.path = this.$element.data('path');
            this.$element.click($.proxy(this.click, this));

            var channel = postal.channel('item-deleted');
            channel.subscribe(this.$element.data('path'), $.proxy(this.delete, this));

            channel = postal.channel('global');
            channel.subscribe('inital.change', $.proxy(this.initialChange, this));

        }

        initialChange(data) {
            if (data.path == this.path) {
                this.setActive();
            }
        }

        delete() {
            this.$element.fadeOut("slow", function () {
                $(this).remove();
            });
        }

        setActive() {
            $('.active', this.$element.parent().parent().parent()).each(
                function ($element) {
                    $('div', $element).removeClass("active");
                }
            )
            this.$element.toggleClass("active");
            if (this.$element.data('url')) {
                history.pushState({}, null, this.$element.data('url'));
                /* window.history.replaceState(statedata, title, url); */
            }
        }

        click(event) {
            if (event && $(event.target).data('component-name') == 'bf.delete-resource') {
                var channel = postal.channel('item-deleted');
                channel.publish('update-details', {path: this.$element.data('path')})
            } else {
                this.setActive();
                var channel = postal.channel('item-selected');
                channel.publish(this.$element.parent().data('path'), {path: this.$element.data('path')});
            }
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