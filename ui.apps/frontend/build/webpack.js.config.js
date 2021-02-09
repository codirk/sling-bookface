'use strict'

const {resolve, config} = require('./globals');

const webpack = require('webpack')
var node_dir = __dirname + '/node_modules';

module.exports = {
    entry: resolve('./src/js/main.js'),
    mode: "none", // Do not optimize or minimize the code
    output: {
        filename: '[name].js',
        publicPath: config.publicPath,
        path: resolve('./dist')
    },

    plugins: [
        // This is for jQuery plugins e.g. jquery-lazy
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ],
    resolve: {
        alias: {
            // 'jquery': '/Users/dirk/git/git.messetat.de/sling-projects/sling-digital-asset-management/ui.apps/frontend/node_modules' + '/jquery/dist/jquery.js'
            'lodash': resolve('node_modules/lodash/lodash.js'),
            'jquery': resolve('node_modules/jquery/dist/jquery.js'),
            'postal': resolve('node_modules/postal/lib/postal.js'),
            'jstree': resolve('node_modules/jstree/dist/jstree.js'),
            'datatables.net': resolve('node_modules/datatables.net/js/jquery.dataTables.js'),
            'jquery-ui-bundle': resolve('node_modules/jquery-ui-bundle/jquery-ui.js'),
        //    'constants': resolve('node_modules/jquery/dist/jquery.js'),
            //'logger': resolve('node_modules/jquery/dist/jquery.js'),
            'utils/constants': resolve('./src/js/constants.js'),
            'utils/logger': resolve('./src/js/logger.js'),
            'utils/componentInitializer': resolve('./src/js/utils/componentInitializer.js'),
        }
    },

    optimization: {
        //  { checkWasmTypes?, chunkIds?, concatenateModules?, flagIncludedChunks?, hashedModuleIds?, mangleWasmImports?, mergeDuplicateChunks?, minimize?, minimizer?, moduleIds?, namedChunks?, namedModules?, noEmitOnErrors?, nodeEnv?, occurrenceOrder?, portableRecords?, providedExports?, removeAvailableModules?, removeEmptyChunks?, runtimeChunk?, sideEffects?, splitChunks?, usedExports? }
        moduleIds: 'named',
    },

    watchOptions: config.watchOptions,

};
