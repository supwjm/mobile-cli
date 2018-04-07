环境 ：webpack3、react16、redux3、react-router4

支持编译 : sass、jsx es6 ( babel-preset-env )

目录结构：

mobile-gstzy 项目名
|-dist 编译目录
|-doc 说明文档目录
|-server 服务端
  |-routes 服务端路由目录，预留。
  |-app.js 启动文件
  |-ignore.js 服务端忽略css和图片
  |-server.js 创建node服务器程序文件
|-src 客户端源码
  |-assets
    |-img 图片，预留。
    |- css 样式文件目录,css统一以sass写后缀名.scss
      |- common 公共样式文件
      |- components 组件样式
      |- pages 页面样式
      |-index.scss 引入所有的公共样式，组件和页面样式在各自的组件和页面中引入，不在此处引入。
  |-actions action 目录
  |-reducers reducer 目录
    |-index.js 汇总所有的reducer
  |-store 创建store
  |-template 生成 html 的模板文件
  |-components 组件目录
    |-App.js 初始化路由配置组件
  |-config 配置文件目录
  |-containers 容器文件目录;移动web、平安 通过不同的环境变量，在路由中引入不同的组件
  |-utils 工具函数目录
|-webpack webpack 配置文件
  |-postcss.config.js 配置自动补全浏览器css前缀和自动px转rem
  |-webpack.config.js webpack 配置文件，开发环境和生产环境在一个文件中，通过环境变量区分
|-package.json
|-.gitignore git 忽略文件
|-theme.js ant design 自定义样式

注：
1、css 统一用sass写，less用于编译ant design mobile 的样式文件
2、base.scss 样式flext布局编译会出现warn，主要是为了兼容flex布局。

启动开发环境：
npm run start:dev

启动线上环境
npm run build
npm run start

重启
pm2 restart index

杀死进程
pm2 delete index

/*
  备忘用：
    "start": "cross-env NODE_ENV=production node server/app.js"
    "dev": "cross-env NODE_ENV=local webpack-dev-server --config ./webpack/webpack.config.js"
*/
