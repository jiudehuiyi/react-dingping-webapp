import React, {  Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Skeleton
} from "antd";

import "./style.css";
class SearchPopular extends Component {
    
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.searchPopularData === this.props.searchPopularData){
            return false;
        }
        return true;
    }

    render() {
        const {
            request,
            fail,
            data
        }=this.props.searchPopularData;
        const {
            handleDump,
            reloadSearchPopular
        } = this.props;
        const renderData = data.map( item=>{
            return (
                <span
                    key={item.id}
                    className="popularSearch__item"
                    onClick={ ()=>handleDump(item.id) }
                >
                    {item.keyword}
                </span>
            )
        } )
        return (
            <div className="popularSearch">
                  {
                        !request?
                        (
                            fail?
                            <div>
                                <Button type="primary" onClick={ ()=>reloadSearchPopular() }>
                                    数据请求失败，点击重新加载
                                </Button>
                            </div>
                            :<div>
                                {
                                    renderData
                                }
                                
                            </div>
                        )
                        :<Skeleton />
                    }
            </div>
        );
    }
}

SearchPopular.propTypes = {
    searchPopularData:PropTypes.object.isRequired
};

export default SearchPopular;