# react-dingping-webapp
基于React全家桶开发的大众点评webapp
> [在线演示地址](http://119.23.17.221:3004/)

## 适合者
```
本项目适用于于刚将了解、熟悉React全家桶和缺乏项目经验或者不知道怎么组织项目,想动手实战的react提高技术的人,因为本项目中采用很多不同的方法去编写不同的组件,
采用不同的方法编写相类似的组件,同时能让你更快的上手react全家桶及其相关的技术
```

## 如何安装与使用

```
(在git bash中运行一下命令,用以下载整个项目):
git clone https://github.com/jiudehuiyi/react-dingping-webapp.git (或者直接手动下载安装包) //下载react-player-music-PC

开启另外一个命令行(根据不同的系统,开启不一样,例:window系统:在当前项目文件夹打开cmd)
打开到my-app下的目录对依赖进行安装

npm install(或者使用yarn add) //安装依赖

npm run start //运行在浏览器上

npm run build  //项目打包
```

```
运行的第二个命令行窗口:后台服务器(数据接口)
打开my-app->src->server //进入后台服务器目录

npm install (或者使用yarn add) //安装依赖
node index.js //服务端运行

或者不打开第二个命令行窗口，直接使用我已经部署好的后台接口:
http://119.23.17.221:3003/
如果直接使用这个需要 修改utils目录下的axiosRequest.js文件，修改如下:
if( process.env.NODE_ENV === "development" ) {
    // axios.defaults.baseURL = "http://localhost:3003";//开发环境下的前序
    axios.defaults.baseURL = "http://119.23.17.221:3003";//后台服务器提供的接口
}else if( process.env.NODE_ENV === "production" ) {
    axios.defaults.baseURL = "http://119.23.17.221:3003";//后台服务器提供的接口
}

```
#### 如果运行失败请检查上述步骤或者直接加qq询问


## 技术栈
-  React ^16.13.1 (核心框架)
-  React-router-dom: ^5.2.0,
-  Redux ^4.0.5(状态管理)
-  React-redux ^5.0.7(react，redux联系库)
-  Redux-Thunk ^2.3.0(异步中间件)
-  antd ^4.4.3(阿里的React UI库)
-  ES6/ES7(Javascript语言的下一代标准)
-  less(css 预处理器)和css
-  Axios ^0.19.2(数据请求)
-  webpack: 4.42.0,(打包工具)
-  react-loadable: "^5.5.0",(按需加载库)
-  react-slick: ^0.27.0,
-  reselect: ^4.0.0",
-  workbox-webpack-plugin: 4.3.1


## 功能说明
- 请参考项目预览地址：> [在线演示地址](http://119.23.17.221:3004/)

##### Tip
```
在npm install or yarn install 的时候，请确保网络良好，如个别依赖安装不了，请设置淘宝镜像为安装源；
如果有什么问题可以提issue,也可以加qq
qq:136859304
```

## License

[MIT](https://github.com/maomao1996/react-music/blob/master/LICENSE)
