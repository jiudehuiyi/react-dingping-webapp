import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Input, Card,Divider ,  } from "antd";
const { Search } = Input;
class SearchBox extends PureComponent {


    render() {
        const {
            handlePressEnter,
            searchRelatedData,
            handleEmptyValue
        } = this.props;
        const renderSearchRelatedData = searchRelatedData.data.length?searchRelatedData.data.map( (item,index)=>{
            return (
                <div key={item.id}>
                <Link  to={`/searchResult/${item.id}`}>
                     <span style={{ marginRight:"50px" }} >{item.keyword}</span>
                     <span >约{item.quantity}个结果</span>
                </Link>
                <Divider />
                </div>
            )
        } ):null;
        return (
            <div className="searchBox" style={{ position:"relative",width:"100vw",height:"45px",lineHeight:"45px",padding:"5px" }}>
                <Search
                    placeholder="输入商户名、地名"
                    enterButton="取消"
                    style={{ display:"inline-block" }}
                    onPressEnter={ (ev)=>handlePressEnter(ev.target.value) }
                    onChange={ (ev)=>handleEmptyValue(ev.target.value) }
                    />
                {
                    searchRelatedData.data.length>0?(
                        <div style={{ position:"absolute",top:"45px",left:"0px" }}>
                            <Card title="搜索结果"  style={{ width: "100vw",backgroundColor:"#E6E6E6" }}>
               
                                 {
                                    renderSearchRelatedData
                                }
                      
                                
                            </Card>
                        </div>
                    ):null
                }    
            </div>
        );
    }
}

SearchBox.propTypes = {
    searchRelatedData:PropTypes.object.isRequired,
    handlePressEnter:PropTypes.func.isRequired,
    handleEmptyValue:PropTypes.func.isRequired,
};

export default SearchBox;