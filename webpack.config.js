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
            },
            {
                test: /\.png/,
                //  目的就是生成一个MD5 发射到dist 目录下， file-loader 还会返回当前的图片路径
                use: {
                    loader: 'file-loader'
                }
            },
            // 默认是从右向左, 从下到上
            //  oader 的分类pre 在前边 post 在后边 normal
            // loader 的顺序 pre + normal + inline + post
            {
                test: /\.less/,
                use: [
                    // 最后一个loader 需要返回脚本
                    path.resolve(__dirname, 'loaders', 'style-loader'),
                    path.resolve(__dirname, 'loaders', 'css-loader'),
                    path.resolve(__dirname, 'loaders', 'less-loader')
                ]
            }
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
