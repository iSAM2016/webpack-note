var path = require('path');
var webpackMajorVersion = require('webpack/package.json').version.split('.')[0];
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

module.exports = {
    context: __dirname,
    entry: './example.js',
    output: {
        path: path.join(__dirname, 'dist/webpack-' + webpackMajorVersion),
        publicPath: '',
        filename: 'bundle.js'
    },
    module: {
        rules: [{ test: /\.png$/, use: 'file-loader' }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.jade',
            filename: 'output.jade'
        }),
        new HtmlWebpackPugPlugin()
    ]
};
