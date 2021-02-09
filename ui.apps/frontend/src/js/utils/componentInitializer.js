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
             //   case 'dam.toggler':
             //       return require(['../BBBeans/toggler.js'], callback);
                default:
                    //    return require(['./BBBeans/_BBTemplateBean'], callback);
                    return;
            }
        }

        function initializeComponents($root) {
            // does it make sense to change data-component-name to data-component-names?
            // to make it possible to register more than one js class to the same html element?
            var $componentsToBeInitialized = $root ? $('*[' + 'data-component-name' + ']', $root) : $('*[' + 'data-component-name' + ']');
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

        return {
            initializeComponents: initializeComponents,
            ajax: ajax
        }
    }
);