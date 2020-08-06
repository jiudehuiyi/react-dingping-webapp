import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Card,Row,Col } from "antd";
class QuanCard extends PureComponent {
    render() {
        const {
            title,
            date,
            url,
            name,
            num
        } = this.props.data;
        return (
            <div>
                <Card title={title} >
                    <Row>
                        <Col span={6}>
                            <img src={url} alt="" style={{ width:"50px",height:"50px"  }}/>
                        </Col>
                        <Col span={18}>
                            <div>{name}</div>
                            <div>序列号{num}</div>
                            <div>{date}过期</div>
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
}

QuanCard.propTypes = {
    data:PropTypes.object.isRequired
};

export default QuanCard;