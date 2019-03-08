import React, { Component } from 'react';
import './index.scss';
var classNames = require('classnames');

// Item组件--所有格子的操作都可以在此进行，如果这些操作都能与"activedId"关联就更好了
class RowItem extends Component {
    render() {
        const { content, activedId } = this.props;
        let nineItemClass = classNames('nine-item', {
            'active': activedId === content.id ? true : false
        })
        return (
            <div className='nine-content' >
                <div className={nineItemClass}>
                    <div className="nine-item_content">
                        <div className="nine-item_bgbox">
                            <div className={`nine-item_bg ${content.class}`}></div>
                        </div>
                        <div className="nine-item_word">{content.content}</div>
                    </div>
                </div>
            </div>
        )
    }
}

class RowBtn extends Component {
    render() {
        const { content, beigin } = this.props;
        let nineItemClass = classNames('nine-item', {
            'active': content.isWinning ? true : false
        })
        return (
            <div className='nine-content' onClick={() => { beigin() }}>
                <div className="nine-item normal">
                </div>
            </div>
        )
    }
}


class BrokeRage extends Component {
    constructor() {
        super()
        this.state = {
            // 九宫格内容list
            list: [{
                id: 0,
                content: 'iphone',
                class: 'iphone',
            },
            {
                id: 1,
                content: '升学学习资料',
                class: 'data',
            }, {
                id: 2,
                content: '一对一两节课',
                class: 'twoclass',
            }, {
                id: 3,
                content: '一对一一节课',
                class: 'oneclass',
            }, {
                id: 4,
                content: '航拍飞机',
                class: 'fly',
            }, {
                id: 5,
                content: '悠悠球',
                class: 'boss',
            }, {
                id: 6,
                content: '语数英录播课',
                class: 'englishclass',
            }, {
                id: 7,
                content: '变身腰带',
                class: 'bodymony',
            }],
            // 被选中的格子的ID
            activedId: '',
            // 中奖ID
            prizeId: null,
            // 获得prizeId之后计算出的动画次数
            times: 0,
            // 当前动画次数
            actTimes: 0,
            // 是否正在抽奖
            isRolling: false,
            // 中奖信息
            winning: {
                isWinning: true,// true 点击中奖   false 
                content: '',
            }

        }
    }
    handleBegin = () => {
        // this.state.isRolling为false的时候才能开始抽，不然会重复抽取，造成无法预知的后果
        if (!this.state.isRolling) {
            // 点击抽奖之后，我个人做法是将于九宫格有关的状态都还原默认
            this.setState({
                activedId: '',
                prizeId: null,
                times: 0,
                actTimes: 0,
                isRolling: true
            }, () => {
                // 状态还原之后才能开始真正的抽奖
                this.handlePlay()
            })
        }
    }
    handlePlay = () => {
        // 随机获取一个中奖ID
        let prize = Math.floor(Math.random() * 7)
        console.log(prize)
        this.setState({
            prizeId: prize,
            activedId: 0
        })
        // 随机算出一个动画执行的最小次数，这里可以随机变更数值，按自己的需求来
        let times = this.state.list.length * Math.floor(Math.random() * 5 + 4)
        this.setState({
            times: times
        })
        // 抽奖正式开始↓↓
        this.begin = setInterval(() => {
            let num;

            if (this.state.activedId === this.state.prizeId && this.state.actTimes > this.state.times) {
                // 符合上述所有条件时才是中奖的时候，两个ID相同并且动画执行的次数大于(或等于也行)设定的最小次数
                clearInterval(this.begin)
                this.setState({
                    isRolling: false
                })
                return
            }
            // 以下是动画执行时对id的判断
            if (this.state.activedId === '') {
                num = 0
                this.setState({
                    activedId: num
                })
            } else {
                num = this.state.activedId
                if (num === 11) {
                    num = 0
                    this.setState({
                        activedId: num
                    })
                } else {
                    num = num + 1
                    this.setState({
                        activedId: num
                    })
                }
            }
            this.setState({
                actTimes: this.state.actTimes + 1
            })

        }, 200)
    }


    render() {
        const { list, activedId, winning } = this.state;
        return (
            <div className="goodstudent">
                {/* banner 图片 */}
                <div className="banner"></div>
                {/* 中奖信息 */}
                <div className="inforbox">
                    <div className="inforbox-box">
                        <div className="inforbox-speaker">
                            <div className="icon"></div>
                        </div>
                        <div className="inforbox-content">
                            <div className="inforbox-item">恭喜 183***6789 抽中“航拍飞机”一台</div>
                            <div className="inforbox-item">恭喜 183***6789 抽中“航拍飞机”一台</div>
                            <div className="inforbox-item">恭喜 183***6789 抽中“航拍飞机”一台</div>
                            <div className="inforbox-item">恭喜 183***6789 抽中“航拍飞机”一台</div>
                        </div>
                    </div>
                </div>
                {/* <div onClick={() => this.handleBegin()}> 开始抽象</div> */}
                {/* 九宫格 */}
                <div className="nine">
                    <div className="nine-container">
                        <div className="nine-box">
                            <RowItem content={list[0]} activedId={activedId} />
                            <RowItem content={list[1]} activedId={activedId} />
                            <RowItem content={list[2]} activedId={activedId} />

                            <RowItem content={list[3]} activedId={activedId} />
                            <RowBtn content={winning} beigin={this.handleBegin} />
                            <RowItem content={list[4]} activedId={activedId} />

                            <RowItem content={list[5]} activedId={activedId} />
                            <RowItem content={list[6]} activedId={activedId} />
                            <RowItem content={list[7]} activedId={activedId} />
                            {/* 100% 中奖 */}
                        </div>
                        <div className="topicon"></div>
                    </div>
                </div>

            </div>
        );
    }
}

export default BrokeRage;

