
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry : ['babel-polyfill','whatwg-fetch', 'react','react-dom','./src/index.js','./src/style.css'],
    output : {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },
    module: {
        loaders : [
            {
                test: /\.js$/,
                loaders : ['babel?'+JSON.stringify({
                    cacheDirectory : true,
                    presets : ['es2015','react']
                })],
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                loader: 'style!css-loader'
            }
        ]
    }
};