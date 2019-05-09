let babel = require('@babel/core');
let laoderUtils = require('loader-utils');

function loader(source) {
    console.log(this.resourcePath);
    //  可以拿到参数
    let options = laoderUtils.getOptions(this);
    console.log(options);
    let cb = this.async();
    babel.transform(
        source,
        {
            ...options,
            sourceMap: true,
            fileName: this.resourcePath.split('/').pop() // 文件名字
        },
        function(err, result) {
            console.log(result);
            cb(err, result.code, result.map); //异步
        }
    );
}

module.exports = loader;
