'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(`${__dirname}/dist`),
        publicPath: '/dist/'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015-node6'],
                    plugins: ['transform-object-rest-spread']
                }
            },
            // 1) run any file that ends in ".scss" through the sass-loader to transpile it to css
            // 2) run the css through the raw-loader which loads the style declarations into a JavaScript module
            // 3) extract CSS from JS with ExtractTextPlugin into one main bundle file, "all.css"
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('raw!sass')
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('bundle.css')
    ],
    resolve: {
        root: __dirname
    },
    sassLoader: {
        sourceComments: true,
        indentWidth: 4,
        outputStyle: 'expanded'
    }
};
