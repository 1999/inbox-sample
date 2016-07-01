'use strict';

import HeaderElement from 'components/inbox-sample-header';
import NavElement from 'components/inbox-sample-nav';
import TasksElement from 'components/inbox-sample-tasks';
import style from './style.scss';

const CUSTOM_TAG_NAME = 'inbox-sample-root';

class InboxSampleRoot extends HTMLElement {

    createdCallback() {
        const template = document.querySelector(`#${CUSTOM_TAG_NAME}`);
        const clone = document.importNode(template.content, true);

        this.appendChild(clone);
    }

}

document.registerElement(CUSTOM_TAG_NAME, InboxSampleRoot);

export default function (store) {
    const elem = document.createElement(CUSTOM_TAG_NAME);
    elem.store = store;

    return elem;
};
