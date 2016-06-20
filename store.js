'use strict';

import {createStore} from 'redux';
import initialState from './config';
import app from './reducers';

export default createStore(app, initialState);
