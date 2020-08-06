const express = require("express");
const { request, response } = require("express");
const dayjs = require('dayjs');
const app = express();
const cors = require("cors");
app.use( cors({
    exposedHeaders:["Authorization","ETag"],//配置前端可获取的请求头
}) );



const categoryDataSource = require("./category"); 
const headerLine = require("./headerLine");
const discount = require("./discount");
const likelist = require("./likeList");
const productDetailData = require("./productDetail");
const shops = require("./shop");
const related = require("./related");
const popular = require("./popular");
const zone = require("./zone");
const selectCategory = require("./selectCategory");
const sort = require("./sort");
const shopItem = require("./shopItem");
const allOrder = require("./allOrder");
const quan = require("./quan");
const cityList = require("./cityList");
const cityList2 = require("./cityList2");
const orderInfo = require("./ordreInfo");
app.get("/",(request,response)=>{
    response.status(200);
    response.send("Heloo express");
    response.end();
})

app.get("/rest",(request,response)=>{
    response.json({
        result:1,
        msg:"hello express"
    })
})

app.get("/home/category",function(req,res){
    res.json( categoryDataSource );
})
app.get("/home/headerLine",function(req,res){
    res.json( headerLine  );
})
app.get("/home/discount",function(req,res){
    res.json( discount );
})
let num = 0;
app.get("/home/likelist",function(req,res){
    const pageCount = parseInt(req.query.pageCount);

    if( pageCount <= 3 ){
        num=num+3;
        res.json( likelist.slice(0,pageCount*3) );
        console.log( pageCount )
    }else {
        null;
    }
}  )

app.get("/productdetail/overview",function(req,res){
    const query = req.query;
    const returnData = productDetailData[query.key];
    res.json(returnData);
})
app.get("/productdetail/shops",function(req,res){
    const query = req.query;
    const returnData = shops[query.key];
    console.log( returnData )
    res.json(returnData);
})

app.get("/search/related",function(req,res){
    const key = req.query;

    res.json( related );
})

app.get("/search/popular",function(req,res){
    
    res.json(popular);
})

app.get("/searchResult/selector",function(req,res){
    const obj = req.query;
    console.log( obj )
    if( obj.key === "zone" ) {
        res.json(zone);
    }else if( obj.key === "category" ) {
        res.json(selectCategory)
    }else if( obj.key === "sort" ) {
        res.json(sort)
    }
})
app.get("/searchResult/shopItem",function(req,res){
    //这里可以根据传过来的参数进行相应的处理返回数据
    const query = req.query;
    res.json(shopItem);
})
app.get("/searchResult/keyword",function(req,res){
    
    res.json({text:"自助餐"})
})

app.get("/login",function(req,res){
    const username = req.query.username;
    const password = req.query.password;
    console.log(typeof username,password )
    //这里模拟已经检验账号和密码都正确
    if( username == "123456" && password == "123456" ) {
        
        res.set({
            "Authorization":"xxxohefehfoehf982749137439479xnkxnxkjnxknxk",  
        })
        .json({
            status:200,
            message:"验证成功",
            getLoginStatus:true,
            token:"dohefehfoehf982749137439479xnkxnxkjnxknxk",
            username:username,
            avatar:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
        })  
    }else {
        res.json({
            status:404,
            message:"请求失败,没有找到资源"
        })
    }
})

app.get("/user/order",function(req,res){
    const id = req.query.id;
    //这里采用模拟删除，在真正的后台中回去真正删除相应的数据
    if( id ) {
        const getData =  allOrder.filter( (item,index)=>{
            return item.id != id;
        } )
        res.json( getData );
    }
    res.json(allOrder);
})
app.get("/user/quan",function(req,res){
    res.json(quan);
})
app.get("/citylist/searchKeyword",function(req,res){
    const key = req.query.key;

    if( key==="北京" || key==="beijing" ){
        return res.json([
            {value:key},
            {value:key},
            {value:key},
            {value:key}
        ])
    }else {
        return res.json([
            {value:"广州"},
            {value:"中国广东-广州"},
            {value:"广东-广州"},
        ]) 
    }
})    
app.get("/citylist/moreCitys",function(req,res){
    const key = req.query.key;
    if(key==1) {
        res.json(cityList);
    }else if(key==2){
        res.json(cityList2)
    }
})

app.get("/purchase/orderInfo",function(req,res){
    const key = req.query.key//这里真正的应该传递用户的id和购买的物品的id，这里就默认只返回一个数据
    res.json(orderInfo);

})

app.listen(3003);