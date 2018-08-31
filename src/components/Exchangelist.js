import React, { Component } from 'react';
import unconvertible from 'assets/weiduihuan.png'
import Artwork from 'assets/artwork/Artwork.png'
import request from 'utils/request'
import List from 'utils'
import './warning.less';
import './exchangelist.less';
import { hashHistory } from 'react-router';
const classNames = require('classnames');


class Exchangelist extends Component {
    constructor() {
        super()
        this.state = {
            prolist: '',
        }
    }
    //获取抽奖信息
    componentDidMount() {
        request({
            url: '/api/lottery/6BjtwMFjTnZ/awards/',//获取抽奖页面信息
            success: ({ data, meta }) => {
                console.log(data)
                // console.log(this.state.prolist);
                let keys = Object.keys(data);
                let source = keys.length === 0 ? false : [...data];
                // // 判断用户是否有权限抽取奖品
                console.log(source)
                this.setState({
                    prolist: source// 把中奖id 置空
                })
            }
        })
    }
    // 去填写信息
    gotoFillinfor = (isvirtual, item) => {
        if (isvirtual) {
            return 0;
        }
        console.log(item)
        if (!item.status) {
            hashHistory.push({
                pathname: '/fillinfor',
                query: { id: item.award_pid }
            })
        }

    }
    render() {
        let { prolist } = this.state;
        let self = this;
        // console.log(this.state.prolist);
        // 获取列表
        function getList() {
            let prolistArray = prolist.map((item, index) => {
                let contentArr = List.filter(sub => {
                    if (sub.award_id === item.award_pid) {
                        return sub
                    }
                })
                let exchangelist = classNames('exchangelist-click', {
                    'active': contentArr[0].isvirtual ? false : (item.status ? false : true)
                })
                return (
                    <div key={index}>
                        <img src={unconvertible}></img>
                        <div className="exchangelist">
                            <div className="exchangelist-title-img"><img src={contentArr[0].background}></img></div>
                            <div className="span">
                                <span className="">{contentArr[0].content}</span>
                                {/* <span className="number">x1</span> */}
                            </div>
                            <div><span className={exchangelist} onClick={() => { self.gotoFillinfor(contentArr[0].isvirtual, item) }}>{contentArr[0].isvirtual ? '兑换中' : (item.status ? '等待收货' : '点击兑换')}</span></div>
                        </div>
                    </div>
                )
            })
            return (
                <main className="exchangelist-container">
                    <div className="exchangelist-title">
                        {prolistArray}
                    </div>
                </main>
            )
        }

        function getnull() {
            return (

                <main className="warning-container">
                    <div className="warning-title"><img src={Artwork}></img></div>
                    <div className="warning-list">暂无中奖信息</div>

                </main>
            )

        }
        return (
            <div>
                {!prolist ? getnull() : getList()}
            </div>


        );
    }
}

export default Exchangelist;
