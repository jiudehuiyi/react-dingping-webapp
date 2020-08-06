import React from "react";
import { connect } from "react-redux";
import { bindActionCreators  } from "redux";
import { BrowserRouter as Router ,Route, Switch } from "react-router-dom";
import Loadable from 'react-loadable';
import { Spin } from 'antd';

import ErrorToast from "@/components/ErrorToast";
import PrivateRoute from "@/containers/PrivateRoute"
import {  actions as appActions  , getError } from "@/redux/modules/app";


const Home = Loadable( {
    loader:()=>import("@/containers/Home"),
    loading(){
        return <Spin />
    }
} );
const ProductDetail = Loadable( {
    loader:()=>import("@/containers/ProductDetail"),
    loading(){
        return <Spin />
    }
} );

const Search = Loadable( {
    loader:()=>import("@/containers/Search"),
    loading(){
        return <Spin />
    }
} );

const SearchResult = Loadable( {
    loader:()=>import("@/containers/SearchResult"),
    loading(){
        return <Spin />
    }
} );

const Login = Loadable( {
    loader:()=>import("@/containers/Login"),
    loading(){
        return <Spin />
    }
} );

const User = Loadable( {
    loader:()=>import("@/containers/User"),
    loading(){
        return <Spin />
    }
} );

const PurChase = Loadable( {
    loader:()=>import("@/containers/Purchase"),
    loading(){
        return <Spin />
    }
} );
const CityList = Loadable({
    loader:()=>import("@/containers/CityList"),
    loading(){
        return <Spin />
    }
})

function App(props){
    const {
        error,
        appActions:{clearError}
    } = props;


    return(
        <div className="App">

            <Router>
                <Switch>
                    <Route exact path="/" component={Home}  />
                    {/* 第一种:
                        配置location.state中的参数
                        1.
                        <Route path="/login"  render={ (props)=>{
                            return <Login  location={ { state:{from:"cducu"} } }  {...props} />
                        } }  />
                        2.
                        <Redirect tp={{ 
                            pathname:"/login",
                            state:{from:props.location}
                         }} />
                         3. this.props.history.replaceState(state,"/login");
                         第二种方式通过 url?search=xxxx
                         通过url的查询字符串方式存储前一个页面的路由,通过window.location来读取查询参数
                         跳转页面这些操作，都是登录成功之后进行的,如果用户没有登陆，就跳转到登陆页面,比如用户一开始访问www.test.com/index.html页面，然后判断出没有登陆，那句帮他跳转到www.test.com/login.html页面
                         然后登陆成功后，再帮他跳回www.test.com/index.html页面,然后没有登陆，用户向后台发出的所有的请求，都应该被后台判断为失败
                         ,然后你根据后台返回的数据来判断用户是否登陆,前端的所有请求，后台都应该判断是否处于登陆状态,如果不是登陆状态，就返回数据告诉前端，该用户没有登陆
                         ,比如用户是登陆的，那么后台返回的数据是这样的,{data:responseData,code:0},code=0，表示请求成功，且用户处于登陆状态
                         ,code=1，表示请求失败，且用户处于登陆状态,code=2，表示请求失败，且用户没有登陆,这些code的值都是随意的,所以你写前端代码的时候，所有的请求，最终都应该通过一个函数来向后台发出
                         ,不然你写了几百个请求，现在code=0代表成功，后面后台改了code=0，代表失败，那就有意思了,请求跟之前一样写啊，不过都是通过调用同一个函数来向后台发送而已
                    */}
                    <Route path="/login" component={Login} />
                    <PrivateRoute path="/user" component={User} /> 
                    <PrivateRoute path="/purChase" component={PurChase} />
                    <Route path="/detail/:id" component={ProductDetail} />
                    <Route path="/citylist" component={CityList} />
                    <Route path="/search" component={Search} />
                    <Route path="/searchResult" component={SearchResult}  />
                </Switch>
            </Router>

            {
                error?(
                    <ErrorToast msg={error} clearError={clearError} />
                ):null
            }
        </div>
    )
}

const mapStateToProps = (state,props)=>{
    return {
        ...state,
        error:getError(state),
    }
}
const mapDispatchToProps = (dispatch,props)=>{
    return {
        appActions:bindActionCreators( appActions,dispatch ),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

