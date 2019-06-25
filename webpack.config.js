const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
module.exports = {
    entry: {
        app: './index.js',
        vendor: ['jquery', 'bootstrap'],
    },
    output: {
        filename: '[name].[chunkhash].bundle.js',
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: './index.ejs'
        }),
        new InlineManifestWebpackPlugin({
            name: 'webpackManifest'
        }),
        /*new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),*/
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: [['es2015',{modules: false}]]
                }
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8080
    },
    watchOptions: {
        aggregateTimeout: 300,
        ignored: /node_modules/
    }
};