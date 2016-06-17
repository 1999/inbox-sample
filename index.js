'use strict';

import {createStore} from 'redux';
import app from './reducers';

import InboxSampleTask from './components/inbox-sample-task';

const store = createStore(app);

const elem = InboxSampleTask(store);
document.body.appendChild(elem);

store.dispatch({type: 'foo'})
