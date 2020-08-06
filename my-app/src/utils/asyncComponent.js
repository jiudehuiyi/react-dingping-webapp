//动态加载高阶组件

import React from "react";

//使用方式
// asyncComponent( ()=>import("../xxx") );
function asyncComponent( importComponent ){

    return class AsyncComponent extends React.Component{
        constructor(props){
            super(props);
            this.state={
                component:null
            }
        }

        componentDidMount(){
            importComponent().then( (mod)=>{
                this.setState({
                    component:mod.default
                })
            } )
        }
        render(){
            const { component } = this.state;
            return component?<component {...props} />:null;
        }

    }
}



export default asyncComponent;