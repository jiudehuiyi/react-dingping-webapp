import React from 'react';
import PropTypes from 'prop-types';

import LikeItem from "../LikeItem";
import Loading from "@/components/Loading";
import "./style.css";
import { Button } from 'antd';
class LikeList extends React.Component {
    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.removeListener = false; 
    }

    componentDidMount(){
        //数据没有获取完加载完
        if( this.props.pageCount < 3 ) {
            document.addEventListener("scroll",this.handleScroll);
        }else {
            //数据已经加载完毕
            this.removeListener = true;
        }
        // if( this.props.pageCount === 0 ) {
        //     this.props.fetchData();
        // }

    }
    componentWillUnmount() {
        if (!this.removeListener) {
          document.removeEventListener("scroll", this.handleScroll);
        }
      }

    handleScroll=()=>{
        const scrollTop =document.documentElement.scrollTop || document.body.scrollTop; // 滚动距离
        const screenHeight = document.documentElement.clientHeight; // 屏幕高度
        const likeListTop = this.myRef.current.offsetTop; // 猜你喜欢的顶部位置
        const likeListHeight = this.myRef.current.offsetHeight; // 猜你喜欢的高度
        if( scrollTop >= likeListHeight + likeListTop - screenHeight ) {
            this.props.fetchData();
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        if( 
            nextProps.pageCount === this.props.pageCount 
        ) {
            return false;
        }
        return true;
    }
    
    render() {
        const {
            data,
        } = this.props.homeLikeList;
        const {
            pageCount
        } = this.props;
        const renderItem = data.map( (item,index)=>{
            return (
                <LikeItem key={item.id} id={item.id} data={item}  />
            )
        } )
        return (
            <div ref={this.myRef} className="likeList">
                <div className="likeList__header">
                    猜你喜欢
                </div>
                <div className="likeList__list">
                    {
                        renderItem
                    }
                </div>
                {
                    pageCount < 3 ? (
                        <Loading />
                    ):(
                        <Button type="primary" style={{width:"100vw"}}>查看更多</Button>
                    )
                }
            </div>
        );
    }
}



LikeList.propTypes = {
    pageCount:PropTypes.number.isRequired,
    homeLikeList:PropTypes.object.isRequired
};

export default LikeList;