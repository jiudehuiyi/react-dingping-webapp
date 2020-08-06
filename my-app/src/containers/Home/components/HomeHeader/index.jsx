import React from 'react';
import { Link } from "react-router-dom"
import "./style.css";
class HomeHeader extends React.PureComponent {
    render() {
        const {
            homeCurrentCity
        } = this.props;
        return (
            <div  className="homeHeader">
               <header className="homeHeader__wrapper">
                    <Link to="/citylist" className="homeHeader__city">{homeCurrentCity}</Link>
                    <Link to="/search" className="homeHeader__search">输入商户名、地点</Link>
                    <Link to="/user" className="homeHeader__self">
                        <div className="homeHeader__portrait"/>
                    </Link>
                </header>   
            </div>
        );
    }
}



export default HomeHeader;