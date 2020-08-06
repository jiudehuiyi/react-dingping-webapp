import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form,InputNumber,Card,Tag,Button } from "antd";

import "./style.less"
class PurchaseForm extends PureComponent {

    handleFinish=(values,telphoneNumber,totalPrice)=>{
   
        const {onSubmitForm} = this.props;
        onSubmitForm(values,telphoneNumber,totalPrice);
    }

    render() {
        const {
        
            orderInfo,
            changeNums,
            orderNums,
            totalPrice,
            
        } = this.props;
       
        return (
            <div className="purchaseForm">
                <div className="clearfix" style={{ height:"38px",padding:"10px 29px 10px 15px",backgroundColor:"#F0F0F0" }}>
                    <span style={{ float:"left" }}>{orderInfo.categoryName}</span>
                    <span style={{ float:"right" }}>{`x ${orderInfo.nums}`}</span>
                </div>
                <div>
                    <Form
                        onFinish={(values)=>this.handleFinish(values,orderInfo.telphoneNumber,totalPrice)}
                        initialValues={
                            {
                                count:orderNums
                            }
                        }
                    >
                        <Card style={{ padding:"0px" }} className="clearfix">
                            <span style={{ float:"left" }}>数量</span>
                            <Form.Item 
                                name="count"
                                style={{ float:"right",paddingTop:"10px" }}>
                                <InputNumber
                                    min={1}
                                    value={ orderNums }
                                    onChange={(value)=>changeNums(value)}
                                />
                            </Form.Item>
                            
                        </Card>
                        <Card className="clearfix" >
                                <span style={{ float:"left" }} >小计</span >
                                <span style={{ float:"right" }}>{`￥ ${totalPrice} `}</span >
                        </Card>
                        <Card className="clearfix" >
                             <span style={{ float:"left" }} >抵用券/优惠码</span >
                            <span style={{ float:"right" }}>{`${orderInfo.quan}`}</span >
                        </Card>
                        <Form.Item>
                            <Card className="clearfix" >
                                <span style={{ float:"left" }} >手机号码</span >
                                <span style={{ float:"right" }}>
                                    {
                                    `
                                    ${orderInfo.telphoneNumber.slice(0,3)}
                                    ${orderInfo.telphoneNumber.slice(3,7).replace(/\d/gi,"*")}
                                    ${orderInfo.telphoneNumber.slice(7,11)}
                                    `
                                    }
                                </span >
                            </Card>    
                            <div>
                                <Tag color="#65C07A">支持随时退</Tag>
                                <Tag color="#65C07A">支持过期退</Tag>
                            </div>              
                       </Form.Item>
                       <Form.Item >
                            <Button type="primary" style={{ width:"100vw" }} htmlType="submit">
                                { `去支付${totalPrice}元` }
                            </Button>
                      </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

PurchaseForm.propTypes = {
    orderInfo:PropTypes.object.isRequired,
    changeNums:PropTypes.func.isRequired,
    orderNums:PropTypes.number.isRequired,
    totalPrice:PropTypes.number.isRequired,
};

export default PurchaseForm;