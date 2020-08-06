import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import { getLoginStatus } from "@/redux/modules/login";
class PrivateRoute extends Component {
    render() {

        const { loginStatus,component:Component, ...rest  } = this.props;

        return (
                <Route 
                    {...rest}
                    render={ (props)=>{
                        return loginStatus?(
                            <Component {...props} />
                        ):<Redirect 
                            to={{
                                pathname:"/login",
                                state:{from:props.location}
                            }}
                        />
                    } }
                />
            );
    }
}



const getStateToProps = (state,props)=>{
    return {
        loginStatus:getLoginStatus(state),
    }
}
export default connect(getStateToProps,null)(PrivateRoute);