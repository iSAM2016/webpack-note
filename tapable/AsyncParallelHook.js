// 异步并行执行钩子
// 异步的钩子(可是是串行)-如果并行 需要等待所有并发的异步事件执行后再执行回调函数
// 同时发送多个请求
// 执行方法 分为 tap 执行 tapAsync 是异步回调

class AsyncParallelHook {
    constructor() {
        this.tasks = [];
        this.tasksPromise = [];
    }
    tapAsync(name, task) {
        this.tasks.push(task);
    }
    tapPromise(name, task) {
        this.tasksPromise.push(task);
    }
    promise() {
        let promises = this.tasksPromise.map(_ => _(...arguments));
        return Promise.all(promises);
    }

    callAsync() {
        let i = 0,
            args = Array.from(arguments),
            callBack = args.pop(),
            tasks = this.tasks;

        function done() {
            if (i++ === tasks.length) {
                callBack();
            }
        }
        this.tasks.forEach(_ => {
            _(...args, done);
        });
    }
}

class Lesson {
    constructor() {
        this.index = 0;
        this.hooks = {
            arch: new AsyncParallelHook(['name'])
        };
    }
    tap() {
        // this.hooks.arch.tapAsync('node', function (name, call) {
        //     setTimeout(() => {
        //         console.log('node', name);
        //         call()
        //     }, 1000);
        // });
        // this.hooks.arch.tapAsync('react', function (name, call) {
        //     setTimeout(() => {
        //         console.log('react', name);
        //         call()
        //     }, 1000);
        // });
        this.hooks.arch.tapPromise('nodePromise', function(name) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('nodePeomise', name);
                    resolve();
                }, 2000);
            });
        });
        this.hooks.arch.tapPromise('reacPromiset', function(name) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('reactPromise', name);
                    resolve();
                }, 1000);
            });
        });
    }
    start() {
        // this.hooks.arch.callAsync('isam2018', function () {
        //     console.log('我是回调')
        // });
        this.hooks.arch.promise('isam2018').then(function() {
            console.log('我是回调');
        });
    }
}
let l = new Lesson();
l.tap();
l.start();
