const {override, fixBabelImports,addLessLoader} = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        //针对antd实现按需打包,按照import来打包(使用babel-plugin-import包)
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, //自动打包相关的样式
    }),
    //使用less-loader对源码中less的变量进行重新指定
    addLessLoader({
        javascriptEnabled: true,
        modifiers: {'@primary-color':'#1DA57A'},
    }),
);
