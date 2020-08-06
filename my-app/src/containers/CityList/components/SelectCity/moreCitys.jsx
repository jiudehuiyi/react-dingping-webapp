import React, { PureComponent } from 'react';
import { Row, Col, Card } from 'antd';
import PropTypes from 'prop-types';

const Item = (props)=>{
    return (
        <Col span={8} key={props.city}>
             <Card style={{ fontSize:"12px",textAlign:"center" }} onClick={()=>props.onSelectCity(props.city)}>{props.city}</Card>
         </Col>
    )
}
Item.propTypes = {
    city:PropTypes.string.isRequired,
    onSelectCity:PropTypes.func.isRequired,
};

class MoreCitys extends PureComponent {

  

    render() {
        const {
            alphabet,
            onSelectCity,
            dumpCityList,
            moreCitysData:{data}
        } = this.props;
        const moreCitysData = data.city;
        const renderAlphabet = alphabet.map( (city,index)=>{
            return (
                <React.Fragment key={city}>
                    <Col  span={4} onClick={ ()=>dumpCityList(city) }>
                         <Card style={{ fontSize:"16px",textAlign:"center" }}>{city}</Card>
                    </Col>
                </React.Fragment>
            )
        } )
        const renderMoreCitysData = moreCitysData.map( (item,index)=>{
            return (
                <div key={item.letter} style={{color:"#32323",paddingLeft:"10px",backgroundColor:"#f2f2f2",lineHeight:"30px"}}>
                    {
                        item.citylist.length>0?(
                            <div>
                                <div data-cate={item.letter}>
                                    {item.letter}
                                </div>
                                <Row>
                                    {
                                        item.citylist.map( (city)=>{
                                            return (    
                                                <Item key={city} city={city}  onSelectCity={onSelectCity}/>
                                            )
                                        } )
                                    }
                                </Row>
                            </div>
                        ):null
                    }
                  
                </div>
            )
        } )

       
                
        return (
            <div>
            
                <div>
                    <div style={{color:"#32323",paddingLeft:"10px",backgroundColor:"#f2f2f2",lineHeight:"30px"}}>
                        更多城市
                    </div>
                    {
                        alphabet.length>0?(
                            
                            <Row>
                                {renderAlphabet}
                            </Row>
                            
                        ):null
                    } 
                </div> 
                
                <div>
                    {
                        moreCitysData.length>0?(
                           <div>
                                {
                                renderMoreCitysData
                            }
                           </div>
                        ):null
                    }
                </div>
               
            </div>
        );
    }
}

MoreCitys.propTypes = {
    alphabet:PropTypes.array.isRequired,
    onSelectCity:PropTypes.func.isRequired,
    dumpCityList:PropTypes.func.isRequired,
};

export default MoreCitys;