'use strict';

import store from 'store';
import style from './style.scss';
import {calcActiveNavGroupItem, generateSrcset} from 'lib/utils';
import {toggleOpenTask, toggleSelectTask} from 'actions';
import MessagesElem from 'components/inbox-sample-messages';

const CUSTOM_TAG_NAME = 'inbox-sample-task';

class InboxSampleTask extends HTMLElement {

    createdCallback() {
        this._onStoreChange = this._onStoreChange.bind(this);
    }

    attachedCallback() {
        this._unStoreChange = store.subscribe(this._onStoreChange);
        this._onTaskCheck = this._onTaskCheck.bind(this);
        this._onTaskOpen = this._onTaskOpen.bind(this);

        const state = store.getState();
        this._task = state.tasks.find(task => task.id === this.id);

        const template = document.querySelector(`#${CUSTOM_TAG_NAME}`);
        const cloneFragment = document.importNode(template.content, true);

        // set avatar icon
        const avatarElem = cloneFragment.querySelector('.avatar img');
        const lastUser = state.users[this._task.avatar];
        avatarElem.srcset = generateSrcset(lastUser.avatar);

        // bind to task check actions
        this._taskCheckElem = cloneFragment.querySelector('.avatar__check');
        this._taskCheckElem.addEventListener('click', this._onTaskCheck, false);
        this._taskUncheckElem = cloneFragment.querySelector('.avatar__uncheck');
        this._taskUncheckElem.addEventListener('click', this._onTaskCheck, false);

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
        this._updateCheckedStatus();
        this._toggleRefMessagesList();

        this.addEventListener('click', this._onTaskOpen, false);
    }

    detachedCallback() {
        this._unStoreChange();

        // unbind from task check actions
        this._taskCheckElem.removeEventListener('click', this._onTaskCheck);
        this._taskUncheckElem.addEventListener('click', this._onTaskCheck);

        this.removeEventListener('click', this._onTaskOpen);
    }

    _onStoreChange() {
        this._updateVisibility();
        this._updateCheckedStatus();
        this._toggleRefMessagesList();
    }

    _updateVisibility() {
        const state = store.getState();
        const {id: activeMenuItemId} = calcActiveNavGroupItem(state);

        this.classList.toggle('hidden', this._task.menuItem !== activeMenuItemId);
    }

    _updateCheckedStatus() {
        const state = store.getState();

        for (let {id, checked} of state.tasks) {
            if (this._task.id !== id) {
                continue;
            }

            this.classList.toggle('checked', checked);
        }
    }

    _toggleRefMessagesList() {
        const state = store.getState();

        for (let {id, open, messages} of state.tasks) {
            if (this._task.id !== id) {
                continue;
            }

            const messagesListElem = this.querySelector('inbox-sample-messages');

            if (open) {
                if (!messagesListElem) {
                    const newMessagesListElem = document.createElement('inbox-sample-messages');
                    const openMessage = messages.find(message => message.expanded);

                    newMessagesListElem.task = id;
                    newMessagesListElem.message = openMessage
                        ? openMessage.id
                        : messages[messages.length - 1].id;

                    newMessagesListElem.classList.add('prerender')

                    this.appendChild(newMessagesListElem);
                }
            } else {
                if (messagesListElem) {
                    messagesListElem.remove();
                }
            }

            this.classList.toggle('open', open);
        }
    }

    _onTaskCheck(evt) {
        store.dispatch(toggleSelectTask(this._task.id));
        evt.stopPropagation();
    }

    _onTaskOpen() {
        store.dispatch(toggleOpenTask(this._task.id));
    }

}

document.registerElement(CUSTOM_TAG_NAME, InboxSampleTask);
