//这里为单独存放url，通过一个函数返回
export default {
    test:(type)=> `/api/test/type=${type}`,//这个是一个示范
    
    homeCategoryData:"/home/category",//首页分类轮播数据
    homeHeaderLineUrl:"/home/headerLine",//headerline数据
    homeDiscountUrl:"/home/discount",//discount组件数据
    likeListUrl:"/home/likelist",//likelist组件数据
    overviewUrl:"/productdetail/overview",
    shopInfo:"/productdetail/shops",//shopInfo数据
    related:"/search/related",//related数据
    popular:"/search/popular",//热门关键词数据
    selector:"/searchResult/selector",//选择器数据
    content:"/searchResult/shopItem",//搜索结果内容
    keyword:"/searchResult/keyword",
    login:"/login",
    userOrder:"/user/order",
    userQuan:"/user/quan",
    searchKeyword:"/citylist/searchKeyword",
    moreCitys:"/citylist/moreCitys",
    orderInfo:"/purchase/orderInfo",
}