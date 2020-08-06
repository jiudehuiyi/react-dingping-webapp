import React from "react";

import "./style.css";

class ErrorToast extends React.Component{
     

    componentDidMount(){
        //三秒后清除这个错误
        this.timer = setTimeout( ()=>{
            this.props.clearError();
        },3000 )
    }

    componentWillMount(){
        if(this.timer){
            clearTimeout( this.timer );
        }
    }

    render(){
        const { msg } = this.props;
        return (
            <div className="errorToast">
                <div className="errorToast_text">
                    {msg}
                </div>
            </div>
        )
    }
}

export default ErrorToast;