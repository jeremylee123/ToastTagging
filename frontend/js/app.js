import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import FontFaceObserver from 'fontfaceobserver';

import Root from './Root';
//reducer
import LoginReducer from './Login/reducers/LoginReducer';
import SystemsListReducer from './SystemsList/reducers/SystemsListReducer';
import SystemInfoReducer from './SystemInfo/reducers/SystemInfoReducer';

// Import the CSS file, which webpack transfers to the build folder
import '../css/main.css';

// Creates the Redux reducer with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(combineReducers({login: LoginReducer, systemsList: SystemsListReducer, SystemInfo: SystemInfoReducer}));


// Mostly boilerplate, except for the Routes. These are the pages you can go to,
// which are all wrapped in the App component, which contains the navigation etc
ReactDOM.render(
  <Root store={store} />,
  document.getElementById('app')
);
