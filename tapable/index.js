const {
    SyncHook, // 串行同步
} = require('tapable');
let queue = new SyncHook(['name']);

queue.tap('1', function (name) {
    console.log(name, 1);
});
queue.tap('2', function (name) {
    console.log(name, 2);
});
queue.tap('3', function (name) {
    console.log(name, 3);
});
queue.call('zfpx');