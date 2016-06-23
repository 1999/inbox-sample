'use strict';

import store from '../../store';
import style from './style.scss';

const CUSTOM_TAG_NAME = 'inbox-sample-taskslist';

class InboxSampleTasksList extends HTMLElement {

    createdCallback() {
        this._onStoreChange = this._onStoreChange.bind(this);
    }

    attachedCallback() {
        this._unStoreChange = store.subscribe(this._onStoreChange);

        const state = store.getState();
        const threads = state.tasks.filter(task => {
            const date = new Date(task.lastDate);

            return (
                date.getDate() === Number(this.day) &&
                date.getMonth() === Number(this.month) &&
                date.getFullYear() === Number(this.year)
            );
        });

        console.log(this.day)
        console.log(this.month)
        console.log(this.year)

        for (const thread of threads) {
            const threadElem = document.createElement('inbox-sample-thread');
            threadElem.id = thread.id;
            threadElem.innerHTML = thread.id;

            this.appendChild(threadElem);
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
