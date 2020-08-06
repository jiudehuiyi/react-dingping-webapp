import axios from "axios";
/*

    axios的封装

*/


//301 永久重定向，一般未登录就进行请求会出现301
//304 协商缓存
const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
  };

//区分开发环境和生产环境设置baseUrl
if( process.env.NODE_ENV === "development" ) {
    axios.defaults.baseURL = "http://localhost:3003";//开发环境下的前序
}else if( process.env.NODE_ENV === "production" ) {
    axios.defaults.baseURL = "http://119.23.17.221:3003";//后台服务器提供的接口
}
//设置请求超时时间，单位为毫秒
axios.defaults.timeout = 10000;

//请求拦截器(发送请求前可以做的操作)
axios.interceptors.request.use(
    (config)=>{
        //设置请求头的发送类型和返回数据类型
        let headers = {
            "Accept":"application/json",
            "Content-Type":"application/json"
        };
        //获取本地存储的Token值
        let token = localStorage.getItem("token");
        if(token) {
            headers["authorization"] = token;
        }
        return {
            ...config,
            headers:headers
        }

    },
    (error)=>{
        Promise.reject(error);
    }
)
//响应相应拦截器(接受相应前做的操作)
axios.interceptors.response.use(
    (response)=>{
        
        const status = response.status;
        //响应错误的处理
        if( status < 200 || status >= 300 ) {
            return Promise.reject({
                message:response.message,
                status:status,
            })
        };
        const token = response.headers.authorization;
        if(token) {
            localStorage.setItem("token",token);
        }
        return response;

    },
    (err)=>{
        const errStatus = err.response.status;
        if( errStatus ) {
            switch( errStatus ) {
                //具体错误请看上面codeMessage对象
                //401一般为未登录，未登录则跳转登录页面，并携带当前页面的路径，在登录成功后返回当前页面，这一步需要在登录页操作
                case 401 :
                    //这里设置返回登录页面的代码，具体代码可以根据相应的页面进行实现，这里给出一个示例代码
                    // window.history.push("/login");
                break;
                case 403 :
                //403一般为token登录过期，登录过期对用户进行提示，清除本地token和清空vuex中token对象，跳转登录页面   
                //这里可以加载一个提示组件，例如Toast或者Modal
                //清除Token 
                localStorage.removeItem("token");
                //然后跳转登录页面 
                break;
                case 404 :
                //404请求的资源不存在，提示相应的不存在错误，
                 Promise.reject({
                     status:errStatus,
                     message:codeMessage[errStatus]
                 })
                 break;
                 default:   
            }

            //其它错误
            return Promise.reject({
                error:{
                    code:errStatus,
                    message:codeMessage[errStatus],
                }
            })
        }
    }
);

//上述的错误处理直接写在局部，当然也可以单独做全局处理，另外封装一个函数，例如:
// const errorHandler =  error => {
//     const { response, message } = error;
//     if (response && response.status) {
//       // 无登录
//       if (response.status === 401) {
//         return;
//       }
//       const data =  response.clone().json();
//       const errorText = data.message || codeMessage[response.status] || response.statusText;
//       notification.error({
//         message: `请求错误: `,
//         description: errorText,
//       });
//     } else if (!response) {
//       notification.error({
//         description: '您的网络发生异常，无法连接服务器',
//         message: '网络异常',
//       });
//     } else if (message && typeof message === 'string') {
//       notification.error({
//         description: error.message,
//         message: '出错了',
//       });
//       throw error;
//     }
  
//     throw error;
//   };


/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url,params){
    return new Promise( (resolve,reject)=>{
        axios.get( url, {
            params:params
        } ).then( res=>{
            resolve( res.data );
        } ).catch( err=>{
            reject({
                error:{
                    message:`Get fail from browser`,
                    code:"4xx",
                    err:err
                }
            });
        } )
    } )
}

function post(url,data){
    return new Promise( (resolve,reject)=>{
        axios.post( url,JSON.stringify(data) )//JSON.stringify(data)可选
        .then( res=>{
            resolve(res);
        } )
        .catch( err=>{
            reject({
                error:{
                    message:`Get fail from browser`,
                    code:"4xx",
                    err:err
                }
            });
        } )
    }  );
}

function put(url,params){
    return new Promise( (resolve,reject)=>{
        axios.put(url,params)
        .then( res=>{
            resolve(res.data);
        } )
        .catch( err=>{
            reject( {
                error:{
                    message:`Get fail from browser`,
                    code:"4xx",
                    err:err
                }
            } )
        } )
    } )
}

function deleteRe(url,params){
    return new Promise( (resolve,reject)=>{
        axios.delete(url,params)
        .then( res=>{
            resolve(res.data);
        } )
        .catch( err=>{
            reject( {
                error:{
                    message:`Get fail from browser`,
                    code:"4xx",
                    err:err
                }
            } )
        } )
    } )
}


export default {
    get,post,
    put,deleteRe
}