'use strict';

import {applyMiddleware, createStore} from 'redux';
import createLogger from 'redux-logger';
import saveStateMiddleware from 'lib/save-state';
import initialConfig from './config';
import app from './reducers';

let initialState;
try {
    const json = sessionStorage.getItem('state');
    initialState = JSON.parse(json);
} catch (ex) {
    initialState = initialConfig;
}

const middlewares = [saveStateMiddleware];
if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger();
    middlewares.push(logger);
}

export default createStore(app, initialState, applyMiddleware(...middlewares));
