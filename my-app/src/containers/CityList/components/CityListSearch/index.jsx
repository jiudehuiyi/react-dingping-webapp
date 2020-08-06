import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input,AutoComplete } from "antd";
import { AudioOutlined } from '@ant-design/icons';

import "./style.less";
const { Search }  = Input;
const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );
class CityListSearch extends PureComponent {
 
    render() {
        const {
            onSelectCity,

            autoHandleSearch,

            searchCityKeyword,
        } = this.props;
        
           
        return (
            <div className="cityList_search" >
                <AutoComplete
                    dropdownMatchSelectWidth={252}
                    style={{ width: 300 }}
                    options={searchCityKeyword.data}
                    onChange={(value)=>autoHandleSearch(value)}
                    onSelect={(value,options)=>onSelectCity(value,options)}
                >

                    <Search
                        placeholder="输入城市名或拼音查询"
                        enterButton="Search"
                        size="large"
                        suffix={suffix}
                      
                    />
                
                </AutoComplete>
                
            </div>
        );
    }
}

CityListSearch.propTypes = {
    onSelectCity:PropTypes.func.isRequired,

    autoHandleSearch:PropTypes.func.isRequired,

};

export default CityListSearch;