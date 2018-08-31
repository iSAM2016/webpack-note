import React, { Component } from 'react';
import Artwork from 'assets/artwork/Artwork.png'
import './warning.less';
class Warning extends Component {
    render() {
        return (
            <main className="warning-container">
                <div className="warning-title"><img src={Artwork}></img></div>
                <div className="warning-list">暂无中奖信息</div>

            </main>
        );
    }
}
export default Warning;
