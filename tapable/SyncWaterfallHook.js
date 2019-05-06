// 瀑布
class SyncWaterfallHook {
    constructor() {
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call() {
        // TODO: 第一次觉得tasks 有用
        let [first, ...tasks] = this.tasks;
        tasks.reduce((ret, task) => (task(ret)), first(...arguments));
    }
}

let queue = new SyncWaterfallHook(['name']);
//  多个连续函数有关系
queue.tap('1', function (name, age) {
    console.log(name, age, 1);
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