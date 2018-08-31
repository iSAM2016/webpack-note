import React, { Component } from 'react';
import request from 'utils/request'
import { hashHistory } from 'react-router';
import './home.less';
class ConfirmBox extends Component {
    render() {
        const {
            cancel,
            submit,
            modelcontent,
            isModeBtns,
        } = this.props;
        return (
            <div className="confirm-popup">
                <div className="confirm-box">
                    <p>{modelcontent} </p>
                    <div className="btn-box">
                        {(() => {
                            switch (isModeBtns) {
                                case true:
                                    return (
                                        <div>
                                            <button onClick={cancel}>我再改改</button>
                                            <button className="enter" onClick={submit}>已确认无误</button>
                                        </div>
                                    )
                                    break
                                case false:
                                    return (
                                        <div>
                                            <button className="enter" onClick={cancel}>我知道了</button>
                                        </div>
                                    )
                                    break
                            }
                        })()}
                    </div>
                </div>
            </div>
        )
    }
}

class Fillinfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            phoneNumber: "",
            address: "",
            errInfo: "",
            modal_visible: false,
            modelcontent: '提交后将不能修改，是否确认地址无误？',
            isModeBtns: true,

        }
    }
    //监听input中的数据，保存到state中
    changeUsername(e) {
        let uname = e.target.value;
        this.setState({
            userName: uname
        });
    }
    changePhoneNumber(e) {
        let phoneNumber = e.target.value;
        this.setState({
            phoneNumber: phoneNumber
        })
    }
    changeAddress(e) {
        let address = e.target.value;
        this.setState({
            address: address
        })
    }
    cancelSubmit() {
        this.setState({
            modal_visible: false
        })
    }
    submit() {
        let {
            userName,
            phoneNumber,
            address,
        } = this.state;
        let { id } = this.props.location.query;
        if (id === '') {
            alert('非法操作')
            return false;
        }
        let data = {
            award_id: id,
            accept_name: userName,
            accept_tel: phoneNumber,
            address,
        }
        request({
            data,
            method: 'post',
            url: '/api/lottery/6BjtwMFjTnZ/user_info/',//获取抽奖页面信息
            success: ({ data, meta }) => {
                if (meta.status !== 0) {
                    this.setState({
                        modelcontent: meta.msg,
                        isModeBtns: false,
                    })
                } else {
                    // 填写成功
                    hashHistory.push({
                        pathname: '/subsuccess',
                    })
                }
                // 判断用户是否有权限抽取奖品
            }
        })
    }
    //点击登录按钮，触发后台接口提供的验证，对数据的处理等方法
    handleClick() {
        console.log(this.state)
        const userName = this.state.userName || '',
            phoneNumber = this.state.phoneNumber || '',
            address = this.state.address || '';
        if (userName === "" || userName.length > 12) {
            this.setState({
                errInfo: "请输入12字以内用户名"
            })
            return
        }
        if (phoneNumber === "" || !/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(phoneNumber)) {
            this.setState({
                errInfo: "请输入正确格式手机号"
            })
            return
        }
        if (address === "" || address.length > 200) {
            this.setState({
                errInfo: "请输入200字以内地址"
            })
            return
        }

        this.setState({
            errInfo: " ",
            modal_visible: true,
            modelcontent: '提交后将不能修改，是否确认地址无误？',
            isModeBtns: true,
        })
    }

    render() {
        const {
            errInfo,
            modal_visible,
            modelcontent,
            isModeBtns,
        } = this.state;
        return (
            <main className="fillinfor-container">
                {/* <PublicHeader title='兑换奖品' record /> */}
                <div className="fillinfor-title">请填写下方信息领取奖品</div>
                <div className="fillinfor-title-1">奖品将于3-7个工作日寄出</div>
                <form className="fillinfor-form">

                    <div className="content">
                        <span>收货人</span>
                        <input type="text" maxLength="12" placeholder="请输入收货人姓名" name="username" onChange={this.changeUsername.bind(this)} />
                        <hr />
                    </div>

                    <div className="content">
                        <span>联系电话</span>
                        <input placeholder="+86" maxLength="13" type="number" name="phoneNumber"
                            onChange={this.changePhoneNumber.bind(this)} />
                        <hr />
                    </div>

                    <div className="content ">
                        <span className="add ">详细地址</span>
                        <textarea type="text" className="address " placeholder="请输入详细地址信息，如街道，门牌号，小区，楼栋号，单元室等"
                            maxLength="200" name="address" onBlur={this.changeAddress.bind(this)} />
                        <hr className="line" />
                    </div>
                </form>
                <span className="help-block">{errInfo}</span>

                <input type="button" className="submit-btn" value="提交"
                    onClick={this.handleClick.bind(this, this.state.userName, this.state.phoneNumber, this.state.address)}
                />


                {modal_visible && <ConfirmBox cancel={this.cancelSubmit.bind(this)} submit={this.submit.bind(this)} modelcontent={modelcontent} isModeBtns={isModeBtns} />}

            </main>
        );
    }
}

export default Fillinfor;



