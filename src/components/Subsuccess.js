import React, { Component } from 'react';

import './subsceeess.scss';
import Group from 'assets/group/Group.png'

class Subsuccess extends Component {
    render() {

        return (
            <main className="home-container">
                <div className="common-title"><img src={Group}></img></div>
                <div className="record-list">提交成功</div>
                <div className="common-title-1">奖品将于3-7个工作日寄出</div>
            </main>
        );
    }
}

export default Subsuccess;
