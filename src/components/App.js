import React from "react";
import {Route, Redirect} from 'react-router-dom';
import Loadable from 'react-loadable';
import {Link,Switch} from 'react-router-dom';
import LoadingComponent from './LoadingComponent';
import {NotFound} from './Status';
import '../assets/css/index.scss';

const Index = Loadable({
  loader: () => import('../containers/Index'),
  loading:LoadingComponent,
  delay: 300
});
const MyGuestBook = Loadable({
  loader: () => import('../containers/guest-book/MyGuestBook'),
  loading:LoadingComponent,
  delay: 300
});
const PersonalCenter = Loadable({
  loader: () => import('../containers/PersonalCenter'),
  loading:LoadingComponent,
  delay: 300
});

export default class App extends React.Component {
  render() {
    return (
      <div className="page">
        <Switch>
          <Route component={Index} path="/" exact/>
          <Redirect from="/index" to="/"/>
          <Route component={MyGuestBook} path="/myguestbook/:type"/>
          <Route component={PersonalCenter} path="/personalcenter" />
          <NotFound />
        </Switch>
      </div>
    )
  }
}
