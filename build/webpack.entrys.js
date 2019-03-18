/*
 * 多入口 配置
 *
 */
/**
 * Webpack 启动后会从Entry里配置的Module开始递归解析 Entry 依赖的所有 Module。
 * 每找到一个 Module， 就会根据配置的Loader去找出对应的转换规则，对 Module
 * 进行转换后，再解析出当前 Module 依赖的 Module。 这些模块会以 Entry 为单位进行分组，
 * 一个 Entry 和其所有依赖的 Module 被分到一个组也就是一个 Chunk。最后 Webpack 会把
 * 所有 Chunk 转换成文件输出。 在整个流程中 Webpack 会在恰当的时机执行 Plugin 里定义的逻辑。
 */
var path = require('path'); // commonJS 规范
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //将css 提取出来

module.exports = {
    // mode: 'development',
    mode: 'production',
    optimization: {
        // 提取（分割）公共代码 缓存使用
        //  把 a.js b.js 缓存起来使用
        splitChunks: {
            cacheGroups: {
                // 提起公共的模块（第三方）， 有vender 来决定， 在单页面的情况下，我们写的公共代码也不会重复引用，但是在多页面会被重复引用
                common: {
                    chunks: 'initial', // 入口中有公共的代码进行抽离
                    minSize: 0, // 只要有字节是公共的我就抽离
                    minChunks: 1, // 最少引用多少次进行抽离
                    // test: /[\\/]node_modules[\\/]/,
                    name: 'vendor'
                },
                vendor: {
                    priority: 1, // 优先级比 common 高
                    test: /node_modules/,
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2
                }
            }
        }
    },
    entry: {
        index: './src/many/index.js',
        other: './src/many/other.js'
    },
    //输出的文件名 合并以后的js会命名为bundle.js
    // 如果entry 是一个string或array 就会生成一个chunk,这时chunk 的名字是main
    // 如果entry 是个object 就会生成多个
    // Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
    // Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割
    output: {
        filename: '[name].bundle.js', // 如果是[name] 默认输入main.js
        path: path.resolve(__dirname, '../src/many/dist') //绝对路径
        // filename: '[name].[chunkhash:4].js'
        // path: path.resolve(__dirname, './build'),// 绝对路径
    },
    devtool: 'source-map',
    externals: {
        //用来告诉在 Webpack要构建的代码中使用了哪些不用被打包的模块，避免二次打包
        // jquery: 'jQuery',
        // jquery: '$'
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true, //热替换
        compress: true, // 开发服务器是否启动gzip等压缩
        contentBase: path.join(__dirname, ''), // 配置DEVServer HTTP 服务器文件根目录  配置开发服务运行时的文件根目录
        progress: true
        // host: '',//若想让局域网中的其他设备访问自己的本地服务
    },
    module: {
        // 优化那些不进行模块的解析
        // noParse: '/jQuery', //  自己写的
        rules: [
            // {
            //     // 打包第三方库
            //     // 解决第三方库的插件依赖问题, 有的插件是 依赖 window.$ 的，希望把$暴露在window 上
            //     // 1. 可以直接使用 // import $ from 'expose-loader?$jquery' 或者在options 里面
            //     // 2. webpack 添加 loader
            //     // 3. 使用 ProvidePlugin 插件暴露  jQuery
            //     test: require.resolve('jquery'),
            //     use: [
            //         {
            //             loader: 'expose-loader',
            //             options: 'jQuery'
            //         },
            //         {
            //             loader: 'expose-loader',
            //             options: '$'
            //         }
            //     ]
            // },
            {
                test: /\.(png|jpg|gif)$/,
                // url-loader 当图片小于limit的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝
                // file-loader 解决CSS等文件中的引入图片路径问题
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            outputPath: '',
                            name: '[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                enforce: 'post'
            }, //用正则表达式去匹 配要用该 Loader 转换的 css 文件
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.scss$/,
                //使用一组 Loader 去处理 scss 文件
                //处理顺序为从后到前，即先交给 sass-loader 处理，再将结果交给 css-loader,最后交给 style - loader
                // style-loader 把css 放在 style
                use: ['style-loader', 'css-loader', 'sass-loader'], //排除 node modules 目录下的文件
                exclude: path.resolve(__dirname, 'node_modules')
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
        modules: [path.resolve(__dirname, './app/components'), 'node_modules']
    },
    plugins: [
        new HtmlwebpackPlugin({
            /**
             * minify 是对html文件进行压缩，removeAttrubuteQuotes是去掉属性的双引号
             * hash 引入产出资源的时候加上查询参数，值为哈希避免缓存template 模版路径
             */
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
        //  自动加载模块，而不必到处 import 或 require
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new ExtractTextPlugin({
            filename: '[name].[chunkhash:4].css',
            disable: false,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin() // 热模块替换插件
    ]
};
