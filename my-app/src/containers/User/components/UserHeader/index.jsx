import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Button,Radio } from "antd";

import "./style.css"
class UserHeader extends PureComponent {
    render() {
        const { 
            onBack,onLogout,handleChange,
            userHeaderSelect,
        } = this.props;
        return (
            <div className="userHeader">
                <PageHeader 
                    title="首页"
                    ghost={false}
                    onBack={ onBack }
                    style={{ backgroundColor:"#F0F0F0" }}

                    extra={
                        [
                            <Radio.Group 
                                size="large"
                                key="select"
                                buttonStyle="solid"
                                optionType="button"
                                value={userHeaderSelect}
                                onChange={ (ev)=>handleChange(ev) }
                            >
                                  <Radio.Button  value={0}>订单</Radio.Button>
                                  <Radio.Button  value={1}>抵用券</Radio.Button>
                            </Radio.Group>,
                            
                            <Button type="primary" onClick={ onLogout }  size="small" key="logout">
                                注销
                            </Button>
                        ]
                    }
                />
            </div>
        );
    }
}

UserHeader.propTypes = {
    onBack:PropTypes.func.isRequired,
    onLogout:PropTypes.func.isRequired,
    handleChange:PropTypes.func.isRequired,
    userHeaderSelect:PropTypes.number.isRequired
};

export default UserHeader;