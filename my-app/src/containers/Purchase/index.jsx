import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators }  from 'redux'


import {
    actions as purchaseActions,
    getOrderInfo,
    getPrice,
    getOrderNums,
    getTotalPrice
} from "@/redux/modules/purchase";
import Header from "../../components/Header";
import PurChaseForm from "./components/PurchaseForm";
import { message } from 'antd';
class PurChase extends Component {

    onBack=()=>{
        this.props.history.goBack();
    }

    componentDidMount(){
        const { purchaseActions } = this.props;
        const userId = 18302090015;
        const thId = 1080
        purchaseActions.orderInfo(userId,thId);//这里需要传入用户ID(一般localStorage)和物品的ID(一般从url中获取)，因为后台没有设置，所以这里的就省略了
    }
    changeNums=(value)=>{
        const { purchaseActions } = this.props;
        const { orderNums } = purchaseActions;
        orderNums(value);
    }
    onSubmitForm=(formField,telePhone,totalPrice)=>{
        if(!totalPrice || totalPrice === 0) {
            message.info("没有购买，请对物品进行选择...");
            return;
        }
        message.info("支付成功，即将为了跳转个人订单中心!");
        setTimeout(()=>{
            this.props.history.push("/user");
        },1000)
        //这个函数是向后台提交表单的
        //formField(Form表单字段),telePhone(电话号码),totalPrice(总价格)
    }
    render() {
        console.log( this.props )
        const {
            price,orderInfo,orderNums,totalPrice
        } = this.props;
        return (
            <div>
                <Header title="提交订单" color={"#EDEDED"} onBack = { this.onBack }  />
                {
                    Object.keys(orderInfo.data).length>0?(
                        <PurChaseForm 
                            price={price}
                            orderInfo={orderInfo.data}
                            changeNums={this.changeNums}
                            orderNums={orderNums}
                            totalPrice={totalPrice}
                            onSubmitForm={this.onSubmitForm}
                        />
                    ):null
                }
                
            </div>
        );
    }
}

PurChase.propTypes = {
    price:PropTypes.number.isRequired,
    orderInfo:PropTypes.object.isRequired,
    orderNums:PropTypes.number.isRequired,
    totalPrice:PropTypes.number.isRequired
};

const mapStateToProps = (state,props)=>{
    return {
        orderInfo:getOrderInfo(state),
        price:getPrice(state),
        orderNums:getOrderNums(state),
        totalPrice:getTotalPrice(state)
    }
}
const mapDispatchToProps = (dispatch,props)=>{
    return {
        purchaseActions:bindActionCreators(purchaseActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PurChase);