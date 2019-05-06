// 异步的钩子(可是是串行)-如果并行 需要等待所有并发的异步事件执行后再执行回调函数
//  同时发送多个请求
//  执行方法 分为 tap 执行 tapAsync 是异步回调
let {
    AsyncParallelHook
} = require('tapable');

class Lesson {
    constructor() {
        this.index = 0;
        this.hooks = {
            arch: new AsyncParallelHook(['name'])
        };
    }
    tap() {
        this.hooks.arch.tapAsync('node', function (name, call) {
            setTimeout(() => {
                console.log('node', name);
                call()
            }, 1000);
        });
        this.hooks.arch.tapAsync('react', function (name, call) {
            setTimeout(() => {
                console.log('react', name);
                call()
            }, 1000);
        });
        this.hooks.arch.tapAsync('nodePromise', function (name) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('nodePeomise', name);
                    resolve()
                }, 1000);
            })

        });
        this.hooks.arch.tapAsync('reacPromiset', function (name) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('reactPromise', name);
                    resolve()
                }, 1000);
            });
        })
    }
    start() {
        this.hooks.arch.callAsync('isam2018', function () {
            console.log('我是回调')
        });
    }
}


let l = new Lesson();
l.tap();
l.start();