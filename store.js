'use strict';

import {applyMiddleware, createStore} from 'redux';
import createLogger from 'redux-logger';
import initialState from './config';
import app from './reducers';

const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger();
    middlewares.push(logger);
}

export default createStore(app, initialState, applyMiddleware(...middlewares));
