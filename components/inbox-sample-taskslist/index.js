'use strict';

import store from '../../store';
import style from './style.scss';
import TaskElement from '../inbox-sample-task';

const CUSTOM_TAG_NAME = 'inbox-sample-taskslist';

class InboxSampleTasksList extends HTMLElement {

    createdCallback() {
        this._onStoreChange = this._onStoreChange.bind(this);
    }

    attachedCallback() {
        this._unStoreChange = store.subscribe(this._onStoreChange);

        const state = store.getState();
        const tasks = state.tasks.filter(task => {
            const date = new Date(task.lastDate);

            return (
                date.getDate() === Number(this.day) &&
                date.getMonth() === Number(this.month) &&
                date.getFullYear() === Number(this.year)
            );
        });

        for (const task of tasks) {
            const taskElem = document.createElement('inbox-sample-task');
            taskElem.id = task.id;

            this.appendChild(taskElem);
        }
    }

    detachedCallback() {
        this._unStoreChange();
    }

    _onStoreChange() {
        // this._updateVisibility();
    }

}

document.registerElement(CUSTOM_TAG_NAME, InboxSampleTasksList);
