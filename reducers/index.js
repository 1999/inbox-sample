'use strict';

import {combineReducers} from 'redux';
import tasks from './tasks';
import menu from './menu';
import activeMode from './mode';
import users from './users';

export default combineReducers({
    tasks,
    menu,
    activeMode,
    users
});
