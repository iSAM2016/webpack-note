const {
    SyncHook // 串行同步
} = require('tapable');

class Lesson {
    constructor() {
        this.hooks = {
            arch: new SyncHook(['name'])
        };
    }
    tap() {
        //  注册监听函数
        this.hooks.arch.tap('node', function (name) {
            console.log('node', name);
        });
        this.hooks.arch.tap('react', function (name) {
            console.log('react', name);
        });
    }
    start() {
        this.hooks.arch.call('jw');
    }
}

let l = new Lesson();
l.tap();
l.start();
// let queue = new SyncHook(['name']);
// queue.tap('1', function (name) {
//     console.log(name, 1);
// });
// queue.tap('2', function (name) {
//     console.log(name, 2);
// });
// queue.tap('3', function (name) {
//     console.log(name, 3);
// });
// queue.call('zfpx');