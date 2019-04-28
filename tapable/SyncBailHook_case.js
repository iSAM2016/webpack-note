//串行同步执行，有一个返回值不为null 则跳过剩下的逻辑
const {
    SyncBailHook // 串行同步
} = require('tapable');
let queue = new SyncBailHook(['name']);

queue.tap('1', function (name) {
    console.log(name, 1);
    return 'Wrong';
});
queue.tap('2', function (name) {
    console.log(name, 2);
});
queue.tap('3', function (name) {
    console.log(name, 3);
});
queue.call('zfpx');