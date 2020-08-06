import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import HotCitys from "./hotCitys";
import MoreCitys from './moreCitys'
class SelectCity extends PureComponent {
    render() {
        const {
            hotCitysData,
            alphabet,
            onSelectCity,
            moreCitysData,
            dumpCityList,
            cityListHeaderSelector,
        } = this.props;
        return (
            <div>
                {
                    cityListHeaderSelector===1?(
                    <HotCitys
                        hotCitysData={hotCitysData}
                        alphabet={alphabet}
                        onSelectCity={onSelectCity}
                    />
                    )
                    :null
                }
                
                {
                    Object.keys(moreCitysData).length>0?(
                    <MoreCitys 
                         alphabet={alphabet}
                         onSelectCity={onSelectCity}
                         moreCitysData={moreCitysData}
                         dumpCityList={dumpCityList}
                     />
                    ):null
                }
                

            </div>
        );
    }
}

SelectCity.propTypes = {
    hotCitysData:PropTypes.array.isRequired,
};

export default SelectCity;