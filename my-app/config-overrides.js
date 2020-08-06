const { override, fixBabelImports,addWebpackAlias,addLessLoader  } = require('customize-cra');
const path = require("path")
module.exports = override(
fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		// style: 'css',
		style:true
	}),
	addWebpackAlias({ //路径别名
		'@': path.resolve(__dirname, 'src'),
	  }),
	  addLessLoader({
		javascriptEnabled: true,
		//配置相关主题
		modifyVars: { '@primary-color': '#FF6633' },
	  }),
	  
	  
);


// // config-overrides.js
// var path = require('path')
// // const rewireWebpackBundleAnalyzer = require('react-app-rewire-webpack-bundle-analyzer')
// const { injectBabelPlugin } = require('react-app-rewired')  // 安装babel-plugin-import插件（按需加载组件代码及样式的babel插件）
// const rewireLess = require('react-app-rewire-less') 
// // const theme = require('./theme')


// module.exports = function override(config, env) {

//     config.resolve.alias['@Components'] = resolve('src/components')
//     config.resolve.alias['@Page'] = resolve('src/page')
//     config.resolve.alias['@Services'] = resolve('src/services')
//     config.resolve.alias['@Store'] = resolve('src/store')
//     config.resolve.alias['@Utils'] = resolve('src/utils')
//  // 自定义主题
//  config = injectBabelPlugin(
//     ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], // change importing css to less
//     config
// )

//     config= rewireLess.withLoaderOptions({
//         modifyVars:{ '@primary-color': '#1DA57A' },   //theme,
//         javascriptEnabled:true
//     })(config,env)

//     return config
// }