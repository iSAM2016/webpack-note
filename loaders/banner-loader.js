let laoderUtils = require('loader-utils');
let validateOptions = require('schema-utils'); // 校验options 是否符合规范
let fs = require('fs');

function loader(source) {
    //  可以拿到参数
    let options = laoderUtils.getOptions(this);
    let cb = this.async();
    console.log(options);
    let schema = {
        type: 'object',
        properties: {
            text: {
                type: 'string'
            },
            filename: {
                type: 'string'
            }
        }
    };
    validateOptions(schema, options, 'banner-loader');
    if (options.filename) {
        fs.readFile(options.filename, 'utf8', function(err, data) {
            cb(err, `/**${data}**/${source}`);
        });
    } else {
        cb(null, `/**${options.text}**${source}/`);
    }
}

module.exports = loader;
