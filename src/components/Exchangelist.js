import React, { Component } from 'react';
import './exchangelist.scss';
import unconvertible from 'assets/weiduihuan.png'

import iphone from 'assets/iphone/iphone.png'
import data from 'assets/data/data.png'
import twoclass from 'assets/twoclass/twoclass.png'
import oneclass from 'assets/oneclass/oneclass.png'
import fly from 'assets/fly/fly.png'
import boss from 'assets/boss/boss.png'
import englishclass from 'assets/englishclass/englishclass.png'
import bodymony from 'assets/bodymony/bodymony.png'


class Exchangelist extends Component {
    render() {
        return (
            <main className="exchangelist-container">
                <div className="exchangelist-title">
                    <img src={unconvertible}></img>
                    <div className="exchangelist">
                        <div className="exchangelist-title-img"><img src={iphone}></img></div>
                        <div className="span">
                            <span className="">iPhoneX</span>
                            <span className="number">x1</span>
                        </div>
                        <div><span className="exchangelist-click">点击兑换</span></div>
                    </div>
                    <img src={unconvertible}></img>
                    <div className="exchangelist">
                        <div className="exchangelist-title-img"><img src={oneclass}></img></div>
                        <div className="span">
                            <span className="">一对一两节课程</span>
                            <span className="number">x2</span>
                        </div>
                        <div><span className="exchangelist-click">兑换中</span></div>
                    </div>
                    <img src={unconvertible}></img>
                    <div className="exchangelist">
                        <div className="exchangelist-title-img"><img src={oneclass}></img></div>
                        <div className="span">
                            <span className="">变身腰带</span>
                            <span className="number">x2</span>
                        </div>
                        <div><span className="exchangelist-click">待收货</span></div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Exchangelist;
