import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select,Button } from "antd";
class LoginForm extends PureComponent {

    onFinish = (values)=>{
        this.props.onFinish(values);
    }

    render() {
        const { loading } = this.props;
        return (
            <div className="loginForm">
                <Form
                    onFinish={ this.onFinish }
                    
                >
                     <Form.Item>
                        <Input.Group compact style={{ marginTop:"20px" }}>
                            <Form.Item 
                                // name={["prefix","telephone"]}
                                name="prefix "
                                rules={ [ { required:true,message:"请选择前缀" } ] }
                                initialValue="+86"
                                style={{ width:"20%", }}
                            >
                                <Select size="large">
                                    <Select.Option value="+86">+86</Select.Option>
                                    <Select.Option value="+87">+87</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                // name={["prefix","telephone"]}
                                style={{ width:"80%" }}
                                name="telephone"
                                rules={ [ { required:true,message:"请输入手机号码" } ] }
                            >
                                <Input size="large"  placeholder="手机号码为123456"/>
                            </Form.Item>
                        </Input.Group>
                     </Form.Item>

                     <Form.Item
                        name="password"
                        rules={ [ { required:true,message:"请输入密码" } ] }
                     >
                         <Input size="large" type="password"   placeholder="密码为123456"/>
                     </Form.Item>

                     <Form.Item style={{ padding:"10px" }} >
                        <Button type="primary" loading={loading}  htmlType="submit" style={{ width:"100%" }}>
                            登录
                        </Button>
                     </Form.Item>            
                 </Form>
            </div>
        );
    }
}

LoginForm.propTypes = {
    loading:PropTypes.bool.isRequired
};

export default LoginForm;