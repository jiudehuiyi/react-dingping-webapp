import React from 'react';
import  { connect } from 'react-redux';
import { bindActionCreators  } from "redux";
import PropTypes from 'prop-types';

import { actions as categoryAction,
    getHomeCategory,
    getHomeHeaderLine,
    getHomeDiscount,
    getHomeLikeList,
    getHomePageCount,
    getHomeCurrentCity,
    // getHomeRequestFinish
 } from "@/redux/modules/home";
 import HomeHeader from "./components/HomeHeader";
 import Banner from "./components/Banner";
import Category from "./components/Category";
import Activity from "./components/Activity";
import HeadedLine from "./components/HeaderLine";
import Discount from "./components/Discount";
import LikeList from "./components/LikeList"
import Footer from "../../components/Footer";
import { message } from 'antd';



class Home extends React.Component {

    
    reloadCategoryData=()=>{
        this.getCategoryData();
    }
    reloadHeaderLineData=()=>{
        this.getHeaderLineData();
    }
    reloadDiscountData=()=>{
        this.getDiscountData();
    }

    componentDidMount(){
      
        //获取首页category分类轮播图数据
        const { getHomeCategory,getHomeHeaderLine,getHomeDiscount,getHomeLikeList } = this.props;
        const { homeCategory } = getHomeCategory;
        const { homeHeaderLine } = getHomeHeaderLine;
        const { homeDiscount } = getHomeDiscount;
        const { homeLikeList } = getHomeLikeList;
        if( !homeCategory.success ) {
            this.getCategoryData();
        }
        //获取首页headerLine数据   
        if( !homeHeaderLine.success ) {
            this.getHeaderLineData();
        }
        //获取discount数据
        if( !homeDiscount.success ) {
            this.getDiscountData();
        }
        if( !homeLikeList.success ) {
            this.getLikeListData();
        }

    }
    //获取首页category分类轮播图数据函数
    getCategoryData=()=>{
        const { categoryAction } = this.props;
        const { categoryData } = categoryAction;
        categoryData();
    }
    //获取首页HeaderLine数据函数
    getHeaderLineData=()=>{
        const { categoryAction } = this.props;
        const { headerLineData }= categoryAction;
        headerLineData();
    }
    //获取首页discount数据函数
    getDiscountData=()=>{
        const { categoryAction } = this.props;
        const { discountData }= categoryAction;
        discountData();
    }
    //获取首页LikeList数据函数
    getLikeListData=()=>{
        const { categoryAction } = this.props;
        const { likeListData }= categoryAction;
        likeListData();
    }
    onHandleCategory=()=>{
        message.info("这里点击后的页面跟ResultSearch页面组件类似，这里进行省略!")
    }
    render() {
        const { getHomeCategory,getHomeHeaderLine,getHomeDiscount,getHomeLikeList,getHomePageCount,homeCurrentCity } = this.props;
        const { homeCategory } = getHomeCategory||{};
        const { homeHeaderLine } = getHomeHeaderLine;
        const { homeDiscount } = getHomeDiscount;
        const { homeLikeList } = getHomeLikeList; 
        // console.log( homeCategory.success,homeHeaderLine.success,homeDiscount.success,homeLikeList.success )
        console.log(this.props)
        return (
            <div>
                <HomeHeader 
                    homeCurrentCity={homeCurrentCity}
                />
                <Banner />
                {
                    homeCategory.success?(
                        <Category 
                            homeCategory={homeCategory}
                            reloadCategoryData={ ()=>this.reloadCategoryData() }
                            onHandleCategory={this.onHandleCategory}
                         />
                    ):null
                }
                {
                    homeHeaderLine.success?(
                        <HeadedLine 
                        homeHeaderLine={homeHeaderLine}
                        reloadHeaderLineData={ ()=>this.reloadHeaderLineData() }
                    />
                    ):null
                }
                <Activity />
                {
                    homeDiscount.success?(
                        <Discount 
                        homeDiscount={homeDiscount}
                        reloadDiscountData={ ()=>this.reloadDiscountData() }
                    />
                    ):null
                }
                {
                    homeLikeList.success?(
                        <LikeList 
                        homeLikeList={homeLikeList}
                        pageCount = {getHomePageCount}
                        fetchData={ ()=>this.getLikeListData() }
                         />
                    ):null
                }

                <Footer />
            </div>
        );
    }
}
Home.propTypes = {
    getHomeCategory:PropTypes.object.isRequired,
    getHomeHeaderLine:PropTypes.object.isRequired,
};

function mapStateToProps(state,props){  
    return {
        getHomeCategory:getHomeCategory(state),
        getHomeHeaderLine:getHomeHeaderLine(state),
        getHomeDiscount:getHomeDiscount(state),
        getHomeLikeList:getHomeLikeList(state),
        getHomePageCount:getHomePageCount(state),
        //返回一个对象，如果某个数据请求完毕则为true，否则为false,功能待处理,开启也会有副作用，渲染次数增多了，也可以从上面返回的数据的success取得到，这里只是提供一种思路
        // getHomeRequestFinish:getHomeRequestFinish(state),
        homeCurrentCity:getHomeCurrentCity(state),
    }
}
function mapDispatchToProps(dispatch,props){
    return {
        categoryAction:bindActionCreators( categoryAction ,dispatch ),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);