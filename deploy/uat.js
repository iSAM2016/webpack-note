#!/usr/bin/env node
const config = require('../config')
const { NODE_ENV } = process.env
var shell = require("shelljs");

shell.exec(`echo 执行 uat- rsync -avzP ./${config.assetsSubDirectory}/ ${config[NODE_ENV].root}:${config[NODE_ENV].assetsRoot}`);
shell.exec(`rsync -avzP ./${config.assetsSubDirectory}/ ${config[NODE_ENV].root}:${config[NODE_ENV].assetsRoot}`);



