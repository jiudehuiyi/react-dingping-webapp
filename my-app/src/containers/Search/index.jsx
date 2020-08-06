import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import {
    actions as relatedAction ,
    getSearchRelated,
    getSearchPopular,
    getSearchHistory
} from "@/redux/modules/search";
import SearchBox from "./components/SearchBox";
import SearchPopular from "./components/SearchPopular";
import SearchHistory from "./components/SearchHistory";
import combinationFunc from "../../utils/improveFunc";
class Search extends Component {

    componentDidMount(){
        const { searchAction } = this.props;
        const  { popularData } = searchAction;
        if( !popularData.success ) {
            this.getSearchPopularData();
        }
    }

    //获取流行的数据
    getSearchPopularData=()=>{
        const { searchAction } = this.props;
        const  { popularData } = searchAction;
        popularData();
    }

    
    
    handlePressEnter =  (value)=>{
        const { searchAction, } = this.props;
        const  { relatedData,searchHistory } = searchAction;
        searchHistory(value);
        combinationFunc(relatedData({key:value}),500 );
    };
    handleEmptyValue=(value)=>{
        const { searchAction } = this.props;
        const  {  relatedEmpty} = searchAction;
        if(!value){
            relatedEmpty();
        }
    }
    handleDump=(id)=>{
        this.props.history.push(`searchResult/${id}`);
    }
    reloadSearchPopular=()=>{
        this.getSearchPopularData();
    }
    clearHistory=()=>{
        const { searchAction, } = this.props;
        const { clearHistory } = searchAction;
        clearHistory();
    }

    render() {
        console.log(this.props)
        const { searchRelatedData,searchPopularData,searchHistory } = this.props;
        return (
            <div>
                <SearchBox
                    handlePressEnter={ (value)=>this.handlePressEnter(value) }
                    handleEmptyValue={ (value)=>this.handleEmptyValue(value) }
                    searchRelatedData={searchRelatedData}
                />
                {
                    searchPopularData.success ?(
                        <SearchPopular 
                        searchPopularData={searchPopularData}
                        handleDump={(id)=>this.handleDump(id)}
                        reloadSearchPopular={ ()=>this.reloadSearchPopular() }
                        />
                    ):null
                }
                {
                    searchHistory.length>0?(
                        <SearchHistory  
                        searchHistory={searchHistory}
                        clearHistory={()=>this.clearHistory()}
                        />
                    ):null
                }
               
            </div>
        );
    }
}

Search.propTypes = {
    searchRelatedData:PropTypes.object,
};

const mapStateToProps = (state,props)=>{
    return {
        searchRelatedData:getSearchRelated(state),
        searchPopularData:getSearchPopular(state),
        searchHistory:getSearchHistory(state)
    }
}
const mapDispatchToProps = (dispatch,props)=>{
    return {
        searchAction:bindActionCreators(relatedAction,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);