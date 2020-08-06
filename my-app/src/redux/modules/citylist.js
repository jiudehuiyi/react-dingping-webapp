import urls from "../../utils/urls";
import requestAxios from "../../utils/axiosRequest";

//types 
export const types = {
    HEADER_SELECT:"CITYLIST/HEADER_SELECT",

    //搜索城市关键词
    SEARCH_CITY_KEYWORD:"CITYLIST/SEARCH_CITY_KEYWORD",
    SEARCH_CITY_KEYWORD_SUCCESS:"CITYLIST/SEARCH_CITY_KEYWORD_SUCCESS",
    SEARCH_CITY_KEYWORD_FAIL:"CITYLIST/SEARCH_CITY_KEYWORD_FAIL",

    //更多城市数据
    MORE_CITYS:"CITYLIST/MORE_CITYS",
    MORE_CITYS_SUCCESS:"CITYLIST/MORE_CITYS_SUCCESS",
    MORE_CITYS_FAIL:"CITYLIST/MORE_CITYS_FAIL",
}
//actionCreator
export const actions = {

    headerSelect:(data)=>{
        return {
            type:types.HEADER_SELECT,
            data:data
        }
    },
  //搜索城市关键词
    searchCityKeywordSuccess:(data)=>{
        return {
            type:types.SEARCH_CITY_KEYWORD_SUCCESS,
            data:data,
            success:true
        }
    },
    searchCityKeywordFail:()=>{
        return {
            type:types.SEARCH_CITY_KEYWORD_FAIL,
            fail:true
        }
    },
  
    searchCityKeyword:(city)=>{
        
        return (dispatch,getState)=>{
            requestAxios.get(urls.searchKeyword,{
                key:city
            }).then( (data)=>{
                dispatch( actions.searchCityKeywordSuccess(data) );
            } ).catch( err=>{
                dispatch( actions.searchCityKeywordFail() );
            } )
        }
    },

    //更多城市数据
    moreCitysSuccess:(data)=>{
        return {
            type:types.MORE_CITYS_SUCCESS,
            data:data,
            success:true
        }
    },
    moreCitysFail:()=>{
        return {
            type:types.MORE_CITYS_FAIL,
            fail:true
        }
    },
  
    moreCitys:(key)=>{
        
        return (dispatch,getState)=>{
            requestAxios.get(urls.moreCitys,{
                key:key
            })
            .then( (data)=>{
                dispatch( actions.moreCitysSuccess(data) );
            } ).catch( err=>{
                dispatch( actions.moreCitysFail() );
            } )
        }
    },
}
//reducer
const iniObj = {
    type:1,
    keyword:{
        success:false,
        fail:false,
        data:[]
    },
    moreCitysIni:{
        success:false,
        fail:false,
        data:{}
    }
}
const reducer = {

    cityListHeaderSelector:(state=iniObj.type,action)=>{

        switch( action.type ){
            case types.HEADER_SELECT:
                return action.data;
            default:    
        }

        return state;
    },
    searchCityKeyword:(state=iniObj.keyword,action)=>{
        switch(action.type){
            case types.SEARCH_CITY_KEYWORD_SUCCESS:
                return {
                    ...state,
                    data:action.data,
                    success:action.success,
                }
            case types.SEARCH_CITY_KEYWORD_FAIL:
                return {
                    ...state,
                    fail:action.fail,
                }   
            default:     
        }

        return state;
    },
    moreCitys:(state=iniObj.moreCitysIni,action)=>{
        switch(action.type){
            case types.MORE_CITYS_SUCCESS:
                return {
                    ...state,
                    data:action.data,
                    success:action.success,
                }
            case types.MORE_CITYS_FAIL:
                return {
                    ...state,
                    fail:action.fail,
                }   
            default:     
        }

        return state;
    }
}
export default reducer;

//selector

export const getCityListHeaderSelector = (state)=>{
    return state.cityListHeaderSelector
}
export const getSearchCityKeyword = (state)=>{
    const copyObj = Object.assign(state.searchCityKeyword);
    return copyObj;
}
export const getMoreCitys = (state)=>{
    const copyObj = Object.assign( state.moreCitys );
    return copyObj;
}
