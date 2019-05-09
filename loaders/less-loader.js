let less = require('less');
function loader(content) {
    let css = '';
    less.render(content, function(err, c) {
        css = c.css;
    });
    // console.log(css);
    css = css.replace(/\n/g, '\\n');
    return css;
}
module.exports = loader;
