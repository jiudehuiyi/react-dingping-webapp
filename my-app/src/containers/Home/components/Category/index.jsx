import React from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";
import { Skeleton,Button } from "antd";

import "./style.css";
class Category extends React.Component {

    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.homeCategory === this.props.homeCategory){
            return false;
        }
        return true;
    }
   
    render() {
        const {
            request,
            fail,
            data,
            
        } = this.props.homeCategory;
        const {
            reloadCategoryData,
            onHandleCategory
        } = this.props;
       
        const setting = {
            dots:true,
            arrows:false,
            slidesToShow: 1,
            swipeToSlide: true,
            autoplay: true
        }
        const renderData = data.map( (section,index)=>{
           return(
                <div key={index}>
                    {
                        section.map( (item,idx)=>{
                            return (
                                <div 
                                    className="category__section" 
                                    key={item.src}
                                    onClick={ onHandleCategory }
                                >
                                    <img  
                                        src={item.src} 
                                        alt="加载图片" 
                                        className="category__icon" 
                                    />
                                    <span className="category__text">
                                        {item.name}
                                    </span>
                                </div>
                            )
                        } )
                    }
                </div>
            )
        }  );
        return (
            <div className="category">
                
                    {
                        !request?
                        (
                            fail?
                            <div>
                                <Button type="primary" onClick={reloadCategoryData}>
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
                        :<Skeleton />
                    }
                    
            </div>
        );
    }
}

Category.propTypes = {
    homeCategory:PropTypes.object.isRequired,
    reloadCategoryData:PropTypes.func.isRequired
};

export default Category;