import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

//import DevTools from '../DevTools'; // 辅助工具
import reducers from '../reducers';

let enhancer = applyMiddleware(thunk);
if (process.env.NODE_ENV === 'local') {
    enhancer = compose(
        applyMiddleware(thunk, createLogger())
        //,DevTools.instrument()
    )
}

export default function getStore(){
  let store = createStore(
      reducers,
      enhancer
  );
  return store;
}


if (module.hot) {
    //为 reducers 开启热更新
    module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers').default;
        store.replaceReducer(nextRootReducer)
    })
}
