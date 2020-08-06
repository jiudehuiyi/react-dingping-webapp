import urls from "../../utils/urls";
import requestAxios from "../../utils/axiosRequest";

//types
const types = {
    //选择器数据
    SEARCHRESULT_SELECTOR:"SEARCHRESULT/SEARCHRESULT_SELECTOR",
    SEARCHRESULT_SELECTOR_REQUEST:"SEARCHRESULT/SEARCHRESULT_SELECTOR_REQUEST",
    SEARCHRESULT_SELECTOR_SUCCESS:"SEARCHRESULT/SEARCHRESULT_SELECTOR_SUCCESS",
    SEARCHRESULT_SELECTOR_FAIL:"SEARCHRESULT/SEARCHRESULT_SELECTOR_FAIL",

    //搜索结果页内容
     SEARCHRESULT_CONTENT:"SEARCHRESULT/SEARCHRESULT_CONTENT",
     SEARCHRESULT_CONTENT_REQUEST:"SEARCHRESULT/SEARCHRESULT_CONTENT_REQUEST",
     SEARCHRESULT_CONTENT_SUCCESS:"SEARCHRESULT/SEARCHRESULT_CONTENT_SUCCESS",
     SEARCHRESULT_CONTENT_FAIL:"SEARCHRESULT/SEARCHRESULT_CONTENT_FAIL",

     //搜索的关键字
     SEARCHRESULT_KEYWORD:"SEARCHRESULT/SEARCHRESULT_KEYWORD",
     SEARCHRESULT_KEYWORD_REQUEST:"SEARCHRESULT/SEARCHRESULT_KEYWORD_REQUEST",
     SEARCHRESULT_KEYWORD_SUCCESS:"SEARCHRESULT/SEARCHRESULT_KEYWORD_SUCCESS",
     SEARCHRESULT_KEYWORD_FAIL:"SEARCHRESULT/SEARCHRESULT_KEYWORD_FAIL",
}



//actionCreator

export const actions = {
      //热门关键词
      selectorRequest:(boo)=>{
        return {
            type:types.SEARCHRESULT_SELECTOR_REQUEST,
            request:boo
        }
    },
    selectorSuccess:(data)=>{
      
        return {
            type:types.SEARCHRESULT_SELECTOR_SUCCESS,
            success:true,
            data:data,
        }
    },
    selectorFail:()=>{
        return {
            type:types.SEARCHRESULT_SELECTOR_FAIL,
            fail:true
        }
    },
   

    selectorData:(selectorType)=>{
        return (dispatch,getState)=>{
            const { searchResultSelector } = getState();
            const { zone,category,sort } = searchResultSelector;
            requestAxios.get(urls.selector,{
                key:selectorType
            })
            .then( (data)=>{
                if(zone.finished && selectorType === "zone" ) return ;
                if(category.finished && selectorType === "category" ) return ;
                if(sort.finished && selectorType === "sort" ) return ;

                dispatch( actions.selectorSuccess(data) );
                // dispatch( actions.allRequestFinished({category:true}) );
            } ).catch( err=>{
                dispatch( actions.selectorFail() );
                // dispatch( actions.allRequestFinished({category:false}) );
            } ).finally( ()=>{
                // dispatch( actions.selectorRequest(false) );
            } )
                
            
        }
    },

    //搜索结果页内容
    contentRequest:(boo)=>{
        return {
            type:types.SEARCHRESULT_CONTENT_REQUEST,
            request:boo
        }
    },
    contentSuccess:(data)=>{
      
        return {
            type:types.SEARCHRESULT_CONTENT_SUCCESS,
            success:true,
            data:data,
        }
    },
    contentFail:()=>{
        return {
            type:types.SEARCHRESULT_CONTENT_FAIL,
            fail:true
        }
    },
    contentData:(selectorType)=>{
        return (dispatch,getState)=>{
            
            requestAxios.get(urls.content,{
                key:selectorType
            })
            .then( (data)=>{

                dispatch( actions.contentSuccess(data) );
                // dispatch( actions.allRequestFinished({category:true}) );
            } ).catch( err=>{
                dispatch( actions.contentFail() );
                // dispatch( actions.allRequestFinished({category:false}) );
            } ).finally( ()=>{
                // dispatch( actions.selectorRequest(false) );
            } )
                
            
        }
    },

        //搜索关键字
    keywordRequest:(boo)=>{
            return {
                type:types.SEARCHRESULT_KEYWORD_REQUEST,
                request:boo
            }
        },
    keywordSuccess:(data)=>{
            return {
                type:types.SEARCHRESULT_KEYWORD_SUCCESS,
                success:true,
                data:data,
            }
        },
    keywordFail:()=>{
            return {
                type:types.SEARCHRESULT_KEYWORD_FAIL,
                fail:true
            }
        },
    keywordData:()=>{
            return (dispatch,getState)=>{
                
                requestAxios.get(urls.keyword)
                .then( (data)=>{
                    dispatch( actions.keywordSuccess(data) );
                    // dispatch( actions.allRequestFinished({category:true}) );
                } ).catch( err=>{
                    dispatch( actions.keywordFail() );
                    // dispatch( actions.allRequestFinished({category:false}) );
                } ).finally( ()=>{
                    // dispatch( actions.selectorRequest(false) );
                } )
            }
        },
}

//reducer
const iniObj = {
    selector:{
        zone:{},
        category:{},
        sort:{},
        request:true,
        fail:false,
        success:false,
    },
    content:{
        request:true,
        fail:false,
        success:false,
        data:[], 
    },
    keyword:{
        request:true,
        fail:false,
        success:false,
        data:{}, 
    }
}

const reducer = {
    searchResultSelector : (state=iniObj.selector,action)=>{
        const { type } = action;
        switch( type ) {
            case types.SEARCHRESULT_SELECTOR_SUCCESS:
                const title = action.data.title;
                let key = action.data.title;
                let value = action.data;
                localStorage.setItem(key,JSON.stringify(value));
                return {
                    ...state,
                    success:action.success,
                    request:false,
                    // ...action,
                    [title]:action.data
                }
            case  types.SEARCHRESULT_SELECTOR_FAIL:
                return {
                    ...state,
                    fail:action.fail,
                    request:false
                }   
            case types.SEARCHRESULT_SELECTOR_REQUEST:
                return {
                    ...state,
                    request:action.request
                }    
            default:     
        }
    
        return state;
     },

     searchResultContent:(state=iniObj.content,action)=>{
         const {type} = action;
         switch(type){
            case types.SEARCHRESULT_CONTENT_SUCCESS:
                
                return {
                    ...state,
                    success:action.success,
                    request:false,
                    ...action,
                }
            case  types.SEARCHRESULT_CONTENT_FAIL:
                return {
                    ...state,
                    fail:action.fail,
                    request:false
                }   
            case types.SEARCHRESULT_CONTENT_REQUEST:
                return {
                    ...state,
                    request:action.request
                }    
            default:     
        }
    
        return state;
    },

    searchResultKeyword:(state=iniObj.keyword,action)=>{
        const {type} = action;

        switch(type){
           case types.SEARCHRESULT_KEYWORD_SUCCESS:
               return {
                   ...state,
                   success:action.success,
                   request:false,
                   data:action.data,
               }
           case  types.SEARCHRESULT_KEYWORD_FAIL:
               return {
                   ...state,
                   fail:action.fail,
                   request:false
               }   
           case types.SEARCHRESULT_KEYWORD_REQUEST:
               return {
                   ...state,
                   request:action.request
               }    
           default:     
       }
   
       return state;
   }
     
}
export default reducer

//selector
export const getSearchResultSelector = (state)=>{
    const copyObj = Object.assign(state.searchResultSelector);
    
    return copyObj;
}

export const getSearchResultContent = (state)=>{
    const copyObj = Object.assign(state.searchResultContent);
    return copyObj;
}

export const getSearchResultKeyword = (state)=>{
    const copyObj = Object.assign( state.searchResultKeyword );
    return copyObj;
}