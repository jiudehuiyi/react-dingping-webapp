import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Skeleton,Button } from "antd";
import "./style.css"
class ProductOverview extends React.PureComponent {
    render() {
        const { 
            reloadProductOverviewData
        } = this.props;
        const {
            request,
            fail,
            data
        } = this.props.detailOverviewData;
        const {
            id,
            picture,
            shop,
            product,
            currentPrice,
            oldPrice
        }=data;
        return (
            <div className="productOverview">
                
                {
                        !request?
                        (
                            fail?
                            <div>
                                <Button type="primary" onClick={reloadProductOverviewData}>
                                    数据请求失败，点击重新加载
                                </Button>
                            </div>
                            :<div>
                                  <div className="productOverview__header">
                    <div className="productOverview__imgContainer">
                        <img 
                            className="productOverview__img"
                            src={picture}
                            alt=""
                        />
                    </div>
                    <div className="productOverview__baseInfo">
                         <div className="productOverview__title">{shop}</div>
                         <div className="productOverview__content">
                            {product}
                         </div>
                    </div>
                </div>
          
                                  <div className="productOverview__purchase">
                     <span className="productOverview__symbol">¥</span>
                     <span className="productOverview__price">
                        {currentPrice}
                     </span>
                     <span className="productOverview__price--old">
                        ¥{oldPrice}
                     </span>
                     <Link className="productOverview__btn" to={`/purchase/${id}`}>
                        立即购买
                     </Link>
                </div>

                                  <ul className="productOverview__remark">
                    <li className="productOverview__remarkItem">
                        <i className="productOverview__sign1" />
                        <span className="productOverview__desc">随时可退</span>
                    </li>
                    <li className="productOverview__remarkItem">
                        <i className="productOverview__sign2" />
                        <span className="productOverview__desc">
                            过期自动退
                        </span>
                    </li>
                </ul>
           
                                
                            </div>
                        )
                        :<Skeleton />
                    }
            </div>
        );
    }
}

ProductOverview.propTypes = {
    detailOverviewData:PropTypes.object.isRequired,
    reloadProductOverviewData:PropTypes.func.isRequired,

};

export default ProductOverview;