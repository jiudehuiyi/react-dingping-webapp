import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';

import ReactPullLoad, { STATS } from "react-pullload";

import UserHeader from "./components/UserHeader";
import UserContent from "./components/UserContent";
import QuanContent from "./components/QuanContent";
import { 
    actions as loginActions,
  } from "@/redux/modules/login";
import {
    actions as userActions,
    getUserHeaderSelect,
    getUserOrder,
    getUserQuan,
} from '@/redux/modules/user';
import {  message } from 'antd';
class User extends Component {

    state={
        action:STATS.init,
        showComment:false,
    }

    handleShowComment=()=>{
        this.setState({
            showComment:!this.state.showComment
        })
    }

    onBack = ()=>{
        window.history.back();
    }
    onLogout=()=>{
        const { loginActions } = this.props;
        loginActions.logout();
    }
    handleChange=(ev)=>{
        const { userActions  } = this.props;
        const value = ev.target.value;
        userActions.userHeaderSelectData(value)
    }

    componentDidMount(){
        this.getUserOrderFunc();
        this.getUserQuanFunc();
    }
    handleAction = action=>{  
        if (action === STATS.refreshing) {
            //刷新
            this.getUserOrderFunc();
            message.info("数据刷新成功!!!")
        } 
    }
    //获取订单数据
    getUserOrderFunc=(id)=>{
        
        const { userActions } = this.props;
        const { userOrder } = userActions;
        userOrder(id);
    }
    //获取抵用券数据
    getUserQuanFunc=()=>{
        const { userActions } = this.props;
        userActions.userQuan();
    }
    // 删除相应的订单
    handleDeleteOrder=(id)=>{
        this.getUserOrderFunc(id);
    }
    //评价订单
    handleCommentOrder = (id,current)=>{
        //这里应该向后台发送相应的评论数据请求，然后恢复评论，这里就不向后台发送了
        message.info("评论成功!!!");
        this.setState({
            showComment:false,
        })
    }

    render() {
        console.log(this.props);
        const { userHeaderSelect,userOrderData,userQuanData } = this.props;
        return (
            <div className="user">
                <ReactPullLoad 
                 handleAction={this.handleAction}
                 action={this.state.action}
                >
                <UserHeader
                   onBack={this.onBack}
                   onLogout={this.onLogout}
                   handleChange={this.handleChange}
                   userHeaderSelect={userHeaderSelect}
                />
                {
                    userHeaderSelect===0 && userOrderData.data.length>0 ?(
                    <UserContent 
                        userOrderData={userOrderData}
                        handleDeleteOrder={this.handleDeleteOrder}
                        handleCommentOrder={this.handleCommentOrder}

                        showComment={this.state.showComment}
                        handleShowComment={this.handleShowComment}
                    />
                    ):null

                }
                {
                    userHeaderSelect===1 && userQuanData.data.length>0?(
                        <QuanContent 
                            userQuanData={userQuanData}
                        />
                        ):null 
                }
                </ReactPullLoad>
                
            </div>
        );
    }
}

User.propTypes = {
    userHeaderSelect:PropTypes.number.isRequired,
    userOrderData :PropTypes.object.isRequired
};

const mapStateToProps = (state,props)=>{
    return {
        userHeaderSelect:getUserHeaderSelect(state),
        userOrderData:getUserOrder(state),
        userQuanData:getUserQuan(state)
    }
}
const mapDispatchToProps = (dispatch,props)=>{
    return {
        loginActions:bindActionCreators(loginActions,dispatch),
        userActions:bindActionCreators(userActions,dispatch),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(User);