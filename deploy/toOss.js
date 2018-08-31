const config = require('../config')
const { NODE_ENV } = process.env
console.log('nodeenv', NODE_ENV)
const glob = require('glob')
const oss = require('ali-oss').Wrapper
const ossRootPath = `${config.assetsSubDirectory}/**/**.*`

const spinner = ora('star to push oss...\n')
spinner.start()

const client = new oss({
    region: config.oss.region,
    accessKeyId: config.oss.accessKeyId,
    accessKeySecret: config.oss.accessKeySecret,
    //  accessKeyId    : 'LTAIVxvhF8ALQWVp',
    //  accessKeySecret: 'eIXGdFQM6yjgHICcZ99gXtRjrkzlnT',
    //  region         : 'oss-cn-beijing'
})
client.useBucket(config.oss.useBucket)

glob(ossRootPath, {}, (err, fileNames) => {
    let PromiseArr = fileNames.map(async (file) => {
        const baseDirName = config[NODE_ENV].publicPath;
        // const baseDirName = `web-development/wb/`
        return await client.put(`${baseDirName}${file}`, file)
    })
    Promise.all(PromiseArr)
        .then((res) => { console.log('成功', res) })
        .catch((err) => {
            console.log('失败了', err)
        })
})