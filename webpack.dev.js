const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const path = require('path')
const { resolve } = require('path')
module.exports = merge(common, {
    mode: 'development',
    //  devtool  : 'source-map',
    devtool: 'inline-source-map',
    entry: {
        app: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            './src/index.js'
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader' // creates style nodes from JS strings
                    }, {
                        loader: 'css-loader',// translates CSS into CommonJS
                    }, {
                        loader: 'less-loader' // compiles Less to CSS
                    }
                ],
                exclude: path.resolve(__dirname, 'node_modules')
            }, {
                test: /\.css$/,
                use: [{
                    loader: 'css-loader',// translates CSS into CommonJS
                }],

            }, {
                test: /\.scss$/,
                //使用一组 Loader 去处理 scss 文件
                //处理顺序为从后到前，即先交给 sass-loader 处理，再将结果交给 css-loader,最后交给 style - loader
                use: [
                    {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }], //排除 node modules 目录下的文件
                exclude: path.resolve(__dirname, 'node_modules'),
            }
        ]
    },
    devServer: {
        publicPath: '/',
        watchOptions: {
            ignored: /node_modules/,
            poll: true
        },
        historyApiFallback: true,
        noInfo: false,
        hot: true,
        contentBase: './dist/',
        compress: true,//配置是否启用 Gzip 压缩 ，
        port: 8080

    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()// 热模块替换插件
    ]
})
