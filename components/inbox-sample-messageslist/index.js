'use strict';

import store from 'store';
import style from './style.scss';
import messageElem from 'components/inbox-sample-message';

const CUSTOM_TAG_NAME = 'inbox-sample-messageslist';
const SCROLL_MARGIN_BEFORE_LAST_MESSAGE = 40;

class InboxSampleMessagesList extends HTMLElement {

    attachedCallback() {
        const state = store.getState();
        const task = state.tasks.find(task => task.id === this.task);
        let lastMessageElem;

        task.messages.forEach(({id}) => {
            const messageElem = document.createElement('inbox-sample-message');
            messageElem.task = this.task;
            messageElem.message = id;
            messageElem.open = (this.message === id);

            this.appendChild(messageElem);
            lastMessageElem = messageElem;
        });

        // scroll to the last message
        window.scrollTo(0, lastMessageElem.offsetTop - SCROLL_MARGIN_BEFORE_LAST_MESSAGE);
    }

}

document.registerElement(CUSTOM_TAG_NAME, InboxSampleMessagesList);
