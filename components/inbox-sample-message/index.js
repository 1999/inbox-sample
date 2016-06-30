'use strict';

import store from '../../store';
import style from './style.scss';

const CUSTOM_TAG_NAME = 'inbox-sample-message';

class InboxSampleMessage extends HTMLElement {

    createdCallback() {
        this._onStoreChange = this._onStoreChange.bind(this);
    }

    attachedCallback() {
        this._unStoreChange = store.subscribe(this._onStoreChange);

        const state = store.getState();
        const task = state.tasks.find(task => task.id === this.task);
        const message = task.messages.find(message => message.id === this.message);

        this.innerHTML = this.open
            ? 'OPEN: ' + message.message
            : message.message;

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
