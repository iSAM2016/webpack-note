// const config = require('../config')
// var shell = require("shelljs");
// const ora = require('ora');
// const chalk = require('chalk');
// const { NODE_ENV } = process.env
// const spinner = ora('star to push static...\n')

// spinner.start()
// console.log(chalk.cyan(` start run => rsync -avzP ./${config.assetsSubDirectory}/ ${config[NODE_ENV].root}:${config[NODE_ENV].assetsRoot}.\n`));

// shell.exec(`rsync -avzP ./${config.assetsSubDirectory}/ ${config[NODE_ENV].root}:${config[NODE_ENV].assetsRoot}`);
// spinner.stop()

const config = require('../config');
const global = config.global;
var path = require('path');
var shell = require('shelljs');
const ora = require('ora');
const chalk = require('chalk');
const node_ssh = require('node-ssh');
const ssh = new node_ssh();

// const spinner = ora('star to push static...\n')

// console.log(chalk.cyan(`scp -r ./${config.jsonPath}/web/*   XXX@dev01.bj.XXX.cc:/data/static/${config.jsonPath}/\n`));

// shell.exec(`scp -r ./${config.jsonPath}/web/*   XXX@dev01.bj.XXX.cc:/data/static/${config.jsonPath}/`);
// 'scp -r ./wb/fudao/m/180118/web/*  XXX@dev01.bj.XXX.cc:/data/static/wb/fudao/m/180118/'

/**
 * 连接服务器
 * @param {Object} sererConfig 项目配置
 */
async function ConnectService(sererConfig) {
    console.log('尝试连接服务：' + chalk.red(global.root));
    let spinner = ora('正在连接');
    spinner.start();
    await ssh.connect({
        host: sererConfig.host,
        username: sererConfig.username,
        password: sererConfig.password
    });
    // ss 密码)
    spinner.stop();
    console.log(chalk.green('成功连接到服务器'));
}

/**
 * 上传文件
 */
async function updateFile() {
    // 存储失败序列
    let failed = [];
    // 存储成功序列
    let successful = [];
    let spinner = ora('准备上传文件\n').start();
    console.log(
        chalk.green(
            `本地文件`,
            path.join(
                __dirname,
                `../${config.jsonPath}` + '/web',
                `服务器`,
                global.assetsRoot
            )
        )
    );
    // 上传文件夹
    let status = await ssh.putDirectory(
        path.join(__dirname, `../${config.jsonPath}` + '/web'),
        `${global.assetsRoot}`,
        {
            // 递归
            recursive: true,
            // 并发数
            concurrency: 10,
            tick(localPath, remotePath, error) {
                if (error) {
                    failed.push(localPath);
                } else {
                    // spinner.text = '正在上传文件：' + localPath
                    successful.push(localPath);
                }
            }
        }
    );
    spinner.stop();
    if (status) {
        console.log(chalk.green('完成上传'));
    } else {
        console.log(chalk.red('上传失败'));
    }
    if (failed.length > 0) {
        console.log(`一共有${chalk.red(failed.length)}个上传失败的文件`);
        console.log(failed);
    }
}

async function start(element) {
    // 连接服务器
    await ConnectService(element);
    // 上传文件
    await updateFile();
}

let server = config.global.server;
server.forEach((element, index) => {
    (index => {
        setTimeout(function() {
            start(element);
        }, 100 * index);
    })(index * 100);
});
