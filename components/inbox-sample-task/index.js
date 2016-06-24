'use strict';

import store from '../../store';
import style from './style.scss';
import {calcActiveNavGroupItem, generateSrcset} from '../../lib/utils';

const CUSTOM_TAG_NAME = 'inbox-sample-task';

class InboxSampleTask extends HTMLElement {

    createdCallback() {
        this._onStoreChange = this._onStoreChange.bind(this);
    }

    attachedCallback() {
        this._unStoreChange = store.subscribe(this._onStoreChange);

        const state = store.getState();
        this._task = state.tasks.find(task => task.id === this.id);

        const template = document.querySelector(`#${CUSTOM_TAG_NAME}`);
        const cloneFragment = document.importNode(template.content, true);

        // set avatar icon
        const avatarElem = cloneFragment.querySelector('.avatar img');
        const lastUser = state.users[this._task.avatar];
        avatarElem.srcset = generateSrcset(lastUser.avatar);

        // fill participants field
        const participantsElem = cloneFragment.querySelector('.participants');
        const participants = this._task.participants.map(userId => state.users[userId].title);
        participantsElem.innerHTML = participants.join(', ');

        if (this._task.messages.length > 1) {
            participantsElem.innerHTML += ` (${this._task.messages.length})`;
        }

        participantsElem.title = participantsElem.innerHTML;

        // fill subject field
        const subjectElem = cloneFragment.querySelector('.text__subject');
        subjectElem.innerHTML = this._task.subject;

        // fill text field
        const textFieldElem = cloneFragment.querySelector('.text__review');
        textFieldElem.innerHTML = this._task.messages[0].message;

        this.appendChild(cloneFragment);
        this._updateVisibility();
    }

    detachedCallback() {
        this._unStoreChange();
    }

    _onStoreChange() {
        this._updateVisibility();
    }

    _updateVisibility() {
        const state = store.getState();
        const {id: activeMenuItemId} = calcActiveNavGroupItem(state);

        this.classList.toggle('hidden', this._task.menuItem !== activeMenuItemId);
    }

}

document.registerElement(CUSTOM_TAG_NAME, InboxSampleTask);
