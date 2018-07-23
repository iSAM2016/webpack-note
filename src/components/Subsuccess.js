import React, { Component } from 'react';

import './subsceeess.scss';
import Group from 'assets/group/Group.png'

class Subsuccess extends Component {
    render() {

        return (
            <main className="subsuccess-container">
                <div className="subsuccess-title"><img src={Group}></img></div>
                <div className="subsuccess-list">提交成功</div>
                <div className="subsuccess-title-1">奖品将于3-7个工作日寄出</div>
            </main>
        );
    }
}

export default Subsuccess;
