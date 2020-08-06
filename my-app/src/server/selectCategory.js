const selectCategory = {
    title:"category",
    finished:true,
    allSort:{
        title:"全部分类",
        children:["美食","酒店"]
    },
    delicious:{
        title:"美食",
        children:[
            { title:"粤菜",key:"yuecai" },
            { title:"自助餐",key:"zizhucan" },
            { title:"日本菜",key:"ribencai" },
            { title:"西餐",key:"xican" },
            { title:"咖啡厅",key:"kafeiting" },
            { title:"韩国料理",key:"hanguoliaoli" },
            { title:"火锅",key:"huoguo" },
            { title:"川菜",key:"chuancai" },
            { title:"小龙虾",key:"xiaolongxia" },
            { title:"烧烤烤串",key:"kaochuan" },
            { title:"江湖和海鲜",key:"haixian" },
            { title:"烤肉",key:"kaorou" },
            { title:"素食",key:"sushi" },
            { title:"小食",key:"xiaoshi" },
            { title:"小吃快餐",key:"xiaochi" },
        ]
    },
    host:{
        title:"酒店",
        children:["度假酒店","商务酒店"]
    },
    total:[
        {
            title:"全部分类",
            children:[
                { title:"美食",key:"meishi" },
                {
                    title:"酒店",key:"jiudian"
                }
                ]
        },
        {
            title:"美食",
            children:[
                { title:"粤菜",key:"yuecai" },
                { title:"自助餐",key:"zizhucan" },
                { title:"日本菜",key:"ribencai" },
                { title:"西餐",key:"xican" },
                { title:"咖啡厅",key:"kafeiting" },
                { title:"韩国料理",key:"hanguoliaoli" },
                { title:"火锅",key:"huoguo" },
                { title:"川菜",key:"chuancai" },
                { title:"小龙虾",key:"xiaolongxia" },
                { title:"烧烤烤串",key:"kaochuan" },
                { title:"江湖和海鲜",key:"haixian" },
                { title:"烤肉",key:"kaorou" },
                { title:"素食",key:"sushi" },
                { title:"小食",key:"xiaoshi" },
                { title:"小吃快餐",key:"xiaochi" },
            ]
        },
        {
            title:"酒店",
            children:[
                {title:"度假酒店",key:"dujiajiudian"},
                {title:"商务酒店",key:"shangwujudian"}
            ]
        }

    ]
}

module.exports  = selectCategory;