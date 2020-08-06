

import urls from "../../utils/urls";
import requestAxios from "../../utils/axiosRequest";

//actionTypes
export const types = {
    //category
    CATEGORY_DATA:"HOME/CATEGORY_DATA",
    CATEGORY_DATA_REQUEST:"HOME/CATEGORY_DATA_REQUEST",
    CATEGORY_DATA_SUCCESS:"HOME/CATEGORY_DATA_SUCCESS",
    CATEGORY_DATA_FAIL:"HOME/CATEGORY_DATA_FAIL",

    //headerline
    HEADERLINE_DATA:"HOME/HEADERLINE_DATA",
    HEADERLINE_REQUEST:"HOME/HEADERLINE_REQUEST",
    HEADERLINE_SUCCESS:"HOME/HEADERLINE_SUCCESS",
    HEADERLINE_DFAIL:"HOME/HEADERLINE_DFAIL",

    //discount
    DISCOUNT_DATA:"HOME/DISCOUNT_DATA",
    DISCOUNT_REQUEST:"HOME/DISCOUNT_REQUEST",
    DISCOUNT_SUCCESS:"HOME/DISCOUNT_SUCCESS",
    DISCOUNT_FAIL:"HOME/DISCOUNT_DFAIL",

    //likelist
    LIKELIST_DATA:"HOME/LIKELIST_DATA",
    LIKELIST_REQUEST:"HOME/LIKELIST_REQUEST",
    LIKELIST_SUCCESS:"HOME/LIKELIST_SUCCESS",
    LIKELIST_FAIL:"HOME/LIKELIST_FAIL",

    //pageCount加载数据分页
    LIKELIST_PAGECOUNT:"HOME/LIKELIST_PAGECOUNT",

    //首页中所有的请求都成功返回
    ALL_REQUEST_FINISHED:"HOME/ALL_REQUEST_FINISHED",

    //当前城市
    CURRENT_CITY:"HOME/CURRENT_CITY",

}

//actionCreators
export const actions = {

    //category
    categoryRequest:(boo)=>{
        return {
            type:types.CATEGORY_DATA_REQUEST,
            request:boo
        }
    },
    categorySuccess:(data)=>{
        return {
            type:types.CATEGORY_DATA_SUCCESS,
            success:true,
            data:data,
        }
    },
    categoryFail:()=>{
        return {
            type:types.CATEGORY_DATA_FAIL,
            fail:true
        }
    },

    categoryData:()=>{
        return (dispatch,getState)=>{
            
            requestAxios.get(urls.homeCategoryData)
            .then( (data)=>{
                dispatch( actions.categorySuccess(data) );
                // dispatch( actions.allRequestFinished({category:true}) );
            } ).catch( err=>{
                dispatch( actions.categoryFail() );
                // dispatch( actions.allRequestFinished({category:false}) );
            } ).finally( ()=>{
                dispatch( actions.categoryRequest(false) );
            } )
                
            
        }
    },

    //headerline
    headerLineRequest:(boo)=>{
        return {
            type:types.HEADERLINE_REQUEST,
            request:boo
        }
    },
    headerLineSuccess:(data)=>{
        return {
            type:types.HEADERLINE_SUCCESS,
            success:true,
            data:data,
        }
    },
    headerLineFail:()=>{
        return {
            type:types.HEADERLINE_DFAIL,
            fail:true
        }
    },
    headerLineData:()=>{
        return (dispatch,getState)=>{
            requestAxios.get(urls.homeHeaderLineUrl)
            .then( (data)=>{
                dispatch( actions.headerLineSuccess(data) );
                // dispatch( actions.allRequestFinished({headerLine:true}) );
            } ).catch( err=>{
                dispatch( actions.headerLineFail() );
                // dispatch( actions.allRequestFinished({headerLine:false}) );
            } ).finally( ()=>{
                dispatch( actions.headerLineRequest(false) );
            } )
                
            
        }
    },

    //discount
    discountRequest:(boo)=>{
        return {
            type:types.DISCOUNT_REQUEST,
            request:boo
        }
    },
    discountSuccess:(data)=>{
        return {
            type:types.DISCOUNT_SUCCESS,
            success:true,
            data:data,
        }
    },
    discountFail:()=>{
        return {
            type:types.DISCOUNT_FAIL,
            fail:true
        }
    },
    discountData:()=>{
        return (dispatch,getState)=>{
            requestAxios.get(urls.homeDiscountUrl)
            .then( (data)=>{
                dispatch( actions.discountSuccess(data) );
                // dispatch( actions.allRequestFinished({discount:true}) );
            } ).catch( err=>{
                dispatch( actions.discountFail() )
                // dispatch( actions.allRequestFinished({discount:false}) );
            } ).finally( ()=>{
                dispatch( actions.discountRequest(false) );
            } )
                
            
        }
    },

    //likelist
    likeListRequest:(boo)=>{
        return {
            type:types.LIKELIST_REQUEST,
            request:boo
        }
    },
    likeListSuccess:(data)=>{
        return {
            type:types.LIKELIST_SUCCESS,
            success:true,
            data:data,
        }
    },
    likeListFail:()=>{
        return {
            type:types.LIKELIST_FAIL,
            fail:true
        }
    },
    likeListData:()=>{
        return (dispatch,getState)=>{
            const { homePageCount } = getState();
            requestAxios.get(urls.likeListUrl,{
                pageCount:homePageCount
            })
            .then( (data)=>{
                dispatch( actions.likeListSuccess(data) );
                dispatch( actions.pageCount(homePageCount+1) );
                // dispatch( actions.allRequestFinished({likeList:true}) );
            } ).catch( err=>{
                dispatch( actions.likeListFail(  ) );
                // dispatch( actions.allRequestFinished({likeList:false}) );
            } ).finally( ()=>{
                dispatch( actions.likeListRequest(false) );
            } )
                
            
        }
    },
    //pagecount
    pageCount:(count)=>{
        return {
            type:types.LIKELIST_PAGECOUNT,
            count:count
        }
    },

    //首页中所有的请求
    allRequestFinished:(finish)=>{
        return {
            type:types.ALL_REQUEST_FINISHED,
            finish:finish
        }
    },

    //当前城市
    setCurrentCity:(city)=>{
        return {
            type:types.CURRENT_CITY,
            data:city,
        }
    }
}

//reducer
//category
const categoryInitial={
    request:true,
    fail:false,
    success:false,
    data:[]
};
//headerline
const headerLineInitial={
    request:true,
    fail:false,
    success:false,
    data:[]
}
//discount
const discountInitial = {
    request:true,
    fail:false,
    success:false,
    data:[]
};
const likeListInitial = {
    request:true,
    fail:false,
    success:false,
    data:[]
};
const allRequestFinishedInitial=[
    {category:false},
    {headerLine:false},
    {discount:false},
    {likeList:false},
]
const cityInitial="北京";
const reducer = {
     homeCategory : (state=categoryInitial,action)=>{
        const { type } = action;
        switch( type ) {
            case types.CATEGORY_DATA_SUCCESS:
                return {
                    ...state,
                    data:action.data,
                    success:action.success,
                    request:false
                }
            case  types.CATEGORY_DATA_FAIL:
                return {
                    ...state,
                    fail:action.fail,
                    request:false
                }   
            case types.CATEGORY_DATA_REQUEST:
                return {
                    ...state,
                    request:action.request
                }   
            default:     
        }
    
        return state;
     },
     homeHeaderLine: (state=headerLineInitial,action)=>{
        const { type } = action;
        switch( type ) {
            case types.HEADERLINE_SUCCESS:
                return {
                    ...state,
                    data:action.data,
                    success:action.success,
                    request:false
                }
            case  types.HEADERLINE_DFAIL:
                return {
                    ...state,
                    fail:action.fail,
                    request:false
                }   
            case type.HEADERLINE_REQUEST:
                return {
                    ...state,
                    request:action.request
                }   
            default:     
        }
    
        return state;
     },
     homeDiscount: (state=discountInitial,action)=>{
        const { type } = action;
        switch( type ) {
            case types.DISCOUNT_SUCCESS:
                return {
                    ...state,
                    data:action.data,
                    success:action.success,
                    request:false
                }
            case  types.DISCOUNT_FAIL:
                return {
                    ...state,
                    fail:action.fail,
                    request:false
                }   
            case type.DISCOUNT_REQUEST:
                return {
                    ...state,
                    request:action.request
                }   
            default:     
        }
    
        return state;
     },
     homeLikeList: (state=likeListInitial,action)=>{
        const { type } = action;
        switch( type ) {
            case types.LIKELIST_SUCCESS:
                return {
                    ...state,
                    data:action.data,
                    success:action.success,
                    request:false
                }
            case  types.LIKELIST_FAIL:
                return {
                    ...state,
                    fail:action.fail,
                    request:false
                }   
            case type.LIKELIST_REQUEST:
                return {
                    ...state,
                    request:action.request
                }   
            default:     
        }
    
        return state;
     },
     homePageCount:(state=1,action)=>{
        const { count } = action;
        switch(action.type) {
            case types.LIKELIST_PAGECOUNT :
                return count;
            default :    
        }
        return state;

     },
     homeAllRequestFinished:(state=allRequestFinishedInitial,action)=>{   
         switch( action.type ) {
            
             case types.ALL_REQUEST_FINISHED :
                const copyArr = [...state,action.finish]
                return copyArr
             default:   
         }
         return state;
     },
     homeCity:(state=cityInitial,action)=>{
      
        // console.log( action )
        switch(action.type) {
            case types.CURRENT_CITY :
                return action.data
            default:    
        }

        return state;
     }
}


export default reducer;

//selector
//category
export  const  getHomeCategory = (state)=>{
    const copyState = Object.assign(state);
    return {
        homeCategory:copyState.homeCategory
    }
}
//headerline
export const getHomeHeaderLine = (state)=>{
    const copyState = Object.assign( state );
    return {
        homeHeaderLine:copyState.homeHeaderLine
    }
}
//discount
export const getHomeDiscount = (state)=>{
    const copyState = Object.assign( state );
    return {
        homeDiscount:copyState.homeDiscount
    }
}
//likelist
export const getHomeLikeList = (state)=>{
    const copyState = Object.assign( state );
    return {
        homeLikeList:copyState.homeLikeList
    }
}
//pageCount

export const getHomePageCount=(state)=>{
    return state.homePageCount;
}
//首页所有请求完毕数据处理
export const getHomeRequestFinish=(state)=>{
    const copyArr = state.homeAllRequestFinished.slice(0);
    let obj = {};
    for(let i=0;i<copyArr.length;i++) {
        let temp = copyArr[i];
        let key = Object.keys(temp)[0]
        let value = Object.values(temp)[0];
        obj[key]=value;
    }
    return obj;
}
export const getHomeCurrentCity = (state)=>{
    return state.homeCity;
}