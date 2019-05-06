const path = require('path');

module.exports = {
    mode: 'development',
    entry: './origin/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist') //绝对路径
    }
};
