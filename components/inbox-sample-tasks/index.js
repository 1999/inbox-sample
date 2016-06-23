'use strict';

import store from '../../store';
import style from './style.scss';
import DayTasksElement from '../inbox-sample-daytasks';

const CUSTOM_TAG_NAME = 'inbox-sample-tasks';

class InboxSampleTasks extends HTMLElement {

    createdCallback() {
        this._onStoreChange = this._onStoreChange.bind(this);

        const state = store.getState();
        const periods = new Set([
            {from: 'today start', to: 'today end'},
            {from: 'yesterda start', to: 'yesterda end'},
            {from: 'current month start', to: 'yesterdat start'},
            {from: '1970', to: 'current month start'}
        ]);

        const threadDays = state.tasks.reduce((memo, task) => {
            const date = new Date(task.lastDate);
            const dateStr = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;

            memo.add(dateStr);
            return memo;
        }, new Set);

        for (const dateStr of threadDays) {
            const threadDayElem = document.createElement('inbox-sample-daytasks');
            const [year, month, day] = dateStr.split('.');

            threadDayElem.year = year;
            threadDayElem.month = month;
            threadDayElem.day = day;

            this.appendChild(threadDayElem);
        }
    }

    attachedCallback() {
        this._unStoreChange = store.subscribe(this._onStoreChange);
    }

    detachedCallback() {
        this._unStoreChange();
    }

    _onStoreChange() {
        // this._updateVisibility();
    }

}

document.registerElement(CUSTOM_TAG_NAME, InboxSampleTasks);
