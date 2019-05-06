// 异步串行钩子

class AsyncSeriesHook {
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
        let [first, ...task] = this.tasksPromise;
        return task.reduce((a, b) => {
            // TODO: 需要理解一下
            return a.then(() => b())
        }, first(...arguments));

    }
    callAsync(...args) {
        let i = 0,
            callBack = args.pop();

        let next = () => {
            if (i === this.tasks.length) {
                return callBack();
            }
            let task = this.tasks[i++];
            task(...args, next);
        };
        next();
    }
}

let queue = new AsyncSeriesHook(['name']);
console.time('cost');

queue.tapPromise('nodePromise', function (name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('nodePeomise', name);
            resolve();
        }, 2000);
    });
});
queue.tapPromise('reacPromiset', function (name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('reactPromise', name);
            resolve();
        }, 1000);
    });
});

queue.promise('isam2018').then(function () {
    console.log('我是回调');
});

// queue.tapAsync('1', function (name, callback) {
//     setTimeout(function () {
//         console.log(1);
//         callback();
//     }, 4000);
// });
// queue.tapAsync('2', function (name, callback) {
//     setTimeout(function () {
//         console.log(2);
//         callback();
//     }, 2000);
// });
// queue.tapAsync('3', function (name, callback) {
//     setTimeout(function () {
//         console.log(3);
//         callback();
//     }, 3000);
// });

// queue.callAsync('zfpx', err => {
//     // console.log(err);
//     console.timeEnd('cost');
// });