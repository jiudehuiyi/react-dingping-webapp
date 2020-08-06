import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators }  from "redux";
import { message } from 'antd';

import {
    actions as cityListActions,
    getCityListHeaderSelector,
    getSearchCityKeyword,
    getMoreCitys,
} from "@/redux/modules/citylist";
import {
    actions as homeActions,
    getHomeCurrentCity
} from "@/redux/modules/home";
import CityListHeader from "./components/CityListHeader";
import CityListSearch from "./components/CityListSearch";
import GetCurrentCity from "./components/getCurrentCity";
import SelectCity from "./components/SelectCity";

import combinationFunc from "@/utils/improveFunc"
import cityInfoHighComponent from "@/utils/cityInfo";

const hotCitysData = [
    "北京","成都","重庆",
    "广州","杭州","南京",
    "上海","深圳","苏州",
    "天津","武汉","西安",
]
//生成26个字母
const alphabet = Array.from( new Array(26),(item,index)=>{
    return String.fromCharCode(65+index)
} )

class CityList extends Component {


    onBack = ()=>{
        this.props.history.goBack();
    }
    changeSelect=(ev)=>{
  
        const { cityListActions, } = this.props;
        const { headerSelect,moreCitys } = cityListActions;
        headerSelect( ev.target.value );
        moreCitys( ev.target.value );
    }
    onSelectCity=(value,options)=>{
       
        const { homeActions } = this.props;
        if(!value) {
            message.info("请输入城市名或者拼音进行搜索!!");
            return;
        }
        homeActions.setCurrentCity(value);
        this.props.history.push("/");
    }
    autoHandleSearch=combinationFunc((value)=>{
        const { cityListActions } = this.props;
        cityListActions.searchCityKeyword(value);
    },500)

    dumpCityList=(city)=>{
        document.querySelector(`[data-cate=${city}]`).scrollIntoView()
    }

    componentDidMount(){
        const { cityListActions,cityListHeaderSelector } = this.props;
        const { moreCitys } = cityListActions;
      
      
        // if( !Object.keys(data).length > 0 ) {
            moreCitys( cityListHeaderSelector );
        // }
    }

    render() {
        console.log( this.props )
        const { 
            cityListHeaderSelector,searchCityKeyword,cityStatus,
            result,moreCitysData, 
        } = this.props;
        const { data } = moreCitysData;
        
        return (
            <div>
                <CityListHeader 
                    onBack={this.onBack}
                    changeSelect={this.changeSelect}

                    type={cityListHeaderSelector}
                />
                 <CityListSearch
                        searchCityKeyword={searchCityKeyword}
    
                        onSelectCity = {this.onSelectCity}
    
                        autoHandleSearch={this.autoHandleSearch}
                    />
                      <GetCurrentCity 
                        cityStatus={cityStatus}
                        result={result}
                        onSelectCity={this.onSelectCity}
                    />
              
                    
                <div>
                   
                    <SelectCity 
                        hotCitysData={hotCitysData}
                        alphabet={alphabet}
                        onSelectCity={this.onSelectCity}
                        moreCitysData={data}
                        dumpCityList={this.dumpCityList}
                        cityListHeaderSelector={cityListHeaderSelector}
                    />
                </div>
                   

               
              
            </div>
        );
    }
}

CityList.propTypes = {
    cityListHeaderSelector:PropTypes.number.isRequired
};

const mapStateToProps = (state,props)=>{
    return{
        cityListHeaderSelector:getCityListHeaderSelector(state),
        searchCityKeyword: getSearchCityKeyword(state),
        homeCurrentCity:getHomeCurrentCity(state),
        moreCitysData:getMoreCitys(state)
    }
}
const mapDispatchToProps = (dispatch,props)=>{
    return {
        cityListActions:bindActionCreators(cityListActions,dispatch),
        homeActions:bindActionCreators(homeActions,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(cityInfoHighComponent(CityList));