// 异步串行钩子
let {
    AsyncSeriesHook
} = require('tapable');

let queue = new AsyncSeriesHook(['name']);
console.time('cost');

queue.tapAsync('1', function (name, callback) {
    setTimeout(function () {
        console.log(1);
        callback();
    }, 1000);
});
queue.tapAsync('2', function (name, callback) {
    setTimeout(function () {
        console.log(2);
        callback();
    }, 2000);
});
queue.tapAsync('3', function (name, callback) {
    setTimeout(function () {
        console.log(3);
        callback();
    }, 3000);
});
queue.callAsync('zfpx', err => {
    // console.log(err);
    console.timeEnd('cost');
});