const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const common = require('./webpack.common.js')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const dist_dir = 'build'
module.exports = merge(common, {
    entry: {
        //    vconsole: 'vconsole',
        //    polyfills: './src/polyfill.js',
        app: './src/index.js'
    },
    //  mode   : 'development',
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'style-loader' // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader',// translates CSS into CommonJS
                    }, {
                        loader: 'postcss-loader'
                    }, {
                        loader: 'less-loader' // compiles Less to CSS
                    }]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }, {
                test: /\.scss$/,
                //处理顺序为从后到前，即先交给 sass-loader 处理，再将结果交给 css-loader,最后交给 style - loader
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'style-loader' // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader',// translates CSS into CommonJS
                    }, {
                        loader: 'postcss-loader'
                    }, {
                        loader: 'sass-loader' // compiles Less to CSS
                    }]
                })
            }]
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin({
            filename: 'static/[name].[hash].css'
        })
    ],

})
