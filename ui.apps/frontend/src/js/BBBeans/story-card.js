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
            this.path=this.$element.data('path');
            // register this instance to some event
            this.$element.click($.proxy(this.click, this));
            this.channel = postal.channel('stories');
            this.channel.subscribe('story.inital.change', $.proxy(this.storyChanged, this));

            // this.channel.subscribe("story.change", $.proxy(this.unsubscribe, this));
            //TODO if this.suffix id this path
            //             this.subscription = this.channel.subscribe('story-title.change', $.proxy(this.updateTitle, this));
        }


        setActive(){
            $('.active', this.$element.parent().parent()).each(
                function ($element) {
                    $('div', $element).removeClass("active");
                }
            )
            this.$element.toggleClass("active");
            history.pushState({}, null, this.$element.data('url'));
            /*
               window.history.replaceState(statedata, title, url);
             */

            this.channel.publish('story.change', {path: this.$element.data('path')});

//            this.subscription = this.channel.subscribe('story-title.change'+this.$element.data('path'), $.proxy(this.updateTitle, this));
            var channel = postal.channel('resource-update');
            channel.subscribe(this.$element.data('path'),  $.proxy(this.update, this));


        }
        click() {
            this.setActive();




        }

        storyChanged(data) {
            if(data.path == this.path){
                this.setActive();
            }
        }

        update(data){
            componentInitializer.ajax(this.$element.data('path')+'.card.card-content.html', this.$element);
        }

        updateTitle(data) {
            $('a', this.$element).text(data.title);
        }

        unsubscribe() {
            if (this.subscription) {
                this.subscription.unsubscribe();
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