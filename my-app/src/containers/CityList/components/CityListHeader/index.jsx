import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LeftOutlined } from "@ant-design/icons";
import { Radio } from "antd";
import "./style.less";
class CityListHeader extends PureComponent {
    render() {
        const {
            onBack,changeSelect,

            type,
        } = this.props;
        return (
            <div className="citylist_header" >
                <LeftOutlined style={{ color:"#f63",fontSize:"25px" }}  onClick={onBack} />

                <div className="citylist_header_selector">
                    <Radio.Group  
                        buttonStyle="solid"
                        value={type}
                        onChange={ (ev)=>changeSelect(ev) }
                    >
                        <Radio.Button value={1}>国内</Radio.Button>
                        <Radio.Button value={2}>国际/港澳台</Radio.Button>

                    </Radio.Group>
                </div>
            </div>
        );
    }
}

CityListHeader.propTypes = {
    onBack:PropTypes.func.isRequired,
    changeSelect:PropTypes.func.isRequired,
    type:PropTypes.number.isRequired,
};

export default CityListHeader;