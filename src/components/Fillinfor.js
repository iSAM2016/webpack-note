import React, { Component } from 'react';
import TouchableOpacity from 'components/TouchableOpacity/TouchableOpacity';

import './home.scss';

class Fillinfor extends Component {

    state = {
        alertStatus: false, //弹框状态
        alertTip: '', //弹框提示文字
        formData: {
            name: '',
            phoneNo: '',
            orderSum: '',
        }
    }
    /**
     * 已选择的商品数据
     * @type {Array}
     */
    selectedProList = [];

    /**
     * 将表单数据保存至redux，保留状态
     * @param  {string} type  数据类型 orderSum||name||phoneNo
     * @param  {object} event 事件对象
     */
    handleInput = (type, event) => {
        let value = event.target.value;
        switch (type) {
            case 'name':
                break;
            case 'phoneNo':
                value = this.padStr(value.replace(/\D/g, ''), [3, 7], ' ', event.target);
                break;
            case 'orderSum':
                break;

            default: ;
        }
        // this.props.saveFormData(value, type);
    }
    // 提交表单
    sumitForm = () => {
        const { orderSum, name, phoneNo } = this.props.formData;
        let alertTip = '';
        if (
            !name.toString().length) {
            alertTip = '请填写收货人';
        } else if (
            !phoneNo.toString().length) {
            alertTip = '请填写联系电话号';

        } else if (
            !orderSum.toString().length) {
            alertTip = '请填写详细地址';
        } else {
            alertTip = '提交后将不能修改，是否确认地址无误？';
            this.props.clearSelected();
            this.props.clearData();
        }
        this.setState({
            alertStatus: true,
            alertTip,
        })
    }

    // 关闭弹款
    closeAlert = () => {
        this.setState({
            alertStatus: false,
            alertTip: '',
        })
    }

    render() {

        return (
            <main className="fillinfor-container">
                {/* <PublicHeader title='兑换奖品' record /> */}
                <div className="fillinfor-title">请填写下方信息领取奖品</div>
                <div className="fillinfor-title-1">奖品将于3-7个工作日寄出</div>
                <form className="fillinfor-form">

                    <div className="content">
                        <span>收货人</span>
                        <input type="text" placeholder="请输入收货人姓名" value={this.state.formData.name} onChange={this.handleInput.bind(this, 'name')} />
                        <hr />
                    </div>

                    <div className="content">
                        <span>联系电话</span>
                        <input placeholder="+86" type="text" maxLength="13" value={this.state.formData.phoneNo} onChange={this.handleInput.bind(this, 'phoneNo')} />
                        <hr />
                    </div>

                    <div className="content ">
                        <span className="add ">详细地址</span>
                        <textarea type="text" className="address " placeholder="请输入详细地址信息，如街道，门牌号，小区，楼栋号，单元室等" value={this.state.formData.orderSum} onChange={this.handleInput.bind(this, 'orderSum')} />
                        <hr className="line" />
                    </div>
                </form>

                <TouchableOpacity className="submit-btn" clickCallBack={this.sumitForm} text="提交" />
                {/* <PublicAlert closeAlert={this.closeAlert} alertTip={this.state.alertTip} alertStatus={this.state.alertStatus} /> */}
            </main>
        );
    }
}

export default Fillinfor;
