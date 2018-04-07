/*
  定义一些状态码相关的路由组件
*/
import React from "react";
import {Route, Redirect} from 'react-router-dom';
import NotFoundPage from './NotFound';
/*
  区分301和302跳转
    from ：原url
    to : 想跳转url
    status ：状态码，301或302

    使用实例：
    const App = () => (
      <Switch>
        <RedirectWithStatus
          status={301}
          from="/users"
          to="/profiles"
        />
        <RedirectWithStatus
          status={302}
          from="/courses"
          to="/dashboard"
        />
      </Switch>
    )
*/
export const RedirectWithStatus = ({ from, to, status }) => (
  <Route render={({ staticContext }) => {
    if (staticContext) //客户端没有staticContext
      staticContext.status = status
    return <Redirect from={from} to={to}/>
  }}/>
)


//其他状态码
export const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext)
      staticContext.status = code
    return children
  }}/>
)

//404 状态码
export const NotFound = () => (
  <Status code={404}>
    <NotFoundPage/>
  </Status>
);
