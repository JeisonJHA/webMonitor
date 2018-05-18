import { applyMiddleware, createStore, compose } from 'redux';
import allReducers from '../reducers';
// import logger from "redux-logger";

const middleware = applyMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const Store = createStore(allReducers, /* preloadedState, */ composeEnhancers(
  middleware)
);


// export const Store = createStore(allReducers,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  // middleware);