/****
 * 监听函数返回true表示继续循环，返回undefine表示结束循环
 */
class SyncLoopHook {
    constructor() {
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call() {
        let i = 0,
            ret = null;
        do {
            ret = this.tasks[i](...arguments);
        } while (ret === true || !(ret === undefined));

    }
}
let queue = new SyncLoopHook(['name']);
let count = 0;
queue.tap('1', function (name) {
    console.log(count++);
    if (count == 3) {
        return;
    } else {
        return true;
    }
});
queue.call('zfpx');