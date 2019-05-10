//  在引用图片的时候，是url 变为require
/****
 * body{
 * background: url(./img/dist/a.png) 
 * }
 * 需要url替换成 url(require(./img/dsit/a.png))， 需要进行分割, 然后导出
 */

function loader(source) {
    console.log(9)
    let reg = /url\((.+?)\)/g;
    let array = ['let list=[]'];
    let post = 0;
    let myArray;
    while ((myArray = reg.exec(source))) {
        let [fullurl, url] = myArray,
        last = reg.lastIndex - fullurl.length;

        array.push(`list.push(${JSON.stringify(source.slice(post, last))})`) // 'url(' 之前的内容
        array.push(`list.push('url('+require(${url})+')')`); // 添加require
        post = reg.lastIndex;
        // console.log(myArray)
    }
    array.push(`list.push(${JSON.stringify(source.slice(post))})`)
    array.push(`module.exports = list.join('')`);

    //  处理剩余字符
    console.log(array)
    return array.join('\r\n')
}




module.exports = loader;