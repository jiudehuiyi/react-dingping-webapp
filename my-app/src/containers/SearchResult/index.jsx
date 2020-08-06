import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux"

import ShopList from "./components/ShopList";
import ShopItem from "./components/ShopItem";
import SearchHeader from "./components/SearchHeader";
import KeywordBox from "./components/KeywordBox";
import { 
    actions as searchResultAction,
    getSearchResultSelector,
    getSearchResultContent,
    getSearchResultKeyword,
 } from "@/redux/modules/searchResult";

export const SelectorResultContext = React.createContext();

 class SearchResult extends Component {

    state = {
        zoneState:false,
        categoryState:false,
        sortState:false,
    }
    

    selectorType=(value,index)=>{
        

        const { searchResultAction,searchResultSelectorData } = this.props;
        const { selectorData } = searchResultAction;
        const { zone,category,sort } = searchResultSelectorData;
        //数据已定，不必过多请求，优化性能
        if( zone.finished && value === "zone" ) {
            return
        }
        if( category.finished && value === "category" ) {
            return
        }
        if( sort.finished && value === "sort" ) {
            return
        }
        if( zone.finished && category.finished && sort.finished ) {
            return;
        }
        //将本来异步请求的转化为同步更新状态，提高性能
        let storageZone = localStorage.getItem("zone");
        let storageCategory = localStorage.getItem("category");
        let storageSort = localStorage.getItem("sort");
        if( storageZone && value==="zone" ) {
            searchResultAction.selectorSuccess( JSON.parse(storageZone) );
        }
        if( storageCategory && value==="category" ) {
            searchResultAction.selectorSuccess( JSON.parse(storageCategory) );
        }
        if( storageSort && value==="sort" ) {
            searchResultAction.selectorSuccess( JSON.parse(storageSort) );
        }
         
        selectorData(value)

    }

    showZoneContent=(boo)=>{
        // console.log(boo)
        this.setState({
            zoneState:boo,
            categoryState:false,
            sortState:false,
        })
    }
    showCategoryContent=(boo)=>{
        this.setState({
            categoryState:boo,
            zoneState:false,
            sortState:false,
        })
    }
    showSortContent=(boo)=>{
        this.setState({
            sortState:boo,
            zoneState:false,
            categoryState:false,
        })
    }
    handleMenu=()=>{
        this.setState({
            sortState:false,
            zoneState:false,
            categoryState:false,
        })
        //这里应该是点击菜单，向后台请求相应的数据，这里进行省略
        
    }
    handleBack=()=>{
        this.props.history.push("/")
    }
    handleSearch=()=>{
        this.props.history.push("/search");
    }

    componentDidMount(){
        //这个请求数据不应该缓存，因为会随着用户操作会进行更新请求
        const { searchResultAction } = this.props;
        const {contentData,keywordData} = searchResultAction;
        contentData();
        keywordData();
    }

    render() {
        console.log(  this.props )
        const { searchResultSelectorData,searchResultContentData,searchResultKeywordData } =this.props;
        return (
            <div>
                <SearchHeader 
                    onBack={ ()=>this.handleBack() }
                    onSearch={ ()=>this.handleSearch() }
                />
                <KeywordBox 
                    text={searchResultKeywordData.data.text}
                />
                <SelectorResultContext.Provider value={ {
                     zoneState:this.state.zoneState,
                     categoryState:this.state.categoryState,
                     sortState:this.state.sortState,

                    selectorType:this.selectorType,
                    handleMenu:this.handleMenu,
                    showZoneContent:this.showZoneContent,
                    showCategoryContent:this.showCategoryContent,
                    showSortContent:this.showSortContent,

                    searchResultSelectorData:searchResultSelectorData,
                } }>
                    <ShopList />
                </SelectorResultContext.Provider>
                {
                    searchResultContentData.data.length>0?(
                        searchResultContentData.data.map( (item,index)=>{
                            return (
                                <ShopItem  {...item} />
                            )
                        } )
                        
                    ):null
                }
            </div>
        );
    }
}

SearchResult.propTypes = {
    searchResultSelectorData:PropTypes.object.isRequired,
    searchResultContentData:PropTypes.object.isRequired,
    searchResultKeyword:PropTypes.object
};

const mapStateToProps = (state,props)=>{
    return {
        searchResultSelectorData:getSearchResultSelector(state),
        searchResultContentData:getSearchResultContent(state),
        searchResultKeywordData:getSearchResultKeyword(state),
    };
}
const mapDispatchToProps = (dispatch,props)=>{
    return {
        searchResultAction:bindActionCreators(searchResultAction,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchResult);