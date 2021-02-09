const path = require('path');
const webpack = require('webpack');
const {resolve, config} = require('./globals');

const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // this is deprecated const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
//const FilemanagerWebpackPlugin = require('filemanager-webpack-plugin');
//const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: {
        'style_sass_libs': './src/scss_libs/index.scss',
        'style_sass': './src/scss/index.scss',
    },

    plugins: [
        new MiniCssExtractPlugin(),
    ],

    output: {
        path: resolve('dist/scss'),
        publicPath: config.publicPath,
        //filename: 'bundle.js'
        filename: '[name].js'
    },


    // https://webpack.js.org/configuration/resolve/
    /*resolve: {
        // extensions: ['.scss']
        // extensions: ['.png']
        // alias: {'jquery-ui': 'jquery-ui-dist/jquery-ui.js'}
    },//*/

    /* resolveLoader: {
        modules: ['node_modules'],
        // extensions: ['.js', '.json'],
        // mainFields: ['loader', 'main']
    }, */

    externals: {},
    devtool: 'source-map',//or false

    module: {
        rules: [

            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                query: {
                    limit: 1,
                    publicPath:  `${config.publicPath}scss`,
                    name: `${config.filePath}images/${config.filenameHash ? '[name].[hash:8]' : '[name]'}.[ext]`
                }
            },

            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader',
                query: {
                    publicPath: `${config.publicPath}scss`,
                    name: `${config.filePath}fonts/${config.filenameHash ? '[name].[hash:8]' : '[name]'}.[ext]`
                }
            },

            {
                test: /\.scss$/,
                include: resolve('src'),
                use: [

                    {
                        loader: 'style-loader', // inject CSS to page
                    },

                    ///*
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // hmr: IS_DEVELOPMENT,
                        },
                    },//*/

                    'css-loader',

                    // 'postcss-loader',

                    {
                        // resolve-url-loader needs to come *BEFORE* sass-loader
                        loader: 'resolve-url-loader',
                        options: {
                            //engine:	'rework',   //'rework' 'postcss' The css parser engine.
                            sourceMap: true,
                            //keepQuery: true,      // Keep query-string and/or hash suffixes.
                            //removeCR: true,		// Convert orphan CR to whitespace (postcss only).
                            //debug: true,	        //	Display debug information.
                            //silent: false,	    //	Do not display warnings.
                            //root:	unset,	        //	Similar to the (now defunct) option in css-loader.
                            // absolute: false,     //
                        }
                    },

                    {
                        loader: "sass-loader",
                        options: {
                            // implementation?,
                            // sassOptions: {
                            //    outputStyle: 'compressed',
                            // },
                            // additionalData?,
                            sourceMap: true,
                            webpackImporter: true, // support for @import "~bootstrap/scss/bootstrap";
                        }
                    },
                ]
            }
        ]

    },
    watchOptions: config.watchOptions,
};
