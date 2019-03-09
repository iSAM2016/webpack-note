const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ROOT_PATH = path.resolve(__dirname);
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');
const { NODE_ENV } = process.env
const dist_dir = 'lottery'
let publicPathMap = {
    // 'dev': `/web/lottery/`,
    'dev': `/`,
    'uat': `/web/lottery/`,
    'prod': `//static.afanti100.com/web/wb/activity/${dist_dir}/`
}
let publicPath = ''

const global = {
    '__DEV__': true,
    '__test__': JSON.stringify({ a: '1234' })
}
if (NODE_ENV === 'prod') {
    global.__DEV__ = JSON.stringify(false)
    publicPath = publicPathMap[NODE_ENV]
    console.log('publicPath', publicPath)
    global.__BASEURL__ = JSON.stringify('//wb.afanti100.com')
} else if (NODE_ENV === 'uat') {
    global.__BASEURL__ = JSON.stringify('//uat-wb.afanti100.com')
    global.__DEV__ = JSON.stringify(true)
    publicPath = publicPathMap[NODE_ENV]
} else if (NODE_ENV === 'dev') {
    publicPath = publicPathMap[NODE_ENV]
    global.__BASEURL__ = JSON.stringify('//wb.lejent.cn')
}
console.log('global', global)

module.exports = {
    output: {
        publicPath,
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, dist_dir),
    },
    resolve: {
        alias: {
            // utils: path.resolve(__dirname, 'src/utils'),
            components: path.resolve(__dirname, 'src/components'),
            assets: path.resolve(__dirname, 'src/assets'),
            // // 配置webpack 模块寻找目录，为array默认只会去node_modules, 
            // modules: [path.resolve(__dirname, './src/components'), 'node_modules'],
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // limit: 8192,
                            // outputPath: NODE_ENV === 'prod' ? 'static' : '',
                            name: "[hash].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    externals: {
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '三好学生活动',
            inject: true,
            template: './index.html'
        }),
        new webpack.DefinePlugin(global)
    ],

}
