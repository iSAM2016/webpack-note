// 瀑布
const {
    SyncWaterfallHook
} = require('tapable');
let queue = new SyncWaterfallHook(['name']);

//  多个连续函数有关系
queue.tap('1', function (name) {
    console.log(name, 1);
    // 向下传递参数
    return 1;
});
queue.tap('2', function (data) {
    console.log(data, 2);
    return 2;
});
queue.tap('3', function (data) {
    console.log(data, 3);
});
queue.call('zfpx', 9);