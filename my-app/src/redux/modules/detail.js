import urls from "../../utils/urls";
import requestAxios from "../../utils/axiosRequest";


//actionTypes
export const types = {
    //overview数据
    PRODUCT_OVERVIEW_REQUEST:"DETAIL/PRODUCT_OVERVIEW_REQUEST",
    PRODUCT_OVERVIEW_SUCCESS:"DETAIL/PRODUCT_OVERVIEW_SUCCESS",
    PRODUCT_OVERVIEW_FAIL:"DETAIL/PRODUCT_OVERVIEW_FAIL",
    PRODUCT_OVERVIEW_DATA:"DETAIL/PRODUCT_OVERVIEW_DATA",

    //shopInfo数据
    SHOP_INFO_REQUEST:"DETAIL/SHOP_INFO_REQUEST",
    SHOP_INFO_SUCCESS:"DETAIL/SHOP_INFO_SUCCESS",
    SHOP_INFO_FAIL:"DETAIL/SHOP_INFO_FAIL",
    SHOP_INFO_DATA:"DETAIL/SHOP_INFO_DATA",
}

//actionCreator

export const actions = {
    //overview数据
    overviewRequest:(boo)=>{
        return {
            type:types.PRODUCT_OVERVIEW_REQUEST,
            request:boo
        }
    },
    overviewSuccess:(data)=>{
        return {
            type:types.PRODUCT_OVERVIEW_SUCCESS,
            success:true,
            data:data,
        }
    },
    overviewFail:()=>{
        return {
            type:types.PRODUCT_OVERVIEW_FAIL,
            fail:true
        }
    },

    overviewData: (key)=>{
        return (dispatch,getState)=>{
            requestAxios.get(urls.overviewUrl,{key:key})
            .then( (data)=>{
                dispatch( actions.overviewSuccess(data) );
            } ).catch( err=>{
                dispatch( actions.overviewFail() );
            } )
                
            
        }
    },

     //shopInfo数据
    shopInfoRequest:(boo)=>{
        return {
            type:types.SHOP_INFO_REQUEST,
            request:boo
        }
    },
    shopInfoSuccess:(data)=>{
        return {
            type:types.SHOP_INFO_SUCCESS,
            success:true,
            data:data,
        }
    },
    shopInfoFail:()=>{
        return {
            type:types.SHOP_INFO_FAIL,
            fail:true
        }
    },

    shopInfoData: (key)=>{
        return (dispatch,getState)=>{
            requestAxios.get(urls.shopInfo,{key:key})
            .then( (data)=>{
                dispatch( actions.shopInfoSuccess(data) );
            } ).catch( err=>{
                dispatch( actions.shopInfoFail() );
            } )
                
            
        }
    },

}

const iniObj={
    // overview:{
    //     currentPrice: 0,
    //     description: "",
    //     detail: {},
    //     id: "",
    //     nearestShop: "",
    //     oldPrice: 0,
    //     picture: "",
    //     product: "",
    //     purchaseNotes:[],
    //     saleDesc: "",
    //     shop: "",
    //     shopIds:[],
    //     tag: "",
    //     validityPeriod: "",
    // }
    overview:{
        request:true,
        fail:false,
        success:false,
        data:{}
    },
    shopInfo:{
        request:true,
        fail:false,
        success:false,
        data:{}
    }
}

//reducer
 const reducer = {
    detailOverview:(state=iniObj.overview,action)=>{
       
        switch(action.type){
            case types.PRODUCT_OVERVIEW_SUCCESS:
                return {
                    ...state,
                    data:action.data,
                    success:action.success,
                    request:false
                }
            case  types.PRODUCT_OVERVIEW_FAIL:
                return {
                    ...state,
                    fail:action.fail,
                    request:false
                }   
            case types.PRODUCT_OVERVIEW_REQUEST:
                return {
                    ...state,
                    request:action.request
                }   
            default:    
        }

        return state;
    },
    detailShopInfo:(state=iniObj.shopInfo,action)=>{

        switch(action.type){
            case types.SHOP_INFO_SUCCESS:
                return {
                    ...state,
                    data:action.data,
                    success:action.success,
                    request:false
                }
            case  types.SHOP_INFO_FAIL:
                return {
                    ...state,
                    fail:action.fail,
                    request:false
                }   
            case types.SHOP_INFO_REQUEST:
                return {
                    ...state,
                    request:action.request
                }   
            default:    
        }
        return state;
    }
}
export default reducer;
//selector
export const getDetailOverview=(state)=>{
    const copyObj = Object.assign( state.detailOverview );
    return copyObj;
}
export const getDetailShopInfo=(state)=>{
    const copyObj = Object.assign( state.detailShopInfo );
    return copyObj;
}