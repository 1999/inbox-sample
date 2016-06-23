'use strict';

import store from '../../store';
import style from './style.scss';
import {generateSrcset} from '../../lib/utils';

const CUSTOM_TAG_NAME = 'inbox-sample-task';

class InboxSampleTask extends HTMLElement {

    createdCallback() {
        this._onStoreChange = this._onStoreChange.bind(this);
    }

    attachedCallback() {
        this._unStoreChange = store.subscribe(this._onStoreChange);

        const state = store.getState();
        const task = state.tasks.find(task => task.id === this.id);

        const template = document.querySelector(`#${CUSTOM_TAG_NAME}`);
        const cloneFragment = document.importNode(template.content, true);

        // set avatar icon
        const avatarElem = cloneFragment.querySelector('.avatar img');
        const lastUser = state.users[task.avatar];
        avatarElem.srcset = generateSrcset(lastUser.avatar);

        // fill participants field
        const participantsElem = cloneFragment.querySelector('.participants');
        const participants = task.participants.map(userId => state.users[userId].title);
        participantsElem.innerHTML = participants.join(', ');

        if (task.messages.length > 1) {
            participantsElem.innerHTML += ` (${task.messages.length})`;
        }

        // fill subject field
        const subjectElem = cloneFragment.querySelector('.subject');
        subjectElem.innerHTML = task.subject;

        // fill text field
        const textFieldElem = cloneFragment.querySelector('.text-review');
        textFieldElem.innerHTML = task.messages[0].message;

        this.appendChild(cloneFragment);
    }

    detachedCallback() {
        this._unStoreChange();
    }

    _onStoreChange() {
        // this._updateVisibility();
    }

}

document.registerElement(CUSTOM_TAG_NAME, InboxSampleTask);
