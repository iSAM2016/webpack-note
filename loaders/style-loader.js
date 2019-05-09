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
module.exports = loader;
