const path = require('path');

class P {
    apply(compiler) {
        compiler.hooks.emit.tap('emit', function() {
            console.log('emit');
        });
    }
}

module.exports = {
    mode: 'development',
    entry: './origin/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist') //绝对路径
    },
    resolveLoader: {
        //  设置loader 查找路径
        modules: [path.resolve(__dirname, 'loaders')]
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: {
                    loader: 'banner-loader',
                    options: {
                        text: 'siam2016',
                        filename: path.resolve(__dirname, './loaders/banner.js')
                    }
                }
            }
            // 默认是从右向左, 从下到上
            //  oader 的分类pre 在前边 post 在后边 normal
            // loader 的顺序 pre + normal + inline + post
            // {
            //     test: /\.less/,
            // use: [
            //     path.resolve(__dirname, 'loader', 'style-loader'),
            //     path.resolve(__dirname, 'loader', 'less-loader')
            // ]
            // use: ['loader3', 'loader2']
            /****
             *  loader 是由两部分组成， pitch 和 normal
             *
             */
            // {
            //     test: /\.js/,
            //     use: {
            //         loader: 'loader2'
            //     }
            // },
            // {
            //     test: /\.js/,
            //     use: {
            //         loader: 'loader3'
            //     }
            // }
        ]
    },
    plugins: [
        // 项目比较复杂的时候使用
        new P({})
    ]
};
