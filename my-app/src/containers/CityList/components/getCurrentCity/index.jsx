import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Button, Spin } from "antd";
import "./style.less";
class GetCurrentCity extends PureComponent {
    render() {
        const {
            cityStatus,
            result,

            onSelectCity,
        } = this.props;
        return (
            <div className="getCurrentCity">
                {
                    cityStatus?(
                        <div>
                            当前城市为:{result.city}
                            <Button type="primary" onClick={ ()=>onSelectCity(result.city) }>选取</Button>
                        </div>
                    ):<div>正在获取当前城市... <Spin /></div>
                }
            </div>
        );
    }
}

GetCurrentCity.propTypes = {
    cityStatus:PropTypes.string.isRequired,
    result:PropTypes.object.isRequired,

    onSelectCity:PropTypes.func.isRequired,
};

export default GetCurrentCity;