import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./style.css";
class SearchHistory extends Component {

    shouldComponentUpdate(nextProps,nextState){
        if( nextProps.searchHistory === this.props.searchHistory ){
            return false;
        }
        return true;
    }

    render() {
        const {
            searchHistory,
            clearHistory
        } = this.props;
        return (
            <div className="searchHistory">
                <div className="searchHistory__header">搜索记录</div>
                <ul className="searchHistory__list">
                    {searchHistory.map((item,index) => {
                        return (
                            <li
                                key={index}
                                className="searchHistory__item"
                            >
                                {item}
                            </li>
                        )
                    })}
                </ul>
                <div
                    className="searchHistory__clear"
                    onClick={ ()=>clearHistory() }
                >
                    清除搜索记录
                </div>
            </div>
        );
    }
}

SearchHistory.propTypes = {
    searchHistory:PropTypes.array.isRequired,
    clearHistory:PropTypes.func.isRequired
};

export default SearchHistory;