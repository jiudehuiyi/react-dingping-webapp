import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'antd';


class HotCitys extends PureComponent {
    render() {
        const {
            hotCitysData,
            onSelectCity
        } = this.props;
        const renderHotCitys = hotCitysData.map( (city,index)=>{
            return (
                <React.Fragment key={city}>
                    <Col  span={8} onClick={ ()=>onSelectCity(city) }>
                         <Card style={{ fontSize:"20px",textAlign:"center" }}>{city}</Card>
                    </Col>
                </React.Fragment>
            )
        } )
        return (
            <div>
                <div style={{color:"#32323",paddingLeft:"10px",backgroundColor:"#f2f2f2",lineHeight:"30px"}}>热门城市</div>
                {
                    hotCitysData.length>0?(
                        
                        <Row>
                            {renderHotCitys}
                        </Row>
                         
                    ):null
                }
            </div>
        );
    }
}

HotCitys.propTypes = {
    hotCitysData:PropTypes.array.isRequired,
    onSelectCity:PropTypes.func.isRequired
};

export default HotCitys;