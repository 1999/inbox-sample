'use strict';

import store from '../../store';
import style from './style.scss';
import {generateSrcset} from '../../lib/utils';

const CUSTOM_TAG_NAME = 'inbox-sample-message';

class InboxSampleMessage extends HTMLElement {

    createdCallback() {
        this._onStoreChange = this._onStoreChange.bind(this);
    }

    attachedCallback() {
        this._unStoreChange = store.subscribe(this._onStoreChange);

        // pre-build HTML
        const template = document.querySelector(`#${CUSTOM_TAG_NAME}`);
        const cloneFragment = document.importNode(template.content, true);

        const state = store.getState();
        const task = state.tasks.find(task => task.id === this.task);
        const message = task.messages.find(message => message.id === this.message);
        const sender = state.users[message.sender];

        // set avatar image
        const avatarElem = cloneFragment.querySelector(`.${CUSTOM_TAG_NAME}__avatar-img`);
        avatarElem.srcset = generateSrcset(sender.avatar);

        // set sender text
        const senderElem = cloneFragment.querySelector(`.${CUSTOM_TAG_NAME}__sender`);
        senderElem.innerHTML = sender.title;

        // set recipients text
        const recipientsElem = cloneFragment.querySelector(`.${CUSTOM_TAG_NAME}__to`);
        recipientsElem.innerHTML = message.recipients.map(userId => state.users[userId].title).join(', ');

        const dateElem = cloneFragment.querySelector(`.${CUSTOM_TAG_NAME}__date`);
        const dateObj = new Date(message.date);
        dateElem.innerHTML = dateObj.toLocaleDateString();

        const textElem = cloneFragment.querySelector(`.${CUSTOM_TAG_NAME}__text`);
        textElem.innerHTML = message.message;

        this.appendChild(cloneFragment);
        this.classList.toggle('open', this.open);
    }

    detachedCallback() {
        this._unStoreChange();
    }

    _onStoreChange() {
        //
    }

}

document.registerElement(CUSTOM_TAG_NAME, InboxSampleMessage);
