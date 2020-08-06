import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';

import { 
    actions  as productDetailActions ,
    getDetailOverview,
    getDetailShopInfo,
 } from "@/redux/modules/detail";
import ProductOverview from "./components/ProductOverView";
import ShopInfo from "./components/ShopInfo";
import Detail from "./components/Detail";
import Remark from "./components/Remark";
import BuyButton from "./components/BuyButton";
import Header from "@/components/Header";
 class ProductDetail extends Component {

    componentDidMount(){
        // const { detailOverviewData } = this.props; 
        // const { success } = detailOverviewData;
        // if( !success ) {
            this.getOverviewDataFunc();
        // }

        //这里本来是依据detailOverviewData数据中的name作为params参数的传入，但是这里为了保持逻辑的不变，等待getOverviewDataFunc请求成功后才进行请求
       
    }
    componentDidUpdate(){
        const { detailOverviewData } = this.props; 
        const { success } = detailOverviewData;
        if( success &&  !this.props.shopInfoData.success) {
            this.getShopInfoDataFunc();
        }
    }

    //获取overview组件数据
    getOverviewDataFunc=()=>{
        const { match,productDetailActions } = this.props;
        const { params } = match;
        const { overviewData } = productDetailActions;
        overviewData(params.id)
    }
    reloadProductOverviewData=()=>{
        this.getOverviewDataFunc();
    }
    //获取shopInfo组件数据
    getShopInfoDataFunc=()=>{
        const { productDetailActions,match } = this.props;
        const { params } = match;
        const { shopInfoData } = productDetailActions;
        shopInfoData( params.id );
    }

    //返回按钮
    handleClick=()=>{
        this.props.history.goBack();
    }
   

    render() {
        console.log( this.props )
        const { detailOverviewData,reloadProductOverviewData,shopInfoData } = this.props;
        return (
            <div>
                <Header  title={"团购详情"} onBack={()=>this.handleClick()} />
                {
                    detailOverviewData.success?(
                        <ProductOverview 
                            detailOverviewData={detailOverviewData}
                            reloadProductOverviewData={()=>reloadProductOverviewData()}
                        />
                    ):null
                }
                
                {
                    shopInfoData.success?(
                    <ShopInfo
                        shopInfoData={shopInfoData}
                        total={detailOverviewData.success?detailOverviewData.data.shopIds.length:0}
                    />)
                    :null
                }
                {
                    detailOverviewData.success?(
                    <div>
                        <Detail 
                          detailOverviewData={detailOverviewData}
                        />
                        <Remark 
                              detailOverviewData={detailOverviewData}
                        />
                    </div>):null
                    
                }
                {
                    detailOverviewData.success?(
                        <BuyButton id={detailOverviewData.data.id}/>
                    ):null
                    
                }
                
            </div>
        );
    }
}

ProductDetail.propTypes = {
    productDetailActions:PropTypes.object.isRequired
};

const mapStateToProps = (state,props)=>{
    return {
        detailOverviewData:getDetailOverview(state),
        shopInfoData:getDetailShopInfo(state),
    };
    
}

const mapDispatchToProps = (dispatch,props)=>{
  
    return {
        productDetailActions:bindActionCreators(productDetailActions,dispatch),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductDetail);