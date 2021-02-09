const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    entry: {
        'style': './src/style.css',
        // TODO add some entry point here
    }, //*/

    plugins: [new MiniCssExtractPlugin({filename: 'components/[name].css'})],
    output: {
        //filename: '[name].css',
        path: path.resolve(__dirname, 'dist/css')
    },
    resolve: {
        extensions: ['.css']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                            modules: {
                                namedExport: true,
                            },
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: true,
                            modules: {
                                namedExport: true,
                                localIdentName: 'foo__[name]__[local]',
                            },
                        },
                    },
                ],
            },
        ],
    },
};

/*

rm -rf node_modules && \
npm install -save-dev \
    webpack \
    webpack-cli \
    css-loader \
    mini-css-extract-plugin

 */

/*

npm run webpack:css

# tested with following versions:

"devDependencies": {
    "css-loader": "^4.3.0",
    "mini-css-extract-plugin": "^0.11.1",
    "rimraf": "^3.0.2",
    "webpack": "^4.44.1",
    "webpack-cli": "^3.3.12"
  }

*/