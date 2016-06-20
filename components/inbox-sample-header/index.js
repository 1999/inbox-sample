'use strict';

const CUSTOM_TAG_NAME = 'inbox-sample-header';
const CUSTOM_TAG_TEMPLATE = `
    <template id="inbox-sample-root">
        <header>header</header>
        <nav>nav</nav>
        <div>content</div>
    </template>`

class InboxSampleHeader extends HTMLElement {

    createdCallback() {
        // document.body.insertAdjacentHTML(CUSTOM_TAG_TEMPLATE, 'beforeend');
    }

    detachedCallback() {
        // const template = document.querySelector(`#${CUSTOM_TAG_NAME}`);
        // const clone = document.importNode(template.content, true);

        // document.body.appendChild(clone);
    }

}

document.registerElement(CUSTOM_TAG_NAME, InboxSampleHeader);

export default function (store) {
    const elem = document.createElement(CUSTOM_TAG_NAME);
    elem.store = store;

    return elem;
};
