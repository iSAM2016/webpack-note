let laoderUtils = require('loader-utils');

function loader(content) {
    // css
    //  创建style 标签
    let style = `
    let style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(content)}
    document.head.appendChild(style);
    `;
    return style;
}

// 剩余的请求
loader.pitch = function(remainingRequest) {
    // 让style-loader  处理 less-loader!css-loader/./index.less

    //  创建style 标签
    let style = `
    let style = document.createElement('style');
    style.innerHTML = require(${laoderUtils.stringifyRequest(
        this,
        '!!' + remainingRequest
    )});
    document.head.appendChild(style);
    `;
    return style;
};
module.exports = loader;
