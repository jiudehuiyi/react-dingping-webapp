
import urls from "../../utils/urls";
import requestAxios from "../../utils/axiosRequest";

//types

export const types = {
    "USER_HEADER_SELECT":"USER/USER_HEADER_SELECT",

    //订单类数据
    "USER_ORDER":"USER/USER_ORDER",
    "USER_ORDER_SUCCESS":"USER/USER_ORDER_SUCCESS",
    "USER_ORDER_FAIL":"USER/USER_ORDER_FAIL",

    //抵用券数据
    "USER_QUAN":"USER/USER_QUAN",
    "USER_QUAN_SUCCESS":"USER/USER_QUAN_SUCCESS",
    "USER_QUAN_FAIL":"USER/USER_QUAN_FAIL",
}

//creatorAction

export const actions = {
    userHeaderSelectData:(select)=>{
        return {
            type:types.USER_HEADER_SELECT,
            select:select
        }
    },

    //订单类action
    userOrderSuccess:(data)=>{
        return {
            type:types.USER_ORDER_SUCCESS,
            data,
        }
    },
    userOrderFail:()=>{
        return {
            type:types.USER_ORDER_FAIL
        }
    },
    userOrder:(id)=>{
        return (dispatch,getState)=>{
            requestAxios.get(urls.userOrder,{
                id:id
            })
            .then( (data)=>{
                dispatch( actions.userOrderSuccess(data) );
            } ).catch( err=>{
                dispatch( actions.userOrderFail() );
            } )
        }
    },

    //抵用券数据
    userQuanSuccess:(data)=>{
        return {
            type:types.USER_QUAN_SUCCESS,
            data,
        }
    },
    userQuanFail:()=>{
        return {
            type:types.USER_QUAN_FAIL
        }
    },
    userQuan:(id)=>{
        return (dispatch,getState)=>{
            requestAxios.get(urls.userQuan)
            .then( (data)=>{
                dispatch( actions.userQuanSuccess(data) );
            } ).catch( err=>{
                dispatch( actions.userQuanFail() );
            } )
        }
    },
 
}

//reducer
const iniObj = {
    select:0,
    order:{
        success:false,
        fail:false,
        data:{}
    },
    quan:{
        success:false,
        fail:false,
        data:{}
    }
}
const reducer = {

    userHeaderSelect:(state=iniObj.select,action)=>{
        switch(action.type){
            case types.USER_HEADER_SELECT:
                return action.select
            
            default:    
        }
        return state;
    },
    userOrder:(state=iniObj.order,action)=>{
        const { type, } = action;
        switch( type ){
            case types.USER_ORDER_SUCCESS:
                return {
                    ...state,
                    data:action.data,
                    success:true,
                    fail:false,
                }
            case types.USER_ORDER_FAIL:
                return {
                    ...state,
                    success:false,
                    fail:true
                }    
            default:    
        }

        return state;
    },
    userQuan:(state=iniObj.quan,action)=>{
        const { type, } = action;
        switch( type ){
            case types.USER_QUAN_SUCCESS:
                return {
                    ...state,
                    data:action.data,
                    success:true,
                    fail:false,
                }
            case types.USER_QUAN_FAIL:
                return {
                    ...state,
                    success:false,
                    fail:true
                }    
            default:    
        }

        return state;
    },

}
export default reducer;

//selector
export const getUserHeaderSelect=(state)=>{
    return state.userHeaderSelect
}
export const getUserOrder = (state)=>{
    const copyObj = Object.assign(state.userOrder);
    return copyObj;
}
export const getUserQuan = (state)=>{
    const copyObj = Object.assign( state.userQuan );
    return copyObj;
}

