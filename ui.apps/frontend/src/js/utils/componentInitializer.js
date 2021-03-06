"use strict";
/**
 * Bertie Bott Bean
 *
 * Register this bean in ./frontend/src/js/main.js !
 */
define([
        "module",
        "lodash",
        "jquery",
        "utils/constants",
        "utils/logger",
        'postal',
        // ADD ALL NEEDED DEPENDENCIES HERE e.g. 'datatables.net' installed by npm install --save datatables.net
        'bluebird'

    ], function (module, _, $, constants, logger, postal, Bluebird) {

        logger.debug(`Component ${module.id} loaded.`);

        function test() {
            alert('test2')
        }

        function getModule(componentID, callback) {
            // REGISTER ALL COMPONENTS HERE !!
            switch (componentID) {
                case  'bf.delete-resource':
                    return require(['../commons/delete-resource.js'], callback);
                case  'bf.tab-switcher':
                    return require(['../commons/tab-switcher.js'], callback);
                case  'bf.template-form-textarea':
                    return require(['../commons/template-form-textarea.js'], callback);

                case  'bf.create':
                    return require(['../BBBeans/entity-create.js'], callback);
                case  'bf.listview':
                    return require(['../BBBeans/entity-listview.js'], callback);
                case  'bf.listitem':
                    return require(['../BBBeans/entity-listitem.js'], callback);
                case  'bf.details':
                    return require(['../BBBeans/entity-details.js'], callback);
                case  'bf.card':
                    return require(['../BBBeans/entity-card.js'], callback);

                case  'bf.leftcontent':
                    return require(['../BBBeans/leftcontent.js'], callback);
                case  'bf.rightcontent':
                    return require(['../BBBeans/rightcontent.js'], callback);

                case  'bf.suffix-resource':
                    return require(['../BBBeans/suffix-resource.js'], callback);
                case  'bf.content-navigation-toggler':
                    return require(['../BBBeans/content-navigation-toggler.js'], callback);
                default:
                    //    return require(['./BBBeans/_BBTemplateBean'], callback);
                    return;
            }
        }

        function initializeComponents($root) {
            // does it make sense to change data-component-name to data-component-names?
            // to make it possible to register more than one js class to the same html element?
            var $componentsToBeInitialized = $root ? $('*[' + 'data-component-name' + ']', $root) : $('*[' + 'data-component-name' + ']');
            logger.info(`going to initialize ${$componentsToBeInitialized.length} components`);


            var promises = [];
            $componentsToBeInitialized.each(function (index, element) {

                var $element = $(element);
                logger.info('initializing ...');
                var componentNames = $element.data('component-name');
                var componentIDs = componentNames.split(',')

                $.each(componentIDs, function (index, componentID) {

                    var promise = getModule(componentID, function (component) {
                        return new Bluebird(function (resolve, reject) {
                            var newInstance = component.factory.create($element);
                            newInstance.initialize();
                            resolve(newInstance);
                        });
                    });
                    promises.push(promise);


                });


            });

            Bluebird.all(promises)
                .error(function (e) {
                        console.dir(e);
                        debugger;
                    }
                ).then(
                    function (){
                        if(!$root) {
                            /* $root will be set if its an ajax call*/
                            var channel = postal.channel('document');
                            channel.publish('ready', {});
                        }
                    }
            );

        }

        function observer() {
            // TODO reinizialize all new loaded components
            // Maybe we will use the mutation observer to do this !!!!

            var $target = me.$element;
            // The an observer instance
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    var newNodes = mutation.addedNodes;
                    if (newNodes !== null) {
                        var $nodes = $(newNodes);
                        $nodes.each(function () {
                            var $node = $(this);
                            console.dir($node);
                            var componentID = $node.data('component-name');

                            if (componentID) {
                                // TODO
                                // register javascript component to the html element
                            }
                        });
                    }
                });
            });
            // Configuration of the observer:
            var config = {attributes: false, childList: true, characterData: false, subtree: true}
            // Pass in the target node, as well as the observer options
            observer.observe($target[0], config);

        }

        function ajax(url, $element) {
            logger.debug(`ajax call ${url}`)
            $.get(url, function (htmlresponse) {
                $element.html(htmlresponse);
                initializeComponents($element);
            })
        }

        function ajaxReplaceWith(url, $element) {
            logger.debug(`ajax call ${url}`)
            $.get(url, function (htmlresponse) {
                $element.ajaxReplaceWith(htmlresponse);
                initializeComponents($element);
            })

        }

        return {
            initializeComponents: initializeComponents,
            ajaxReplaceWith: ajaxReplaceWith,
            ajax: ajax
        }
    }
);