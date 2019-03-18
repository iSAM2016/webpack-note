const os = require('os');
const path = require('path');
const config = require('../config');
const webpack = require('webpack');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});
const { NODE_ENV } = process.env;
const global = {
    __BASEURL__: JSON.stringify(config[NODE_ENV].baseurl) //baseurl
};
module.exports = {
    resolve: {
        alias: {
            utils: path.resolve(__dirname, '../src/utils'),
            components: path.resolve(__dirname, '../src/components'),
            assets: path.resolve(__dirname, '../src/assets')
            // // 配置webpack 模块寻找目录，为array默认只会去node_modules,
            // modules: [path.resolve(__dirname, './src/components'), 'node_modules'],
        },
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            outputPath:
                                NODE_ENV === 'prod' || NODE_ENV === 'uat'
                                    ? 'static'
                                    : '',
                            name: '[hash].[ext]'
                        }
                    }
                ]
            },
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/
            },
            //  pre 在正常loader执行前执行
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                // enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve('src'),
                use: 'happypack/loader?id=js'
            }
        ]
    },
    externals: {
        //用来告诉在 Webpack要构建的代码中使用了哪些不用被打包的模块，避免二次打包
        jquery: 'jQuery'
    },

    plugins: [
        // 项目比较复杂的时候使用
        new HappyPack({
            id: 'js',
            use: [
                {
                    loader: 'babel-loader' //允许 HappyPack 输出日志
                }
            ],
            threadPool: happyThreadPool, //共享进程池
            cache: true,
            verbose: true
        }),
        //  可以约定那个包不在引用了
        //  monent 中的locale 全部不要引入
        //  可以单独引 import  monent/locale/zh_en
        new webpack.IgnorePlugin(/\.\locale/, /moment/),
        new HtmlWebpackPlugin({
            title: config.title,
            inject: true,
            template: './index.html',
            vconsole: config[NODE_ENV].isdev
                ? `<script src="https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/3.0.0/vconsole.min.js"></script>`
                : '',
            vconsole_js: config[NODE_ENV].isdev
                ? `<script>new VConsole()</script>`
                : ''
            // dll: config[NODE_ENV].isdev ? '<script src="./appActive/dll_vendor.js"></script>' : '',
        }),
        new webpack.DefinePlugin(global)
    ]
};
