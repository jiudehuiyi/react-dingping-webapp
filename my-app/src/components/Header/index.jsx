import React, { PureComponent } from 'react';

import "./style.css"
class Header extends PureComponent {

    render() {
        const {
            title,
            color,
            onBack
       }=this.props;
        return (
            <div className="header" style={ { backgroundColor:color } }>
                <div className="header__back" onClick={onBack}>
                    返回
                </div>
                <div className="header__title">
                    {title}
                </div>
            </div>
        );
    }
}


export default Header;