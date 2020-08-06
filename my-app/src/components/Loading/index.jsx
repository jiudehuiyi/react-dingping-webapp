import React, { Component } from 'react';


class Loading extends Component {
    render() {
        return (
            <div className="loading">
                <div className="loading__img" />
                <span>正在加载中...</span>
            </div>
        );
    }
}



export default Loading;