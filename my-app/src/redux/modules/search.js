
import urls from "../../utils/urls";
import requestAxios from "../../utils/axiosRequest";


//types

export const types = {
    //搜索相关数据
    SEARCH_RELATED:"SEARCH/SEARCH_RELATED",
    SEARCH_RELATED_REQUEST:"SEARCH/SEARCH_RELATED_REQUEST",
    SEARCH_RELATED_SUCCESS:"SEARCH/SEARCH_RELATED_SUCCESS",
    SEARCH_RELATED_FAIL:"SEARCH/CATEGORY_DATA_FAIL",
    SEARCH_RELATED_EMPTY:"SEARCH/CATEGORY_DATA_EMPTY",

    //热门关键词
    SEARCH_POPULAR:"SEARCH/SEARCH_POPULAR",
    SEARCH_POPULAR_REQUEST:"SEARCH/SEARCH_POPULAR_REQUEST",
    SEARCH_POPULAR_SUCCESS:"SEARCH/SEARCH_POPULAR_SUCCESS",
    SEARCH_POPULAR_FAIL:"SEARCH/CATEGORY_DATA_FAIL",

    //设置搜索历史
    SEARCH_HISTORY_DATA:"SEARCH/SEARCH_HISTORY_DATA",
    //清除搜索历史
    SEARCH_SEARCH_CLEAR:"SEARCH/SEARCH_SEARCH_CLEAR",
    
}

//actionCreator
export const actions = {
     //related
     relatedRequest:(boo)=>{
        return {
            type:types.SEARCH_RELATED_REQUEST,
            request:boo
        }
    },
    relatedSuccess:(data)=>{
        return {
            type:types.SEARCH_RELATED_SUCCESS,
            success:true,
            data:data,
        }
    },
    relatedFail:()=>{
        return {
            type:types.SEARCH_RELATED_FAIL,
            fail:true
        }
    },
    relatedEmpty:()=>{
        return {
            type:types.SEARCH_RELATED_EMPTY,
        }
    },

    relatedData:(key)=>{
        return (dispatch,getState)=>{
            
            requestAxios.get(urls.related,{key:key})
            .then( (data)=>{
                dispatch( actions.relatedSuccess(data) );
                // dispatch( actions.allRequestFinished({category:true}) );
            } ).catch( err=>{
                dispatch( actions.relatedFail() );
                // dispatch( actions.allRequestFinished({category:false}) );
            } ).finally( ()=>{
                dispatch( actions.relatedRequest(false) );
            } )
                
            
        }
    },


    //热门关键词
    popularRequest:(boo)=>{
        return {
            type:types.SEARCH_RELATED_REQUEST,
            request:boo
        }
    },
    popularSuccess:(data)=>{
        return {
            type:types.SEARCH_POPULAR_SUCCESS,
            success:true,
            data:data,
        }
    },
    popularFail:()=>{
        return {
            type:types.SEARCH_POPULAR_FAIL,
            fail:true
        }
    },
   

    popularData:()=>{
        return (dispatch,getState)=>{
            
            requestAxios.get(urls.popular)
            .then( (data)=>{
                dispatch( actions.popularSuccess(data) );
                // dispatch( actions.allRequestFinished({category:true}) );
            } ).catch( err=>{
                dispatch( actions.popularFail() );
                // dispatch( actions.allRequestFinished({category:false}) );
            } ).finally( ()=>{
                dispatch( actions.popularRequest(false) );
            } )
                
            
        }
    },

    //设置搜索历史
    searchHistory:(data)=>{
        //如果长久储存的话可以考虑localStorage或者传给服务器
        return {
            type:types.SEARCH_HISTORY_DATA,
            data,
        }
    },
    //清除历史记录
    clearHistory:()=>{
        return {
            type:types.SEARCH_SEARCH_CLEAR,
        }
    }
}
const IniObj = {
    related:{
        request:true,
        fail:false,
        success:false,
        data:[]
    },
    popular:{
        request:true,
        fail:false,
        success:false,
        data:[]
    },
    history:[]
}

//reducer
const reducer = {
    searchRelated : (state=IniObj.related,action)=>{
        const { type } = action;
        switch( type ) {
            case types.SEARCH_RELATED_SUCCESS:
                return {
                    ...state,
                    data:action.data,
                    success:action.success,
                    request:false
                }
            case  types.SEARCH_RELATED_FAIL:
                return {
                    ...state,
                    fail:action.fail,
                    request:false
                }   
            case types.SEARCH_RELATED_REQUEST:
                return {
                    ...state,
                    request:action.request
                }
            case types.SEARCH_RELATED_EMPTY:
                return IniObj.related;       
            default:     
        }
    
        return state;
     },

     //popular
     searchPopular : (state=IniObj.popular,action)=>{
        const { type } = action;
        switch( type ) {
            case types.SEARCH_POPULAR_SUCCESS:
                return {
                    ...state,
                    data:action.data,
                    success:action.success,
                    request:false
                }
            case  types.SEARCH_POPULAR_FAIL:
                return {
                    ...state,
                    fail:action.fail,
                    request:false
                }   
            case types.SEARCH_POPULAR_REQUEST:
                return {
                    ...state,
                    request:action.request
                }
               
            default:     
        }
    
        return state;
     },
     searchHistory:(state=IniObj.history,action)=>{
         switch(action.type){
             case types.SEARCH_HISTORY_DATA:
                 return [
                     ...state,
                     action.data
                 ]
              case types.SEARCH_SEARCH_CLEAR :
                return []   
            default:    
         }
         return state;
     }
}
export default reducer

//selector
//related
export const getSearchRelated = (state)=>{
    const copyState = Object.assign(state.searchRelated);
    return copyState
} 
//popular
export const getSearchPopular = (state)=>{
    const copyState = Object.assign( state.searchPopular );
    return copyState;
}
//history
export const getSearchHistory=(state)=>{
    const copyState = [...state.searchHistory];
    return copyState;
}

