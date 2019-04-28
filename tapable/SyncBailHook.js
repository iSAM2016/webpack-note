/****
 * 串行同步执行，有一个返回值不为null 则跳过剩下的逻辑
 */
class SyncBailHook {
    constructor() {
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call() {
        let i = 0,
            ret = "";
        do {
            ret = this.tasks[i++](...arguments);
        } while (!ret && i < this.tasks.length);

    }
}

let queue = new SyncBailHook(['name']);
queue.tap('1', function (name) {
    console.log(name, 1);
});
queue.tap('2', function (name) {
    console.log(name, 2);
    return 'wor';
});
queue.tap('3', function (name) {
    console.log(name, 3);
});
queue.call('zfpx');