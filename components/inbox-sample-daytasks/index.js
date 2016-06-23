'use strict';

import store from '../../store';
import style from './style.scss';
import TasksListElement from '../inbox-sample-taskslist';

const CUSTOM_TAG_NAME = 'inbox-sample-daytasks';

class InboxSampleDayTasks extends HTMLElement {

    createdCallback() {
        this._onStoreChange = this._onStoreChange.bind(this);
    }

    attachedCallback() {
        this._unStoreChange = store.subscribe(this._onStoreChange);

        const template = document.querySelector(`#${CUSTOM_TAG_NAME}`);
        const clone = document.importNode(template.content, true);

        const tasksList = clone.querySelector('inbox-sample-taskslist');
        tasksList.day = this.day;
        tasksList.month = this.month;
        tasksList.year = this.year;

        this.appendChild(clone);
    }

    detachedCallback() {
        this._unStoreChange();
    }

    _onStoreChange() {
        // this._updateVisibility();
    }

}

document.registerElement(CUSTOM_TAG_NAME, InboxSampleDayTasks);
