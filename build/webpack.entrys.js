var path = require('path'); // commonJS 规范
//定义了一些文件夹的路径
//  expose-loader
// 把 $ 暴露在window 上

var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin') //将css 提取出来

module.exports = {
    mode: 'development',
    entry: {
        index: './src/many/index.js',
        other: './src/many/other.js'
    },
    //输出的文件名 合并以后的js会命名为bundle.js
    // 如果entry 是一个string或array 就会生成一个chunk,这时chunk 的名字是main
    // 如果entry 是个object 就会生成多个 chunk
    output: {
        filename: '[name].bundle.js', // 如果是[name] 默认输入main.js
        path: path.resolve(__dirname, '../src/many/dist') //绝对路径
        // filename: '[name].[chunkhash:4].js'
        // path: path.resolve(__dirname, './build'),// 绝对路径
    },
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true, //热替换
        contentBase: path.join(__dirname, ''), // 配置DEVServer HTTP 服务器文件根目录
        progress: true,
        // host: '',//若想让局域网中的其他设备访问自己的本地服务
    },
    module: {
        // 优化那些不进行模块的解析
        noParse: '/jQuery', //  自己写的
        rules: [{
                // 打包第三方库
                test: require.resolve('jquery'),
                use: {
                    loader: 'expose-loader?$',
                },
                options: {
                    $: ''
                }
            }, {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',

                },
                enforce: 'post'
            }, //用正则表达式去匹 配要用该 Loader 转换的 css 文件 
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }, {
                test: /\.scss$/,
                //使用一组 Loader 去处理 scss 文件
                //处理顺序为从后到前，即先交给 sass-loader 处理，再将结果交给 css-loader,最后交给 style - loader
                // style-loader 把css 放在 style 
                use: ['style-loader', 'css-loader', 'sass-loader'], //排除 node modules 目录下的文件
                exclude: path.resolve(__dirname, 'node_modules'),
            }
        ]
    },
    // 配置模块的寻找规则
    resolve: {
        // 模块别名
        alias: {
            // 别名
            components: './src/'
        },
        // 配置webpack 模块寻找目录，为array默认只会去node_modules, 
        modules: [path.resolve(__dirname, './app/components'), 'node_modules'],
    },
    plugins: [
        new HtmlwebpackPlugin({
            template: './index.html',
            title: 'Hello World app',
            chunks: ['index'],
            filename: 'index.html'
        }),
        new HtmlwebpackPlugin({
            template: './index.html',
            title: 'Hello World app',
            chunks: ['other'],
            filename: 'other.html'
        }),
        new ExtractTextPlugin({
            filename: "[name].[chunkhash:4].css",
            disable: false,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin() // 热模块替换插件
        // CommonsChunkPlugin  所有页面的用到的公共代码提交到common代码中
        //config.optimization.splitChunks
        // new webpack.optimize.CommonsChunkPlugin({
        //   name: 'manifest',
        // })
    ]
};