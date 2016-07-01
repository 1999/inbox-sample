'use strict';

import store from 'store';
import style from './style.scss';
import DayTasksElement from 'components/inbox-sample-daytasks';

const CUSTOM_TAG_NAME = 'inbox-sample-tasks';

class InboxSampleTasks extends HTMLElement {

    createdCallback() {
        this._onStoreChange = this._onStoreChange.bind(this);
        this._onTransitionEnd = this._onTransitionEnd.bind(this);

        const state = store.getState();
        const threadDays = state.tasks.reduce((memo, task) => {
            const date = new Date(task.lastDate);
            const dateStr = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;

            memo.add(dateStr);
            return memo;
        }, new Set);

        for (let dateStr of threadDays) {
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

        const state = store.getState();
        this._showMenuSetting = state.menu.show;
        this._navElem = document.querySelector('inbox-sample-nav');
    }

    detachedCallback() {
        this._unStoreChange();
    }

    _onStoreChange() {
        const state = store.getState();
        const newMenuSetting = state.menu.show;

        if (newMenuSetting !== this._showMenuSetting) {
            this._showMenuSetting = newMenuSetting;

            if (this._showMenuSetting) {
                this._changeWidth();
            } else {
                this._navElem.addEventListener('transitionend', this._onTransitionEnd, false);
            }
        }
    }

    _onTransitionEnd({propertyName}) {
        if (propertyName === 'transform') {
            this._changeWidth();
            this._navElem.removeEventListener('transitionend', this._onTransitionEnd);
        }
    }

    _changeWidth() {
        this.classList.toggle('wide', !this._showMenuSetting);

    }

}

document.registerElement(CUSTOM_TAG_NAME, InboxSampleTasks);
