"use strict";
/**
 * Bertie Bott Bean
 *
 * https://sling.apache.org/documentation/the-sling-engine/sling-api-crud-support.html
 *
 */
define([
    "module",
    "lodash",
    "jquery",
    "../constants",
    "../logger",
    // ADD ALL NEEDED DEPENDENCIES HERE e.g. 'datatables.net' installed by npm install --save datatables.net
], function (module, _, $, constants, logger) {

    logger.debug(`Component ${module.id} loaded.`);



    function query(path, data)
    {

        $.ajax({
            context: this,
            method: 'GET',
            url: '/content.query.json?queryType=xpath&statement=/' + this.path + '/*' + '&property=title',
            type: 'json'
        }).done(function (data) {
                console.dir(data);

                $(data).each((index, element) => {

                    this.$ul.append("li").html(element['name']).data("path", element['jcr:path']);
                });

            }
        );
    }

    function updateProperty(path, data)
    {
        $.ajax({
            method: 'POST',
            url: this.path,
            data: {
                title: currentInputValue
            }
        }).done(function (msg) {
            console.log("update done");
        });
    }





    function unknownCall (path, data)
    {
        $.ajax({
            context: this,
            method: 'POST',
            dataType: 'json',
            url: this.parent.path + "/*",
            data: {
                ':nameHint': "child",
                'sling:resourceType': "sample/components/content/treeNode",
                'title': ""
            }
        }).done(function (msg) {
            console.log('create node done');

            $.ajax({
                context: this,
                type: 'GET',
                url: msg.path + '.html',
                success: function (data) {
                    let newElement = $("<li/>").html(data);
                    newElement.appendTo(this.parent.$childrenContainer);
                    initializeComponent(TreeNode, newElement);
                    $($(".treenode", newElement).get(0)).data(('component:TreeNode')).setFocus();
                }
            });

        });

    }
    function createNode(path, data)
    {
        $.ajax({
            method: 'POST',
            url: path,
            data: data
        }).done(function (msg) {
            console.log('create node done');
        });
    }

    function deleteNode(path, done)
    {
        $.ajax({
            context: this,
            method: 'POST',
            url: path.split('/').slice(0, -1).join("/"),
            data: {
                ':operation': 'delete',
                ':applyTo': path
            }
        }).done(done());
    }


    function jcrMovePrepend(from, toPath)
    {
        $.ajax({
            context: this,
            method: 'POST',
            url: from + '.jcr.json',
            data: {
                'cmd': 'move_prepend',
                'path': toPath,
                ':nameHint': "child",
                '@MoveFrom': toPath
            }
        }).done(new function () {
            console.log("done")
        });
    }

    function jcrMove(from, toPath)
    {
        $.ajax({
            context: this,
            method: 'POST',
            url: toPath,
            data: {
                ':nameHint': "child",
                '@MoveFrom': from
            }
        }).done(new function () {
            console.log("done")
        });

        /*
        $.ajax({
            url: '/bin/core/node.move.json/content/sample/helloWorld/tree/child/child_2102722893',
            type: 'PUT',

            data:'{"path":"/content/sample/helloWorld/tree/child/child_318216277","name":"child_2102722893","index":0}'
        });
        */


        /**
         *
         curl -u admin:admin -F":operation=move" -F":applyTo=content/sample/helloWorld/tree/child_2102722893"  -F":dest=/content/sample/helloWorld/tree/child/" http://sling-server:8080

         curl -u admin:admin -F":operation=move" -F":applyTo=/content/sample/helloWorld/tree/child_121474708/child"  -F":dest=/content/sample/helloWorld/tree/dirk" -F ":nameHint=dirk" http://sling-server:8080

         <form method="POST" action="/content/page/" enctype="multipart/form-data">
         <input type="hidden" name="image@MoveFrom" value="/tmp/upload/123" />
         <input type="text" name="title" />
         <input type="text" name="text" />
         <input type="Submit" />
         </form>
         */
    }


    return {}
});