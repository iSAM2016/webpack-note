/**
 * 项目基本文件
 */

const config = {
    f2e: {
        gitUrl: 'http://git.lejent.cn/front-end/f2e_afanti_deploy.git',
        production: {
            gitBranch: 'master',
            servers: [
                {
                    address: 'web@10.51.50.57::f2e',
                    password: 'Aftwebtb169',
                }
            ]
        },
        staging: {
            gitBranch: 'release',
            servers: [
                {
                    address: 'web@10.51.50.57::f2e',
                    password: 'Aftwebtb169',
                }
            ]
        },
        development: {
            gitBranch: 'develop',
            servers: [
                {
                    address: 'web@10.51.50.57::f2e',
                    password: 'Aftwebtb169',
                }
            ]
        }
    },
    www: {
        gitUrl: 'http://git.lejent.cn/front-end/www_afanti_deploy.git',
        production: {
            gitBranch: 'master',
            servers: [
                {
                    address: 'web@ugc01::www',
                    password: 'Aftwebtb169'
                },
                {
                    address: 'web@ugc02::www',
                    password: 'Aftwebtb169'
                },
                // {
                //     address: 'web@ugc03::www',
                //     password: 'Aftwebtb169'
                // }
            ]
        },
        staging: null,
        development: null
    },
    // 作业吧
    zyb: {
        gitUrl: 'http://git.lejent.cn/front-end/zyb_afanti_deploy.git',
        _111production: {
            gitBranch: 'master',
            servers: [
                {
                    address: 'web@10.51.50.57::zyb',
                    password: 'Aftwebtb169'
                }
            ]
        },
        staging: null,
        development: null
    },
    // 双师
    dts: {
        gitUrl: 'http://git.lejent.cn/front-end/dts_afanti_deploy.git',
        _111production: {
            gitBranch: 'develop',
            servers: [
                {
                    address: 'dts@dts01:/data/dts/web/',
                    password: 'Aftdts1518'
                }
            ]
        },
        staging: null,
        development: null
    },
    // 1对1
    wb: {
        gitUrl: 'http://git.lejent.cn/front-end/wb_afanti_deploy.git',
        production: {
            gitBranch: 'master',
            servers: [
                {
                    address: 'wb@wb01::wb',
                    password: 'Aftwbtb168'
                },
                {
                    address: 'wb@wb02::wb',
                    password: 'Aftwbtb168'
                },
                {
                    address: 'wb@wb03::wb',
                    password: 'Aftwbtb168'
                }
            ]
        },
        staging: {
            gitBranch: 'release',
            servers: [
                {
                    address: ' web@inner57::wb_test',
                    password: 'Aftwebtb169'
                }
            ]
        },
        development: {
            gitBranch: 'develop',
            servers: [
                {
                    address: '/data/static/wb/',
                    password: ''
                }
            ]
        }
    },
    // 直播
    live: {
        gitUrl: 'http://git.lejent.cn/front-end/live_afanti_deploy.git',
        production: {
            gitBranch: 'master',
            servers: [
                {
                    address: 'web@live01::live',
                    password: 'Aftweblive1605'
                },
                {
                    address: 'web@live02::live',
                    password: 'Aftweblive1605'
                },
                {
                    address: 'web@live03::live',
                    password: 'Aftweblive1605'
                },
            ]
        },
        staging: {
            gitBranch: 'release',
            servers: [
                {
                    address: 'web@inner57::live_test',
                    password: 'Aftwebtb169'
                }
            ]
        },
        development: {
            gitBranch: 'develop',
            servers: [
                {
                    address: '/data/static/live/',
                    password: ''
                }
            ]
        }
    },
    // 高考
    gaokao: {
        gitUrl: 'http://git.lejent.cn/front-end/gaokao_afanti_deploy.git',
        production: {
            gitBranch: 'master',
            servers: [
                { // 林清：在gos01上gaokao用户下设置了rsync+inotify自动同步静态文件。详见邮件
                    address: 'web@gaokao01::gaokao',
                    password: 'Aftwebgaokao606'
                },
                { // 林清：目前就两个机器, 不提供自动同步了.
                    address: 'web@gaokao02::gaokao',
                    password: 'Aftwebgaokao606'
                },
            ]
        },
        staging: {
            gitBranch: 'release',
            servers: [
                {
                    address: 'web@inner57::gaokao_test',
                    password: 'Aftwebtb169'
                },
            ]
        },
        development: {
            gitBranch: 'develop',
            servers: [
                {
                    address: '/data/static/gaokao/',
                    password: ''
                }
            ]
        }
    },
    // 阿凡题辅导
    fudao: {
        gitUrl: 'http://git.lejent.cn/front-end/fudao_afanti_deploy.git',
        production: {
            gitBranch: 'master',
            servers: [
                {
                    address: 'web@ugc01::fudao',
                    password: 'Aftwebtb169'
                },
                {
                    address: 'web@ugc02::fudao',
                    password: 'Aftwebtb169'
                },
            ]
        },
        staging: {
            gitBranch: 'release',
            servers: [
                {
                    address: 'web@inner57::fudao_test',
                    password: 'Aftwebtb169'
                },
            ]
        },
        development: {
            gitBranch: 'develop',
            servers: [
                {
                    address: '/data/static/fudao/web/',
                    password: ''
                }
            ]
        }
    },
    // 汉语
    hanyu: {
        gitUrl: 'http://git.lejent.cn/front-end/hanyu_afanti_deploy.git',
        production: null,
        staging: {
            gitBranch: 'release',
            servers: [
                {
                    address: 'web@inner57::hanyu_test',
                    password: 'Aftwebtb169'
                },
            ]
        },
        development: null
    },
    // jiazhang.afanti100.com
    jiazhang: {
        gitUrl: 'http://git.lejent.cn/front-end/jiazhang_afanti_deploy.git',
        production: {
            gitBranch: 'master',
            servers: [
                {
                    address: 'jiazhang@wb01::jiazhang',
                    password: 'Aftjzweb180'
                },
                {
                    address: 'jiazhang@wb02::jiazhang',
                    password: 'Aftjzweb180'
                },
            ]
        },
        staging: {
            gitBranch: 'release',
            servers: [
                {
                    address: 'web@inner57::jiazhang_test',
                    password: 'Aftwebtb169'
                },
            ]
        },
        development: {
            gitBranch: 'develop',
            servers: [
                {
                    address: '/data/static/jiazhang/web/',
                    password: ''
                }
            ]
        }
    },
};


module.exports = config;

