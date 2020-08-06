import React from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";
import { Skeleton,Button } from "antd";

import "./style.css";
class HeadedLine extends React.Component {


    shouldComponentUpdate(nextProps,nextState){

        if( nextProps.homeHeaderLine === this.props.homeHeaderLine ){
            return false
        }
        return true;
    }

    render() {
        const {
            request,
            fail,
            data,
        } = this.props.homeHeaderLine;
        const {
            reloadHeaderLineData
        } = this.props;
        const setting = {
            slidesToShow: 1,
            swipeToSlide: true,
            autoplay: true,
            vertical:true
        }
        const renderData = data.map( (item,index)=>{
            return (
                <a 
                    href={item.url}
                    key={item.url}
                    className="headline__sliderInner"
                >
                    <div
                        className="headline__sliderTitle"
                    >
                        {item.title}
                    </div>
                    <div
                        className="headline__sliderImgWrapper"
                    >
                        <img 
                            alt=""
                            className="headline__sliderImg"
                            src={item.pic}
                        />
                    </div>

                </a>
            )
        } )
        return (
            <div className="headline">
                <div className="headline__logo" />
                <div className="headline__slider">
                    <Slider {...setting}>
                        {
                            !request?
                            (
                                fail?
                                <div>
                                    <Button type="primary" onClick={reloadHeaderLineData}>
                                        数据请求失败，点击重新加载
                                    </Button>
                                </div>
                                :<div>
                                    <Slider {...setting} >
                                        {
                                            renderData
                                        }
                                    </Slider>
                                    
                                </div>
                            )
                            :<Skeleton avatar />
                        }
                    </Slider>
                </div>
                
            </div>
        );
    }
}

HeadedLine.propTypes = {
    homeHeaderLine:PropTypes.object.isRequired,
    reloadHeaderLineData:PropTypes.func.isRequired
};

export default HeadedLine;