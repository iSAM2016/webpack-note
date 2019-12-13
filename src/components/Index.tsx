import React, { Component } from 'react';
import './index.less';
import Modal from './modal';
// import Luckydog from './Luckydog'
// import request from 'utils/request'
import List from 'utils';
import { hashHistory } from 'react-router';
const classNames = require('classnames');
interface brokeRageState {
    is_modal_visible: boolean;
    is_goto_lottery: boolean; //是否允许抽奖: true
    finish_class_num: number; // 已经上的课程数
    needcourse: number; // 差的课数
    lottery_number: number; // 可以抽几次奖
    award_info_id: number; // 中奖ID
    chose_pro: {
        id: number;
        content: string;
        isvirtual: boolean;
        class: boolean;
        award_id: number; // 产品id
        name: string;
    }; // 选中的产品
    activedId: number;
    prizeId: number;
    times: number;
    actTimes: number;
    isRolling: boolean;
}

interface RowItemProps {
    content: any;
    activedId: number;
}

interface RowBtnProps {
    needcourse: number;
    beigin: any;
    is_goto_lottery: boolean;
}

// Item组件--所有格子的操作都可以在此进行，如果这些操作都能与"activedId"关联就更好了
class RowItem extends Component<RowItemProps, {}> {
    render() {
        const { content, activedId } = this.props;
        let nineItemClass = classNames('nine-item', {
            active: activedId === content.id ? true : false
        });
        return (
            <div className="nine-content">
                <div className={nineItemClass}>
                    <div className="nine-item_content">
                        <div className="nine-item_bgbox">
                            <div
                                className={`nine-item_bg ${content.class}`}
                            ></div>
                        </div>
                        <div className="nine-item_word">{content.content}</div>
                    </div>
                </div>
            </div>
        );
    }
}
class RowBtn extends Component<RowBtnProps, {}> {
    render() {
        const { needcourse, beigin, is_goto_lottery } = this.props;
        let nineItemClass = classNames('nine-item', {
            disabled: !is_goto_lottery, // 不可以抽奖
            normal: is_goto_lottery // 可以抽奖true
        });
        const getcontent = function() {
            if (is_goto_lottery) {
                return null;
            } else {
                return <span>您还差{needcourse}节课可参与抽奖</span>;
            }
        };
        return (
            <div
                className="nine-content"
                onClick={() => {
                    beigin();
                }}
            >
                <div className={nineItemClass}>{getcontent()}</div>
            </div>
        );
    }
}

class BrokeRage extends Component<{}, brokeRageState> {
    begin: any;
    constructor(props: any) {
        super(props);
        this.state = {
            is_modal_visible: false,
            is_goto_lottery: false, //是否允许抽奖: true
            finish_class_num: 0, // 已经上的课程数
            needcourse: 0, // 差的课数
            lottery_number: 0, // 可以抽几次奖
            award_info_id: 0, // 中奖ID
            chose_pro: {
                id: 0,
                content: '',
                isvirtual: false,
                class: false,
                award_id: 0, // 产品id
                name: ''
            }, // 选中的产品
            // 被选中的格子的ID
            activedId: 0,
            // 中奖ID
            prizeId: 0,
            // 获得prizeId之后计算出的动画次数
            times: 0,
            // 当前动画次数
            actTimes: 0,
            // 是否正在抽奖
            isRolling: false
        };
    }
    componentDidMount() {
        const promise = new Promise(function(resolve, reject) {
            // ... some code
            console.log(234567890);

            if (true) {
                resolve(12);
            } else {
            }
        });
        promise
            .then(
                function(value) {
                    console.log(value);
                    // success
                },
                function(error) {
                    console.log(error);
                    // failure
                }
            )
            .then(data => {
                console.log(data);
            });
        this.getLotteryInfor(); // 获取数据
    }
    //弹框控制
    handleModalToggle = (flag: boolean): void => {
        this.setState({
            activedId: 0,
            prizeId: 0,
            times: 0,
            actTimes: 0,
            isRolling: false
        });
        this.getLotteryInfor(); // 关闭页面刷新数据
        this.setState({
            is_modal_visible: flag
        });
    };
    //获取抽奖信息
    getLotteryInfor() {
        // request({
        //     url: '/api/lottery/6BjtwMFjTnZ/data/',//获取抽奖页面信息
        //     success: ({ data, meta }) => {
        //         // console.log(data)
        //         // 判断用户是否有权限抽取奖品
        //         if (data.status === 0) {
        //             // 可以抽
        //             this.setState({
        //                 is_goto_lottery: true,
        //                 finish_class_num: data.finish_class_num,
        //                 lottery_number: data.lottery_number,
        //             })
        //         } else {
        //             // 不可以抽奖
        //             this.setState({
        //                 is_goto_lottery: false,
        //                 needcourse: data.course,
        //                 finish_class_num: data.finish_class_num,
        //                 lottery_number: data.lottery_number,
        //             })
        //         }
        //     }
        // })
    }
    // 获取中奖纪录
    gotolist = () => {
        hashHistory.push({
            pathname: '/exchangelist'
        });
    };
    handleBegin = () => {
        // 不允许抽奖
        if (!this.state.is_goto_lottery) {
            return false;
        }
        // this.state.isRolling为false的时候才能开始抽，不然会重复抽取，造成无法预知的后果
        if (!this.state.isRolling) {
            // request({
            //     method: 'post',
            //     url: '/api/lottery/6BjtwMFjTnZ/',//取抽
            //     success: ({ data, meta }) => {
            //         let { award_id, award_info_id } = data;
            //         let proarray = List.filter(element => {
            //             return element.award_id === award_id
            //         });
            //         if (proarray.length > 1 || proarray.length === 0) {
            //             console.log('数据异常');
            //             return false;
            //         } else {
            //             console.log(award_id)
            //             this.setState({
            //                 chose_pro: proarray[0],
            //                 award_info_id
            //             })
            //         }
            //         // 点击抽奖之后，我个人做法是将于九宫格有关的状态都还原默认
            //         this.setState({
            //             activedId: '',
            //             prizeId: null,
            //             times: 0,
            //             actTimes: 0,
            //             isRolling: true
            //         }, () => {
            //             // 状态还原之后才能开始真正的抽奖
            //             this.handlePlay(proarray[0].id)
            //         })
            //     }
            // })
        }
    };
    handlePlay = (prize: number) => {
        // 阻止多次触发
        // 随机获取一个中奖ID
        // let prize = Math.floor(Math.random() * 7)
        console.log(prize);

        this.setState({
            prizeId: prize,
            activedId: 0
        });
        // 随机算出一个动画执行的最小次数，这里可以随机变更数值，按自己的需求来
        // let times = List.length * Math.floor(Math.random() * 5 + 4)
        this.setState({
            times: 20
        });
        // 抽奖正式开始↓↓
        this.begin = setInterval(() => {
            let num;
            if (
                this.state.activedId === this.state.prizeId &&
                this.state.actTimes > this.state.times
            ) {
                // 符合上述所有条件时才是中奖的时候，两个ID相同并且动画执行的次数大于(或等于也行)设定的最小次数
                clearInterval(this.begin);
                this.setState({
                    isRolling: false
                });
                this.handleModalToggle(true);
                return;
            }
            // 以下是动画执行时对id的判断
            if (this.state.activedId === null) {
                num = 0;
                this.setState({
                    activedId: num
                });
            } else {
                num = this.state.activedId;
                if (num === 7) {
                    num = 0;
                    this.setState({
                        activedId: num
                    });
                } else {
                    num = num + 1;
                    this.setState({
                        activedId: num
                    });
                }
            }
            this.setState({
                actTimes: this.state.actTimes + 1
            });
        }, 50);
    };
    componentWillUnmount() {
        this.begin && clearInterval(this.begin);
    }
    render() {
        const {
            activedId,
            is_modal_visible,
            is_goto_lottery,
            needcourse,
            lottery_number,
            finish_class_num,
            chose_pro,
            award_info_id
        } = this.state;
        return (
            <div className="goodstudent">
                {/* banner 图片 */}
                <div className="banner">
                    <div
                        className="btnlist"
                        onClick={() => {
                            this.gotolist();
                        }}
                    ></div>
                </div>
                {/* 中奖信息 */}
                {/* <Luckydog /> */}
                {/* 九宫格 */}
                <div className="nine">
                    <div className="nine-container">
                        <div className="nine-box">
                            <RowItem content={List[0]} activedId={activedId} />
                            <RowItem content={List[1]} activedId={activedId} />
                            <RowItem content={List[2]} activedId={activedId} />

                            <RowItem content={List[3]} activedId={activedId} />
                            <RowBtn
                                needcourse={needcourse}
                                beigin={this.handleBegin}
                                is_goto_lottery={is_goto_lottery}
                            />
                            <RowItem content={List[4]} activedId={activedId} />

                            <RowItem content={List[7]} activedId={activedId} />
                            <RowItem content={List[6]} activedId={activedId} />
                            <RowItem content={List[5]} activedId={activedId} />
                            {/* 100% 中奖 */}
                        </div>
                        <div className="topicon"></div>
                    </div>
                </div>
                {is_goto_lottery && (
                    <div className="classInfor">
                        {' '}
                        累计上课数{finish_class_num}节，可抽奖{lottery_number}次{' '}
                    </div>
                )}
                {/*奖品列表*/}
                <div className="prizes-list">
                    <div className="prizes-container">
                        <p className="title"> 奖品列表 </p>
                        <div className="prizes-box">
                            <ul>
                                <li className="head">
                                    <p className="prizes">奖品</p>
                                    <p className="rate">中奖率</p>
                                    <p className="sum">数量</p>
                                </li>
                                {List.map((comment, index) => (
                                    <li key={index}>
                                        <p className="prizes">{comment.name}</p>
                                        <p className="rate">{comment.rate}</p>
                                        <p className="sum">{comment.sum}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                {/*活动 规则*/}
                <div className="rule">
                    <p className="title">活动规则</p>
                    <p>
                        1. 在暑期期 间 ，当同学上课
                        课程累计满7节时，可获得《三好学生》抽奖机会一次；{' '}
                    </p>
                    <p>
                        2. 每人抽奖次数不限，
                        <span className="highlight">100%中奖</span>;
                    </p>
                    <p>3. 奖品抽完为止。</p>
                    <p className="title">奖品领取说明</p>
                    <p>1. 获得课程奖励的同学请通过联系自己学管来进行兑奖</p>
                    <p>
                        {' '}
                        2. 获得实物奖励的同 学 将于中奖后3- 7 个工作日以邮寄方式
                        寄出。
                    </p>
                </div>

                {/* <WinPopup /> */}
                {is_modal_visible && (
                    <Modal source={chose_pro} award_info_id={award_info_id} />
                )}
            </div>
        );
    }
}

export default BrokeRage;
