import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input,Button,Comment } from "antd";

import "./style.css";

const { TextArea } = Input;
class Item extends Component {
   
    state={
        
        textAreaValue:""
    }

   
    textareaChange=(ev)=>{
        this.setState({
            textAreaValue:ev.target.innerHTML
        })
    }

    render() {
        const {
            id,
            statusText,
            orderPicUrl,
            channel,
            title,
            text,
            type,

        } = this.props.data;
        const {
            handleDeleteOrder,
            handleCommentOrder,

            showComment,
            handleShowComment,
        } = this.props;
        

        const Editor = () => (
            <>
                <TextArea  onBlur={ (ev)=>this.textareaChange(ev) } rows={4}   />
                <Button   onClick={ ()=>handleCommentOrder(id,this.state.textAreaValue) } type="primary">
                  添加评论
                </Button>
              
            </>
          );


        return (
            <div className="orderItem">
                <div className="orderItem__title">
                    <span>{title}</span>
                </div>

                <div className="orderItem__main">
                    <div className="orderItem__imgWrapper">
                        <div className="orderItem__tag">{statusText}</div>
                        <img
                            alt=""
                            className="orderItem__img"
                            src={orderPicUrl}
                        />
                    </div>
                    <div className="orderItem__content">
                       <div className="orderItem__line">{text ? text[0] : ''}</div>
                        <div className="orderItem__line">{text ? text[0] : ''}</div>
                    </div>
                </div>

                <div className="orderItem__bottom">
                    <div className="orderItem__type">{channel}</div>
                    <div>
                        <div>
                            {
                                type === 3?(
                                    <div className="orderItem__btn" onClick={ ()=>handleShowComment() } >
                                        评价
                                    </div>
                                )
                                :null
                            }
                            <div
                                 className="orderItem__btn"
                                 onClick={ ()=>handleDeleteOrder(id) }
                            >
                                删除
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {
                        showComment?(
                            <Comment 
                                content={
                                    <Editor
                                    />
                                }
                            />
                        ):null
                    }
                    
                </div>
            </div>
        );
    }
}

Item.propTypes = {
    data:PropTypes.object.isRequired,
};

export default Item;