import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tabs,Empty } from "antd";

import "./style.css"
import Item from "../Item";
const { TabPane } = Tabs;
class UserContent extends PureComponent {
    render() {
        const {
            handleDeleteOrder,handleCommentOrder,
            userOrderData:{data}
        } = this.props;
        // console.log(this.props);
        //全部数据渲染
        const renderAllData = data.map( (item,index)=>{
            return <Item key={item.id}  data={item} showComment={this.props.showComment} handleShowComment={this.props.handleShowComment}  handleDeleteOrder={handleDeleteOrder} handleCommentOrder={handleCommentOrder} />
        } )

        //待付款数据
        const noPayData = data.filter( (item,index)=>{
            return item.type === 1;
        } );
        const renderNoPayData = noPayData.map( (item,index)=>{
            return <Item key={item.id}  data={item} showComment={this.props.showComment} handleShowComment={this.props.handleShowComment}  handleDeleteOrder={handleDeleteOrder}   handleCommentOrder={handleCommentOrder}/>
        } )
    
        //可使用数据
        const useData = data.filter( (item,index)=>{
            return item.type === 2;
        } )
        const renderUseData = useData.map( (item,index)=>{
            return <Item key={item.id}  data={item}  showComment={this.props.showComment} handleShowComment={this.props.handleShowComment} handleDeleteOrder={handleDeleteOrder} handleCommentOrder={handleCommentOrder} />
        } )
        //退款售后数据
        const usedData = data.filter( (item,index)=>{
            return item.type === 3;
        } )
        const renderUsedData = usedData.map( (item,index)=>{
            return <Item key={item.id}  data={item} showComment={this.props.showComment} handleShowComment={this.props.handleShowComment} handleDeleteOrder={handleDeleteOrder}  handleCommentOrder={handleCommentOrder}/>
        } )

        return (
           
            
            <div className="userContent">
                <Tabs 
                    centered={true}
                    animated={true}

                >

                    <TabPane tab="全部订单" key="1">
                        {
                            data.length>0?
                                
                                 <div>{renderAllData}</div>
                                :(<Empty 
                                  description = { 
                                            <div>
                                                <div>您还没有相关订单</div>
                                                <div>去逛逛看有哪些想买的东西</div>
                                            </div> 
                                        }
                                />)
                        }
                        
                    </TabPane>

                    <TabPane tab="待付款" key="2">
                        
                             {
                                noPayData.length>0?
                                    
                                     <div>{renderNoPayData}</div>
                                    :(<Empty 
                                      description = { 
                                                <div>
                                                    <div>您还没有相关订单</div>
                                                    <div>去逛逛看有哪些想买的东西</div>
                                                </div> 
                                            }
                                    />)
                            }
                        
                    </TabPane>
                    <TabPane tab="可使用" key="3">
                      {
                            useData.length>0?
                                
                                 <div>{renderUseData}</div>
                                :(<Empty 
                                  description = { 
                                            <div>
                                                <div>您还没有相关订单</div>
                                                <div>去逛逛看有哪些想买的东西</div>
                                            </div> 
                                        }
                                />)
                        }
                    </TabPane>
                    <TabPane tab="退款/售后" key="4">
                        {
                            usedData.length>0?
                                
                                 <div>{renderUsedData}</div>
                                :(<Empty 
                                  description = { 
                                            <div>
                                                <div>您还没有相关订单</div>
                                                <div>去逛逛看有哪些想买的东西</div>
                                            </div> 
                                        }
                                />)
                        }
                    </TabPane>
                                            
                </Tabs>
           
            </div>
             
        
        )
        




    }

    
}

UserContent.propTypes = {
    userOrderData:PropTypes.object.isRequired
};

export default UserContent;