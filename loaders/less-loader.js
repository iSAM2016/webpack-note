let less = require('less');

function loader(content) {
    console.log(0);
    let css = '';
    less.render(content, function(err, c) {
        css = c.css;
    });
    // console.log(css);
    css = css.replace(/\n/g, '\\n');
    return css;
}
module.exports = loader;
