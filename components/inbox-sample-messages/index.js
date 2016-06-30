'use strict';

import store from '../../store';
import style from './style.scss';
import messagesListElem from '../inbox-sample-messageslist';

const CUSTOM_TAG_NAME = 'inbox-sample-messages';

class InboxSampleMessages extends HTMLElement {

    createdCallback() {
        this._onStoreChange = this._onStoreChange.bind(this);
    }

    attachedCallback() {
        this._unStoreChange = store.subscribe(this._onStoreChange);

        const state = store.getState();
        const template = document.querySelector(`#${CUSTOM_TAG_NAME}`);
        const cloneFragment = document.importNode(template.content, true);

        const headerElem = cloneFragment.querySelector('.header');
        const {subject} = state.tasks.find(task => task.id === this.task);
        headerElem.innerHTML = subject;

        const messagesList = cloneFragment.querySelector('inbox-sample-messageslist');
        messagesList.task = this.task;
        messagesList.message = this.message;

        this.appendChild(cloneFragment);
    }

    detachedCallback() {
        this._unStoreChange();
    }

    _onStoreChange() {
        //
    }

}

document.registerElement(CUSTOM_TAG_NAME, InboxSampleMessages);
