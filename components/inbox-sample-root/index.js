'use strict';

import HeaderElement from 'components/inbox-sample-header';
import NavElement from 'components/inbox-sample-nav';
import TasksElement from 'components/inbox-sample-tasks';
import style from './style.scss';

const CUSTOM_TAG_NAME = 'inbox-sample-root';
const ESC_KEYCODE = 27;

class InboxSampleRoot extends HTMLElement {

    createdCallback() {
        const template = document.querySelector(`#${CUSTOM_TAG_NAME}`);
        const clone = document.importNode(template.content, true);
        this.appendChild(clone);

        // listen to ESC press to clear app state
        document.addEventListener('keyup', evt => {
            if (evt.keyCode === ESC_KEYCODE && confirm('Reset app state?')) {
                sessionStorage.clear();
                window.location.reload();
            }
        }, false);
    }

}

document.registerElement(CUSTOM_TAG_NAME, InboxSampleRoot);

export default function (store) {
    const elem = document.createElement(CUSTOM_TAG_NAME);
    elem.store = store;

    return elem;
};
