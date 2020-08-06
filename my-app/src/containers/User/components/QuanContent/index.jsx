import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import QuanCard from "../QuanCard";
class QuanContent extends PureComponent {
    render() {
        const {
            userQuanData
        } = this.props;
        const renderQuanCard =userQuanData.data.map( (item,index)=>{
            return (
                <QuanCard key={item.id}  data={item} />
            )
        } )
        return (
            <div>
                {
                    renderQuanCard
                }
            </div>
        );
    }
}

QuanContent.propTypes = {
    userQuanData:PropTypes.object.isRequired
};

export default QuanContent;