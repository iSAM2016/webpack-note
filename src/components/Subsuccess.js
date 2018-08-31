import React, { Component } from 'react';
import Group from 'assets/group/Group.png'
import { hashHistory } from 'react-router';

import './subsceeess.less';

class Subsuccess extends Component {
    // 获取中奖纪录
    gotoindex = () => {
        hashHistory.push({
            pathname: '/index',
        })
    }
    render() {

        return (
            <main className="subsuccess-container">
                <div className="subsuccess-title"><img src={Group}></img></div>
                <div className="subsuccess-list">提交成功</div>
                <div className="subsuccess-title-1">奖品将于3-7个工作日寄出</div>
                <button className="enter" onClick={this.gotoindex}>返回首页</button>
            </main>
        );
    }
}

export default Subsuccess;
