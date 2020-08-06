import React from "react";
//获取当前城市信息
// const showCityInfo=()=> {
        
//         //实例化城市查询类
//         var citysearch = new window.AMap.CitySearch();
//         //自动获取用户IP，返回当前城市
//         citysearch.getLocalCity(function(status, result) {
//             if (status === 'complete' && result.info === 'OK') {
//                 if (result && result.city && result.bounds) {
//                     var cityinfo = result.city;
//                     var citybounds = result.bounds;
                   
//                     // document.getElementById('tip').innerHTML = '您当前所在城市：'+cityinfo;
//                     //地图显示当前城市
//                     // map.setBounds(citybounds);
//                 }
//             } 
//         });       
// }

const cityInfoHighComponent = (WrapperComponent)=>{
    return class GetCityInfo extends React.Component {
        state={
            cityStatus:"",
            result:{},
        }

        componentDidMount(){
            var citysearch = new window.AMap.CitySearch();
            citysearch.getLocalCity( (status, result)=>{
                this.setState({
                    cityStatus:status,
                    result,
                })
            } )
        }
        render(){
            return <WrapperComponent {...this.props} {...this.state}  />
        }

    }
}
export default cityInfoHighComponent