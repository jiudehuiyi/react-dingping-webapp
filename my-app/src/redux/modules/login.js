import urls from "../../utils/urls";
import requestAxios from "../../utils/axiosRequest";




//types
export const types = {

    LOGIN_DATA:"LOGIN/LOGIN_DATA",
    LOGIN_REQUEST:"LOGIN/LOGIN_REQUEST",
    LOGIN_SUCCESS:"LOGIN/LOGIN_SUCCESS",
    LOGIN_FAIL:"LOGIN/LOGIN_FAIL",

    LOGIN_STATUES:"LOGIN/LOGIN_STATUES",
    
    LOGOUT:"LOGOUT",
}

//actionCreator
export const actions = {

     //登录
     loginRequest:(boo)=>{
        return {
            type:types.LOGIN_REQUEST,
            request:boo
        }
    },
    loginSuccess:(data)=>{
        return {
            type:types.LOGIN_SUCCESS,
            success:true,
            data:data,
        }
    },
    loginFail:()=>{
        return {
            type:types.LOGIN_FAIL,
            fail:true
        }
    },

    loginStatus:(boo)=>{
        return {
            type:types.LOGIN_STATUES,
            loginStatus:boo,
        }
    },

    //注销(本来注销是往后台中去给数据的，这里简略改变状态就算了)
    logout:()=>{
        return (dispatch,getState)=>{
            dispatch( actions.loginStatus(false) );
            localStorage.removeItem("loginStatus")
        }
    },
   

    loginData:(username,password)=>{
        return (dispatch,getState)=>{

            requestAxios.get(urls.login,{
                username,
                password
            })
            .then( (data)=>{
                localStorage.setItem("loginInfo",JSON.stringify(data))
                dispatch( actions.loginSuccess(data) );
                dispatch( actions.loginStatus(data.getLoginStatus) );
                localStorage.setItem("loginStatus",JSON.stringify(data.getLoginStatus))
                // dispatch( actions.allRequestFinished({category:true}) );
            } ).catch( err=>{
                dispatch( actions.loginFail() );
                dispatch( actions.loginStatus(false) );
                // dispatch( actions.allRequestFinished({category:false}) );
            } ).finally( ()=>{

            } )
                
            
        }
    },

}



//reducer
const iniObj = {
    login:{
            request:true,
            fail:false,
            success:false,
            data:{}
    },
    loginStatus: localStorage.getItem("loginStatus") || false,
}
const reducer = {
    login:  (state=iniObj.login,action)=>{
        const { type } = action;
        switch( type ) {
            case types.LOGIN_SUCCESS:
                return {
                    ...state,
                    data:action.data,
                    success:action.success,
                    request:false
                }
            case  types.LOGIN_FAIL:
                return {
                    ...state,
                    fail:action.fail,
                    request:false
                }   
            case types.LOGIN_REQUEST:
                return {
                    ...state,
                    request:action.request
                }
               
            default:     
        }
    
        return state;
     },

    loginStatus:(state=iniObj.loginStatus,action)=>{
        const loginStatus=action.loginStatus;
        switch(action.type){
            case types.LOGIN_STATUES:
        
                return loginStatus;
            default:
                 
            }
        return state;
    } 
}
export default reducer;


//selector
export const getLogin = (state)=>{
    const copyObj = Object.assign(state.login);
    return copyObj;
}

export const getLoginStatus=(state)=>{
    return state.loginStatus
}