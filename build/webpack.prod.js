const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const config = require('../config');
const webpack = require('webpack');
const rootPath = path.resolve(__dirname, '../');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { NODE_ENV } = process.env;
const source = config[NODE_ENV];

module.exports = merge(common, {
    // 如果方式是prod 模式，默认会开启 uglifyjs assetsCssPlugin ，如果主动声明 optimization。 则需要配置  uglifyjs assetsCssPlugin
    mode: 'production',
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'static/[name].[chunkhash].js',
        path: path.resolve(__dirname, `../${config.assetsSubDirectory}`),
        chunkFilename: '[name].bundle.js',
        publicPath: source.isdev
            ? source.publicPath
            : `${source.baseurl}/${source.publicPath}${
                  config.assetsSubDirectory
              }/` // `${baseurl}/${publicPath}${assetsSubDirectory}/`
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'css-loader' // translates CSS into CommonJS
                    }
                ]
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                })
            },
            //处理顺序为从后到前，即先交给 sass-loader 处理，再将结果交给 css-loader,最后交给 style - loader
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader?modules']
                })
            }
        ]
    },

    externals: {
        //用来告诉在 Webpack要构建的代码中使用了哪些不用被打包的模块，避免二次打包
        jquery: 'jQuery',
        react: 'React',
        'react-dom': 'ReactDOM'
    },
    //4.0配置
    // optimization: {
    // 提取公共代码
    // splitChunks: {
    //     cacheGroups: {// 提起公共的模块（第三方）， 有vender 来决定， 在单页面的情况下，我们写的公共代码也不会重复引用，但是在多页面会被重复引用
    //         commons: {
    //             test: /[\\/]node_modules[\\/]/,
    //             name: "vendor",// 但是每次vvendor 每次都会变化hash 我们不希望它变化,  所以我们使用dell, 并且webpack
    //             chunks: "all"
    //         }
    //     }
    // },
    // minimizer: [
    //     new UglifyJsPlugin({
    //         cache: true,//启动缓存
    //         parallel: true,//启动并行压缩
    //         //如果为true的话，可以获得sourcemap
    //         sourceMap: true // set to true if you want JS source maps
    //     }),
    //     //压缩css资源的
    //     new OptimizeCSSAssetsPlugin({})
    // ]
    // },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: path.join(
                rootPath,
                `${config.assetsSubDirectory}`,
                '/site/vendor-manifest.json'
            )
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin({
            filename: 'static/[name].[hash].css'
        })
    ]
});
