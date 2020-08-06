
const zone = {
    title:"zone",
    finished:true,
    business:{
        title:"商区",
        high:{
            title:"热门商区",
            cate:["天河城","珠江新城","北京路","高德置地","小北/淘金","江南大道","江南西","天河北"]
        },
        yuexiu:{
            title:"越秀区",
            cate:["北京路","小北/淘金","沿江路/二沙岛","五羊新城","环市东","区庄/动物园","越秀公园","东风东"],
        },
        liwai:{
            title:"荔湾区",
            cate:["中山七八路","上下九","芳村","康王路","沙面","坦尾"],
        },
        "tianhe":{
            title:"天河区",
            cate:["天河城","珠江新城","北京路","高德置地","小北/淘金","江南大道","江南西","天河北"]
        },
        "haizhu":{
            title:"海珠区",
            cate:["北京路","小北/淘金","沿江路/二沙岛","五羊新城","环市东","区庄/动物园","越秀公园","东风东"]
        },
        huangbu:{
            title:"黄埔区",
            cate:["中山七八路","上下九","芳村","康王路","沙面","坦尾"]
        },
        panyu:{
            title:"番禺区",
            cate:["中山七八路","上下九","芳村","康王路","沙面","坦尾"]
        },
        baiyun:{
            title:"白云区",
            cate:["北京路","小北/淘金","沿江路/二沙岛","五羊新城","环市东","区庄/动物园","越秀公园","东风东"]
        },
        zengcheng:{
            title:"增城区",
            cate:["北京路","小北/淘金","沿江路/二沙岛","五羊新城","环市东","区庄/动物园","越秀公园","东风东"]
        }

    },
    subway:["7号线","1号线","2号线","3号线","4号线","5号线","6号线","8号线","9号线"],
    total:[
        {
            title:"热门商区",
            children:[{title:"天河城",key:"tianhecheng"},{title:"珠江新城",key:"zhujiangxincheng"},{title:"北京路",key:"beijinglu"},{title:"高德置地","key":"gaodezhidi"},{title:"小北/淘金",key:"xiaobeitaojin"},{title:"江南大道",key:"jiangnandadao"},{title:"江南西",key:"jiangnanxi"},{title:"天河北",key:"tianhebei"}]
        },
        {
            title:"越秀区",
            children:[{title:"北京路",key:"tianhecheng"},{title:"小北/淘金",key:"zhujiangxincheng"},{title:"沿江路/二沙岛",key:"beijinglu"},{title:"环市东","key":"gaodezhidi"},{title:"越秀公园",key:"xiaobeitaojin"},{title:"东风东",key:"jiangnandadao"}]

        },
        {
            title:"荔湾区",
            children:[{title:"中山七八路",key:"tianhecheng"},{title:"上下九",key:"zhujiangxincheng"},{title:"芳村",key:"beijinglu"},{title:"康王路","key":"gaodezhidi"},{title:"沙面",key:"xiaobeitaojin"},{title:"坦尾",key:"jiangnandadao"}]

        },
        {
            title:"天河区",
            children:[{title:"天河城",key:"tianhecheng"},{title:"珠江新城",key:"zhujiangxincheng"},{title:"北京路",key:"beijinglu"},{title:"高德置地","key":"gaodezhidi"},{title:"小北/淘金",key:"xiaobeitaojin"},{title:"江南大道",key:"jiangnandadao"},{title:"江南西",key:"jiangnanxi"},{title:"天河北",key:"tianhebei"}]

        },
        {
            title:"海珠区",
            children:[{title:"北京路",key:"tianhecheng"},{title:"小北/淘金",key:"zhujiangxincheng"},{title:"沿江路/二沙岛",key:"beijinglu"},{title:"五羊新城","key":"gaodezhidi"},{title:"区庄/动物园",key:"xiaobeitaojin"},{title:"东风东",key:"jiangnandadao"},{title:"江南西",key:"jiangnanxi"},{title:"天河北",key:"tianhebei"}]

        },
        {
            title:"黄埔区",
            children:[{title:"中山七八路",key:"tianhecheng"},{title:"上下九",key:"zhujiangxincheng"},{title:"芳村",key:"beijinglu"},{title:"康王路","key":"gaodezhidi"},{title:"小北/淘金",key:"xiaobeitaojin"},{title:"江南大道",key:"jiangnandadao"},{title:"江南西",key:"jiangnanxi"},{title:"天河北",key:"tianhebei"}]

        },
        {
            title:"番禺区",
            children:[{title:"中山七八路",key:"tianhecheng"},{title:"上下九",key:"zhujiangxincheng"},{title:"北京路",key:"beijinglu"},{title:"坦尾","key":"gaodezhidi"},{title:"小北/淘金",key:"xiaobeitaojin"},{title:"江南大道",key:"jiangnandadao"},{title:"江南西",key:"jiangnanxi"},{title:"天河北",key:"tianhebei"}]

        },
        {
            title:"白云区",
            children:[{title:"北京路",key:"tianhecheng"},{title:"五羊新城",key:"zhujiangxincheng"},{title:"越秀公园",key:"beijinglu"},{title:"高德置地","key":"gaodezhidi"},{title:"小北/淘金",key:"xiaobeitaojin"},{title:"江南大道",key:"jiangnandadao"},{title:"江南西",key:"jiangnanxi"},{title:"天河北",key:"tianhebei"}]

        },
        {
            title:"增城区",
            children:[{title:"北京路",key:"tianhecheng"},{title:"五羊新城",key:"zhujiangxincheng"},{title:"越秀公园",key:"beijinglu"},{title:"高德置地","key":"gaodezhidi"},{title:"小北/淘金",key:"xiaobeitaojin"},{title:"江南大道",key:"jiangnandadao"},{title:"江南西",key:"jiangnanxi"},{title:"天河北",key:"tianhebei"}]

        }
    ]
}   

module.exports = zone;
