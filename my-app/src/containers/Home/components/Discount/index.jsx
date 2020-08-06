import React from 'react';
import PropTypes from 'prop-types';
import { Button,Skeleton } from "antd";
import { Link } from "react-router-dom";

import "./style.css"
class Discount extends React.Component {

    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.homeDiscount === this.props.homeDiscount){
            return false;
        }
        return true;
    }

    render() {
        const { 
            request,
            fail,
            data,
         } = this.props.homeDiscount;
         const { 
            reloadDiscountData
          } = this.props;
         const renderData = data.map( (item,index)=>{
            return (
                <Link 
                    to={`/detail/${item.id}`}
                    key={item.id}
                    className="discount__item"
                >
                                <div className="discount__itemPic">
                  <img alt="" width="100%" height="100%" src={item.picture} />
                </div>
                <div className="discount__itemTitle">{item.shop}</div>
                <div className="discount__itemPriceWrapper">
                  <ins className="discount__itemCurrentPrice">
                    {item.currentPrice}
                  </ins>
                  <del className="discount__itemOldPrice">{item.oldPrice}</del>
                </div>
                </Link>
            )
         } )
        return (
            <div className="discount">
                <a href="/" className="discount__header">
                    <span className="discount__title">超值特惠</span>
                    <span className="discount__more">更多优惠</span>
                    <span className="discount__arrow"></span>
                </a>
                <div className="discount__content">
                {
                        !request?
                        (
                            fail?
                            <div>
                                <Button type="primary" onClick={ reloadDiscountData }>
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
            </div>
        );
    }
}

Discount.propTypes = {
    homeDiscount:PropTypes.object.isRequired
};

export default Discount;