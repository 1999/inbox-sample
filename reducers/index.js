'use strict';

import {combineReducers} from 'redux';
import tasks from './tasks';
import menu from './menu';
import activeMode from './mode';

export default combineReducers({
    tasks,
    menu,
    activeMode
});
