import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';

export const store = createStore(
  rootReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

// import {createStore, applyMiddleware} from "redux";
// import {rootReducer} from "./reducer";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from 'redux-devtools-extension';

// export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))