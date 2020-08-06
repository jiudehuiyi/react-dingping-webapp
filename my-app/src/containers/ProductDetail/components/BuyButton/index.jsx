import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import "./style.css";
class BuyButton extends PureComponent {

    render() {
        const {
            id
        } = this.props;
        return (
            <div className="buyButton">
                {/* TODO: 填写对应产品ID */}
                <Link className="buyButton__btn" to={`/purchase/${id}`}>立即购买</Link>
            </div>
        );
    }
}

BuyButton.propTypes = {
    id:PropTypes.string.isRequired,
};

export default BuyButton;