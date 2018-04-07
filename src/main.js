import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import Loadable from 'react-loadable';
import App from './components/App';
import getStore from './store/index';

// import { routerReducer } from 'react-router-redux/lib/reducer';
// import rootReducer from './reducers/index';
// import { composeWithDevTools } from 'redux-devtools-extension'

if(typeof document !== 'undefined' && window) {
  window.onload = () => {
    let initialState = window._INIT_STATE_ ? window._INIT_STATE_ : {}
    let store = getStore(initialState);
    let render = process.env.NODE_ENV == 'local' ? ReactDOM.render : ReactDOM.hydrate;

    Loadable.preloadReady().then(() => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
        </Provider>,
        document.getElementById('app')
      );
    });

  };
}

//开启热更新
if (module.hot) {
  module.hot.accept()
}
