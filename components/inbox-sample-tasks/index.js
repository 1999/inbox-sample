'use strict';

const CUSTOM_TAG_NAME = 'inbox-sample-tasks';
const CUSTOM_TAG_TEMPLATE = `
    <template id="inbox-sample-root">
        <header>header</header>
        <nav>nav</nav>
        <div>content</div>
    </template>`

class InboxSampleTasks extends HTMLElement {

    createdCallback() {
        // document.body.insertAdjacentHTML(CUSTOM_TAG_TEMPLATE, 'beforeend');
    }

    detachedCallback() {
        this._unStoreChange();
    }

}

document.registerElement(CUSTOM_TAG_NAME, InboxSampleTasks);

export default function (store) {
    const elem = document.createElement(CUSTOM_TAG_NAME);
    elem.store = store;

    return elem;
};
