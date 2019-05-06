//  异步串行瀑布
//  如果传null 就继续传送如果是其他就是error, 不在传送
let {
    AsyncSeriesWaterfallHook
} = require('tapable');

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
            }, 1000);
        });
        this.hooks.arch.tapAsync('learn', function (name, call) {
            setTimeout(() => {
                console.log('learn', name);
                call(null, 'learn');
            }, 1000);
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