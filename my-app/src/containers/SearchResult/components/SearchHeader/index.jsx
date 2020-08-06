import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import "./style.css";
class SearchHeader extends PureComponent {

    render() {
        const {
            onBack,
            onSearch,
        } = this.props;
        return (
            <div>
                <header className="searchHeader">
                    <div className="searchHeader__back" onClick={onBack} />
                    <div className="searchHeader__list">
                        <span className="searchHeader__item searchHeader__item--selected">
                            商户
                        </span>
                        <span className="searchHeader__item">闪惠团购</span>
                    </div>
                    <div className="searchHeader__icon" onClick={onSearch} />
                </header>
            </div>
        );
    }
}

SearchHeader.propTypes = {
    onBack:PropTypes.func.isRequired,
    onSearch:PropTypes.func.isRequired,
};

export default SearchHeader;