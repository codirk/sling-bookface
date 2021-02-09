const path = require('path');

const {resolve, config} = require('./globals');

//this is deprecated --> const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: config.mode,
    entry: {
        'main': './src/less/index.less',
    },
    output: {
        // filename: '[name].css',
        path: resolve('dist/less')
    },
    resolve: {
        extensions: ['.less']
    },
    module: {
        rules: [

            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                            lessOptions: {
                                strictMath: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use:
                    [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        "css-loader"
                    ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(
            //{filename: 'components/[name].css'}
        ),
    ],

    watchOptions: config.watchOptions,
};

