const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const config = require('../config')
const webpack = require('webpack')
const rootPath = path.resolve(__dirname, '../');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { NODE_ENV } = process.env
const source = config[NODE_ENV];


module.exports = merge(common, {
    mode: 'production',
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: 'static/[name].[chunkhash].js',
        path: path.resolve(__dirname, `../${config.assetsSubDirectory}`),
        chunkFilename: '[name].bundle.js',
        publicPath: source.isdev ? source.publicPath : `${source.baseurl}/${source.publicPath}${config.assetsSubDirectory}/`,  // `${baseurl}/${publicPath}${assetsSubDirectory}/` 
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: 'css-loader',// translates CSS into CommonJS
                }],
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader?modules']
                })
            },


        ]
    },

    externals: {
        //用来告诉在 Webpack要构建的代码中使用了哪些不用被打包的模块，避免二次打包
        jquery: 'jQuery',
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    //4.0配置
    optimization: {
        // splitChunks: {
        //     cacheGroups: {// 提起公共的模块， 有vender 来决定
        //         commons: {
        //             test: /[\\/]node_modules[\\/]/,
        //             name: "vendor",// 但是每次vvendor 每次都会变化hash 我们不希望它变化,  所以我们使用dell
        //             chunks: "all"
        //         }
        //     }
        // }
    },

    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: path.join(rootPath, `${config.assetsSubDirectory}`, '/site/vendor-manifest.json'),
        }),
        new UglifyJSPlugin({
            sourceMap: true,
            // comments: false,
            // // Compression specific options
            // compress: {
            //     // remove warnings
            //     warnings: false,
            //     // Drop console statements
            //     drop_console: true
            // },
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin({
            filename: 'static/[name].[hash].css'
        })
    ],
})

