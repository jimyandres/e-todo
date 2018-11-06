import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';

import combinedReducers from '../reducers';
import DevTools from '../components/shared/DevTools';

const loggerMiddleware = createLogger();

const enhancer = compose(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
  DevTools.instrument(),
);

const configureStore = (initialState) => {
  const store = createStore(combinedReducers, initialState, enhancer);

  // Hot reload reducers
  if (module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(combinedReducers));
  }

  return store;
};

export default configureStore;
