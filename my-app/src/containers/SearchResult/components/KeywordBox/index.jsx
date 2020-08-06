import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import "./style.css";
class KeyWordBox extends Component {
    render() {
        const {text} 
         = this.props;
        return (
            <div className="keywordBox">
              <Link to="/search" className="keywordBox__text">
                {text}
              </Link>
            </div>
          );
    }
}

KeyWordBox.propTypes = {
    text:PropTypes.string.isRequired,
};

export default KeyWordBox;