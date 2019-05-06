//  异步串行瀑布
//  如果传null 就继续传送如果是其他就是error, 不在传送


class AsyncSeriesWaterfallHook {
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
    callAsync(...args) {
        let callBack = args.pop(),
            i = 0;
        let next = (key, result) => {
            if (key === null && i < this.tasks.length) {
                let task = this.tasks[i++];
                task(result, next)
            } else {
                callBack();
            }
        }
        next(null, ...args);
    }
}

class Lesson {
    constructor() {
        this.index = 0;
        this.hooks = {
            arch: new AsyncSeriesWaterfallHook(['name'])
        };
    }
    tap() {
        this.hooks.arch.tapAsync('node', function (name, call) {
            setTimeout(() => {
                console.log('node', name);
                call(null, 'result');
            }, 1000);
        });
        this.hooks.arch.tapAsync('react', function (name, call) {
            setTimeout(() => {
                console.log('react', name);
                call(null, 'learn');
            }, 2000);
        });
        this.hooks.arch.tapAsync('learn', function (name, call) {
            setTimeout(() => {
                console.log('learn', name);
                call(null, 'learn');
            }, 3000);
        });
        // this.hooks.arch.tapPromise('nodePromise', function (name) {
        //     return new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //             console.log('nodePeomise', name);
        //             resolve();
        //         }, 2000);
        //     });
        // });
        // this.hooks.arch.tapPromise('reacPromiset', function (name) {
        //     return new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //             console.log('reactPromise', name);
        //             resolve();
        //         }, 1000);
        //     });
        // });
    }
    start() {
        this.hooks.arch.callAsync('isam2018', function () {
            console.log('我是回调')
        });
        // this.hooks.arch.promise('isam2018').then(function () {
        //     console.log('我是回调');
        // });
    }
}
let l = new Lesson();
l.tap();
l.start();