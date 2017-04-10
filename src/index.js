import Promise from 'promise-polyfill';
if (!window.Promise) {
    window.Promise = Promise;
} // Promise explorer 호환
import 'whatwg-fetch'; // fetch explorer 호환

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { App, Home } from './containers';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store = {store}>
        <Router history = {browserHistory}>
            <Route path = '/' component = {App}>
                <IndexRoute component = {Home}/>
            </Route>
        </Router>
    </Provider>
, rootElement);