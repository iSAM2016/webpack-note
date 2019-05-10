let laoderUtils = require('loader-utils');
let validateOptions = require('schema-utils'); // 校验options 是否符合规范
let fs = require('fs');

function loader(source) {
    //  可以拿到参数
    let filename = laoderUtils.interpolateName(this, '[hash].[ext]', {
        content: source
    });
    this.emitFile(filename, source);
    return `module.exports=${filename}`;
}
loader.raw = true; // 二进制
module.exports = loader;
