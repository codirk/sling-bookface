const path = require('path');

function resolve(...args) {
    return path.join(__dirname, '..', ...args);
};

//const webpack = require('webpack')
//new webpack.EnvironmentPlugin(['target'])


const config = {

    mode: 'development',

    enabled: {sourceMaps: true},

    staticPath: '',

    // publicPath: '/etc/clientlibs/sling-bookface/',
    publicPath: process.env.npm_package_config_target,

    filePath: './',

    filenameHash: false,

    devtool: 'source-map',

    watchOptions: {
        aggregateTimeout: 300,
        poll:
            1000,
        ignored:
            /node_modules/
    }

};

module.exports={
    resolve,
    config
}

