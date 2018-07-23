import React, { Component } from 'react';
import Artwork from 'assets/artwork/Artwork.png'
import './warning.scss';
class Warning extends Component {
    render() {
        return (
            <main className="home-container">
                <div className="common-title"><img src={Artwork}></img></div>
                <div className="record-list">暂无中奖信息</div>

            </main>
        );
    }
}
export default Warning;
