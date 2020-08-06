import urls from "../../utils/urls";
import requestAxios from "../../utils/axiosRequest";
import { createSelector  } from "reselect"
//types
export const types = {
    ORDER_INFO:"PURCHASE/ORDER_INFO",
    ORDER_INFO_SUCCESS:"PURCHASE/ORDER_INFO",
    ORDER_INFO_FAIL:"PURCHASE/ORDER_INFO",

    ORDER_PRICE:"PURCHASE/ORDER_PRICE",
    ORDER_NUMS:"PURCHASE/ORDER_NUMS"
}

//actionCreator
export const actions = {
    orderInfoSuccess:(data)=>{
        return {
            type:types.ORDER_INFO_SUCCESS,
            success:true,
            data:data,
        }
    },
    orderInfoFail:()=>{
        return {
            type:types.ORDER_INFO_FAIL,
            fail:true
        }
    },
    orderInfo:(key)=>{
        return (dispatch,getState)=>{
            
            requestAxios.get(urls.orderInfo,{key:key})
            .then( (data)=>{
                dispatch( actions.orderInfoSuccess(data) );
                dispatch( actions.orderPrice(data.price) );
                dispatch( actions.orderNums(data.nums) );
                // dispatch( actions.allRequestFinished({category:true}) );
            } ).catch( err=>{
                dispatch( actions.orderInfoFail() );
                // dispatch( actions.allRequestFinished({category:false}) );
            } )
                
            
        }
    },

    orderPrice:(price)=>{
        return {
            type:types.ORDER_PRICE,
            price:price,
        }
    },
    orderNums:(num)=>{
        return {
            type:types.ORDER_NUMS,
            num,
        }
    }
}

//reducer
const iniObj = {
    orderInfo:{
        request:true,
        fail:false,
        success:false,
        data:[]
    },
    price:0,
    num:1,
}
const reducer ={
    orderInfo : (state=iniObj.orderInfo,action)=>{
        const { type } = action;
        switch( type ) {
            case types.ORDER_INFO_SUCCESS:
                return {
                    ...state,
                    data:action.data,
                    success:action.success,
                }
            case  types.ORDER_INFO_FAIL:
                return {
                    ...state,
                    fail:action.fail,
                    request:false
                }   
    
            default:     
        }
    
        return state;
     },

   price:(state=iniObj.price,action)=>{
        switch(action.type){
            case types.ORDER_PRICE:
                return action.price
            default:    
        }

        return state;
   },
   orderNums:(state=iniObj.num,action)=>{
        switch(action.type){
            case types.ORDER_NUMS:
                return action.num
            default:    
        }

        return state;
    },
     
}
export default reducer;

//selector
export const getOrderInfo = (state)=>{
    const copyObj = Object.assign(state.orderInfo);
    return copyObj
}
export const getPrice = (state)=>{
    return state.price
}
export const getOrderNums = (state)=>{
    return state.orderNums
}
export const getTotalPrice = createSelector(
    [
        getPrice,  
        getOrderNums
    ],
    (price,nums)=>{
        return price*nums
    }
);