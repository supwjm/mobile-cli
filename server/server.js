import http from 'http';
import express from 'express';
import path from 'path';
import React from 'react';
import Helmet from 'react-helmet';
import fs from 'fs';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import {StaticRouter} from 'react-router-dom';
import { matchPath } from 'react-router-dom'
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack'
import stats from '../loadable/react-loadable.json';
import App from '../src/components/App';
import getStore from '../src/store/index';
import ejs from 'ejs';

const app = express();
const port = 3000;
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');

//根据stats，modules生成script 和link标签
const createTags=(modules)=>{
  let bundles = getBundles(stats, modules);
  let scriptfiles = bundles.filter(bundle => bundle.file.endsWith('.js'));
  let stylefiles = bundles.filter(bundle => bundle.file.endsWith('.css'));
  let scripts=scriptfiles.map(script=>`<script src="/${script.file}"></script>`).join('\n');
  let styles=stylefiles.map(style=>`<link href="/${style.file}" rel="stylesheet"/>`).join('\n');
  return {scripts,styles}
}

const prepHTML=(data,{html,head,style,body,script,css,state})=>{
	data=data.replace('<html',`<html ${html}`);
	data=data.replace('</head>',`${head}${style}</head>`);
	data=data.replace('<body>',`<body><script>window._INIT_STATE_ = ${JSON.stringify(state)}</script>`);
	data=data.replace('<div id="root"></div>',`<div id="root">${body}</div><style id="jss-server-side">${css}</style>`);
	data=data.replace('</body>',`${script}</body>`);
	return data;
}

if ( process.env.NODE_ENV == 'local' ) {
  //解决开发环境下刷新找不到页面问题
  app.use('/', require('connect-history-api-fallback')());
  app.use(express.static(path.join(__dirname, '../build')));

  //配置自动编译
  var webpack = require('webpack');
  var webpackConfig = require('../webpack/webpack.config.js');
  var webpackCompiled = webpack(webpackConfig);
  var webpackDevMiddleware = require('webpack-dev-middleware');

  app.use(webpackDevMiddleware(webpackCompiled, {
    publicPath: "/",
    stats: {colors: true},
    lazy: false,
    logLevel:"warn",
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    }
  }));

  // 配置热更新
  var webpackHotMiddleware = require('webpack-hot-middleware');
  app.use(webpackHotMiddleware(webpackCompiled));

}else{
  app.use(express.static(path.join(__dirname, '../build')));

  app.use((req, res)=>{
    let modules = [];
    const context = {};
    let store = getStore();
    // 在请求内部
    // const promises = []
    // 用 `some` 模仿 `<Switch>` 选择第一个匹配的功能
    // routes.some(route => {
    //   const match = matchPath(req.url, route)
    //   if (match)
    //     promises.push(route.loadData(match))
    //   return match
    // })

    // Promise.all(promises).then(data => {
    //   //获取数据
    // }).catch(()=>{
    //
    // })

    let content = ReactDOMServer.renderToString(
      <Loadable.Capture report={moduleName => {modules.push(moduleName)}}>
        <Provider store={store}>
          <StaticRouter
            location={req.url}
            context={context}
          >
            <App/>
          </StaticRouter>
        </Provider>
      </Loadable.Capture>
    );
    let {styles,scripts} = createTags(modules);

    if (context.url) {
      redirect(context.status, context.url)
    } else {

      const filePath = path.resolve(__dirname,'../build/index.html');
      let htmlData = fs.readFileSync(filePath,'utf8');
      const helmet = Helmet.renderStatic();
      let state = store.getState();
  		const html = prepHTML(htmlData,{
  			html:helmet.htmlAttributes.toString(),
  			head:helmet.title.toString()+helmet.meta.toString()+helmet.link.toString(),
  			style:styles,
  			body:content,
  			script:scripts,
  			state,
  		})
      res.send(html);
    }
  })
}

Loadable.preloadAll().then(() => {
  app.listen(port, () => {
      console.log('Running on ' + port);
  });
});
