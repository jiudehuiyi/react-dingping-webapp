// 这里是用来储存各种全局状态的代码:
//types
export const  types = {

}

//actionCreator
export const actions = {
    test:(city)=>{
        return {
            type:"AA",
            data:city
        }
    }
}

//reducer

 const reducer = {

    aaReducer:(state="guangzhou",action)=>{

        switch(action.type){
            case "AA":
                return action.data
        }
        return state;
    }
}
export default reducer;


//