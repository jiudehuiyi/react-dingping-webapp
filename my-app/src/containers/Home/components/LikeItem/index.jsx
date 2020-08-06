import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import "./style.css";
class LikeItem extends React.PureComponent {

    
    render() {
        const {
            id,
            shop,
            tag,
            picture,
            product,
            currentPrice,
            oldPrice,
            saleDesc
        } = this.props.data;
        return (
            <Link className="likeItem" to={`/detail/${id}`} >
                <div className="likeItem__picContainer">
                    <div className="likeItem__picTag">{tag}</div>
                    <img alt="" className="likeItem__pic" src={picture} />
                </div>

                <div className="likeItem__content">
                     <div className="likeItem__shop">{shop}</div>
                     <div className="likeItem__product">{product}</div>
                     <div className="likeItem__detail">
                            <div className="likeItem__price">
                                <ins className="likeItem__currentPrice">{currentPrice}</ins>
                                <del className="likeItem__oldPrice">{oldPrice}</del>
                            </div>
                             <div className="likeItem__sale">{saleDesc}</div>
                     </div>
                </div>
            </Link>
        );
    }
}

LikeItem.propTypes = {
    data:PropTypes.object.isRequired
};

export default LikeItem;