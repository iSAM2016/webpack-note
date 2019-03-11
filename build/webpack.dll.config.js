const path = require("path");
const config = require('../config')
const webpack = require('webpack')
const rootPath = path.resolve(__dirname, '../');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const {
    resolve
} = require('path')

module.exports = {
    mode: 'production',
    entry: {
        vendor: ["react", "react-dom", 'babel-polyfill'], //只需要编译app部分的代码，dll部分，只要包含的库没有增减、升级，就不需要重新打包。
    },
    output: {
        path: path.join(rootPath, `${config.assetsSubDirectory}`),
        filename: 'dll_[name].js',
        // libraryTarge: 'commonjs', // 如果是 ndoe 脚本 最后的形式是export[a] = function(){}
        //  挂载点 因为 dll 生成的是闭包文件
        library: "[name]_[hash]"
    },
    plugins: [
        new CleanWebpackPlugin([`${config.assetsSubDirectory}`], {
            root: resolve(__dirname, '../'),
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                beautify: false,
                comments: false,
                compress: {
                    warnings: false,
                    drop_console: true,
                    collapse_vars: true,
                    reduce_vars: true,
                },
            },
        }),
        new webpack.DllPlugin({
            path: path.join(rootPath, `${config.assetsSubDirectory}/site`, "[name]-manifest.json"),
            name: "[name]_[hash]"
        })
    ]
}