import {
  applyMiddleware,
  createStore,
  combineReducers
} from 'redux';
import cartReducer from './cartReducer.js';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
let { createLogger } = require('redux-logger');

let middleware=[promise, thunk];
middleware = [...middleware, createLogger()];

const reducers = combineReducers({
  cartReducer
});

const rootReducer = (state, action) => {
  let result = reducers(state, action);
  return result;
}

export default createStore(rootReducer, applyMiddleware(...middleware))