import React,{
    useContext,
    memo
} from 'react';
import PropTypes from 'prop-types';

import { Row,Col,Menu, Button } from "antd";
import { SelectorResultContext } from "@/containers/SearchResult"

const Selector = memo((props)=>{

    
    const values = useContext(SelectorResultContext);
    const { searchResultSelectorData,handleMenu } = values;



   
    //渲染菜单函数
   const renderMenu = (data)=>{
        return data.map( (item)=>{
            if( item.children ) {
                
                return (
                    <Menu.SubMenu title={item.title} key={item.title}  >
                        { renderMenu(item.children) }
                    </Menu.SubMenu>
                )
            }
            return (
                <Menu.Item title={item.title} key={item.title}>
                    {/* <NavLink to={item.key}>{item.title}</NavLink> */}
                    {item.title}
                </Menu.Item>
            )
        } )
    }
  

    return (
    <div >
        <Row>
            <Col span={8}>
                <Button style={{ width:"100%" }} onClick={ ()=>{values.selectorType("zone");  values.showZoneContent(!values.zoneState)} } >全部商区</Button>
            </Col>
            <Col span={8}>
                <Button style={{ width:"100%" }} onClick={ ()=>{values.selectorType("category") ;  values.showCategoryContent(!values.categoryState) } }>全部分类</Button>
            </Col>
            <Col span={8}>
                <Button style={{ width:"100%" }} onClick={ ()=>{values.selectorType("sort") ;  values.showSortContent(!values.sortState)} }>智能排序</Button>
            </Col>
        </Row>
        <div  >
            {
                values.categoryState?(
                    <Row >
                    <Col span={12}>
                        <Menu onClick={ (item,key)=>handleMenu(item,key) }>
                            {
                               Object.keys(searchResultSelectorData.category).length>0?
                               renderMenu(searchResultSelectorData.category.total):null 
                            }
                           
                        </Menu>
                    </Col>
                </Row>

                ):null

            }

            {
                values.sortState?(
                <Row >
                    <Col span={12}>
                        <Menu onClick={ (item,key)=>handleMenu(item,key) }>
                            {
                               Object.keys(searchResultSelectorData.sort).length>0?
                               renderMenu(searchResultSelectorData.sort.total):null 
                            }
                           
                        </Menu>
                    </Col>
                </Row>
                ):null
            }

          
            {
                values.zoneState?(
                 <Row >
                    <Col span={12}>
                        <Menu onClick={ (item,key)=>handleMenu(item,key) }>
                            {
                               Object.keys(searchResultSelectorData.zone).length>0?
                               renderMenu(searchResultSelectorData.zone.total):null 
                            }
                           
                        </Menu>
                    </Col>
                </Row>
                ):null
            }

        </div>

    </div>
    )
});


Selector.propTypes = {
    searchResultSelectorData:PropTypes.object
};

export default Selector;