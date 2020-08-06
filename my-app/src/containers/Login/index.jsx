import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";

import LoginHeader from "./components/LoginHeader";
import LoginForm from "./components/LoginForm";

import {
    actions as loginActions,
    getLogin,
    getLoginStatus,
} from "@/redux/modules/login";
class Login extends Component {

    state={
        loading:"",
    }

 

    onFinish=(values)=>{
        const { telephone,password } = values;
        this.setState({
            loading:true
        })
        const { loginActions } = this.props;
        const { loginData } = loginActions;
        loginData( `${telephone}`,password );
        
    }

    render() {
        console.log( this.props )
        const { getLoginStatus,location:{state} } = this.props;
       if( getLoginStatus ) {
           //跳转回原来的页面
           if(state && state.from) {
                return <Redirect  to={state.from.pathname} />
           }
           return <Redirect  to="/" />
       }


        return (
            <div>
               <LoginHeader /> 

               <LoginForm
                    onFinish={ this.onFinish }
                    loading={this.state.loading}
               />
            </div>
        );
    }
}

Login.propTypes = {
    getLoginStatus:PropTypes.bool.isRequired,
    location:PropTypes.object.isRequired
};


const mapStateToProps = (state,props)=>{
    return{
        getLoginData:getLogin(state),
        getLoginStatus:getLoginStatus(state),
    }
}
const mapDispatchToProps = (dispatch,props)=>{
    return {
        loginActions:bindActionCreators(loginActions,dispatch),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);