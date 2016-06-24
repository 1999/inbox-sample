'use strict';

import store from '../../store';
import style from './style.scss';
import {calcActiveNavGroupItem} from '../../lib/utils';
import TasksListElement from '../inbox-sample-taskslist';

const CUSTOM_TAG_NAME = 'inbox-sample-daytasks';

class InboxSampleDayTasks extends HTMLElement {

    createdCallback() {
        this._onStoreChange = this._onStoreChange.bind(this);
    }

    attachedCallback() {
        this._unStoreChange = store.subscribe(this._onStoreChange);
        this._reRender();
    }

    detachedCallback() {
        this._unStoreChange();
    }

    _onStoreChange() {
        this._reRender();
    }

    _reRender() {
        const state = store.getState();
        const {id: activeMenuItemId} = calcActiveNavGroupItem(state);

        // check that there are active tasks with `menuItem` set to activeMenuItemId
        const hasTheseTasks = state.tasks.some(task => {
            const date = new Date(task.lastDate);

            return (
                task.menuItem === activeMenuItemId &&
                date.getDate() === Number(this.day) &&
                date.getMonth() === Number(this.month) &&
                date.getFullYear() === Number(this.year)
            );
        });

        const template = document.querySelector(`#${CUSTOM_TAG_NAME}`);
        const clone = document.importNode(template.content, true);

        const tasksList = clone.querySelector('inbox-sample-taskslist');
        tasksList.day = this.day;
        tasksList.month = this.month;
        tasksList.year = this.year;

        const date = new Date(`${this.year}-${this.month}-${this.day}`);
        const title = clone.querySelector('.title');
        title.innerHTML = date.toLocaleDateString();

        this.classList.toggle('hidden', !hasTheseTasks);
        this.innerHTML = '';
        this.appendChild(clone);
    }

}

document.registerElement(CUSTOM_TAG_NAME, InboxSampleDayTasks);
