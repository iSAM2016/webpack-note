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
    //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
    // string array object
    /**
     * 如果是设置多个页面， 配置一个入口需要，方法是entry 设置一个函数动态得返回上面所说的配置
     * // 同步函数
     * entry: ()=> {
     *   return{
     *      a:’./pages/a’,
     *      b:’./pages/b ’,
     *   }
     * }
     * // 异步函数
     *  entry: ()=> {
     *   return new Promise(()=>{
     * 
     * })
     * }
     */
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
        https: false,
        compress: true, // 配置是否启用 Gzip 压缩 ，
        // allowedHosts[]  配置白域名
        // disableHostCheck 配置项用于配置是否关闭用于 DNS 重新绑定的 HTTP
        // open 用于在 DevServer 启动且 第一次构建完时，自动用我们的系统的 默 认浏览器去打开要开发的网页 
        headers: {
            'X-foo': 'bar',
        }, //配置项可以在 HTTP 响应中注入 一些 HTTP 响应头，使 用如下:
    },
    // 每个 Loader 都可以通过 URL querystring 的方式传入参数，例如 css-loader? minimize 中的 minimize 告诉 css-loader 要开启 css 压缩 。
    // use 属性的值需要是一个由 Loader 名称组成的数组， Loader 的执行顺序是由后到 前的
    // dev server 会把文件放到内存中
    module: {
        // 优化那些不进行模块的解析
        noParse: '/jQuery', //  自己写的
        rules: [{
                // 打包第三方库
                test: require.resolve('jquery'),
                use: {
                    loader: 'expose-loader?$',
                },
                // 在loader 中传入很多参数的时候需要一个Object来描述，options
                options: {
                    $: ''
                },
                //enforce :’post ’的含义是将该 Loader 的执行顺序放到最后
                //enforce 的值还可以是 pre，代表将 Loader 的执行顺序放到最前面 
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
/**
   * optimization: {
      splitChunks: {
        chunks: "initial",         // 必须三选一： "initial" | "all"(默认就是all) | "async"
        minSize: 0,                // 最小尺寸，默认0
        minChunks: 1,              // 最小 chunk ，默认1
        maxAsyncRequests: 1,       // 最大异步请求数， 默认1
        maxInitialRequests: 1,    // 最大初始化请求书，默认1
        name: () => {},              // 名称，此选项课接收 function
        cacheGroups: {                 // 这里开始设置缓存的 chunks
          priority: "0",                // 缓存组优先级 false | object |
          vendor: {                   // key 为entry中定义的 入口名称
            chunks: "initial",        // 必须三选一： "initial" | "all" | "async"(默认就是异步)
            test: /react|lodash/,     // 正则规则验证，如果符合就提取 chunk
            name: "vendor",           // 要缓存的 分隔出来的 chunk 名称
            minSize: 0,
            minChunks: 1,
            enforce: true,
            maxAsyncRequests: 1,       // 最大异步请求数， 默认1
            maxInitialRequests: 1,    // 最大初始化请求书，默认1
            reuseExistingChunk: true   // 可设置是否重用该chunk（查看源码没有发现默认值）
        }
      }
    }
  },
   */