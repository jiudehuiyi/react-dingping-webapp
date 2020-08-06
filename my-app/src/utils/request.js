
/*
        封装fetch的get和post
*/
const headers = new Headers({
    "Accept":"application/json",
    "Content-Type":"application/json",
})


function get(url){
    return fetch(url,{
        method:"GET",
        headers:headers
    }).then( response=>{
        return handleResponse(url,response,"GET");
    } ).catch( err=>{
        console.error(`Request fail from url:${url},err:${err}`);
        return Promise.reject({
            error:{
                message:`Get fail from browser`,
                code:"4xx"
            }
        })
    } )
}

function post(url,data){
    return fetch(url,{
        method:"POST",
        headers:headers,
        data:data
    }).then( response=>{
        return handleResponse(url,response,"POST")
    } ).catch( err=>{
        console.error(`Request fail from url:${url},err:${err}`);
        return Promise.reject({
            error:{
                message:`POST fail from browser`,
                code:"4xx"  
            }
        })
    } )
}

function handleResponse(url,response,method){
    let res = response;
    if( res.status > 200 && res.status <= 300 ) {
        res.json();
    }else {
        console.error(` Request fail of ${method==="GET"?"GET":"POST"} url:${url}`);
        //返回一个promise
        Promise.reject({
            error:{
                message:"Request fail  from serve",
                code:"5xx",
            }
        });
    }
}


export default {
    get,post
}
