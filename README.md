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

### 项目总结和项目优点
```
1.项目采用ducks的形式组织项目，containers项目为视图组件，redux目录为状态管理(action、reducer、selector)
获取视图组件状态数据使用selector函数(如果有计算类的selector采用的reselect库减少计算),redux采用分模块，一个为全局模块，一个为局部模块
2. 封装了原生fetch请求库(request.js),同时也封装了axios请求库(axiosRequest.js),
3.组件采用React类组件，函数组件，React-Hook进行编写，同时使用了高阶组件对某部分组件进行封装，实现了一个动态加载组件(asyncComponent.js)，当然也可以直接使用react-loadable这个库，
4.配置定制antd主题，路径别名等功能(具体可看config-overriders.js)
5.同时使用内置的workbox-webpack-plugin插件对资源进行缓存，加快加载速度。
tip:如果对React技术栈熟悉的也可以进行尝试借鉴，可能会启发新想法，不管新手或者熟练者都可以带给你一种新的思维方式，
如果喜欢请给个star，因为你的支持会是写者的东西，谢谢。

```


##### Tip
```
在npm install or yarn install 的时候，请确保网络良好，如个别依赖安装不了，请设置淘宝镜像为安装源；
如果有什么问题可以提issue,也可以加qq
qq:136859304
```

## License

[MIT](https://github.com/maomao1996/react-music/blob/master/LICENSE)
