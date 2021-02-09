const {resolve, config} = require('./globals');

const FileManagerPlugin = require('filemanager-webpack-plugin');

const fileManagerPlugin = new FileManagerPlugin({
    onStart: {
        delete: [
            // resolve('public', config.publicPath)
        ],
    },
    onEnd: {
        copy: [
            {
                source: 'dist/**/*',
                destination: resolve('public', config.publicPath)
            },
            {
                source: 'dist/*',
                destination: resolve('public', config.publicPath)
            },
        ],
    }

});


module.exports = [
    require("./webpack.js.config"),
    require("./webpack.scss.config"),
    require("./webpack.less.config"),
];

module.exports.forEach(function (config) {
    console.log(config);
    config.plugins.push(fileManagerPlugin);
});