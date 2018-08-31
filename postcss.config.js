module.exports = {
    plugins: {
        'postcss-import': {},//在@import css文件的时候让webpack监听并编译
        // 'postcss-cssnext': {cssnext可以让你写CSS4的语言，并能配合autoprefixer进行浏览器兼容的不全，而且还支持嵌套语法
        //     browsers: ['iOS >= 8', 'Android >= 4']
        // },
        'autoprefixer': {
            browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
        },
    }
}