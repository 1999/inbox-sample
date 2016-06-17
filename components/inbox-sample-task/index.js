'use strict';

const CUSTOM_TAG_NAME = 'inbox-sample-header';

class InboxSampleTask extends HTMLElement {

    createdCallback() {
        this._onStoreChange = this._onStoreChange.bind(this);
    }

    attachedCallback() {
        this._unStoreChange = this.store.subscribe(this._onStoreChange);
    }

    detachedCallback() {
        this._unStoreChange();
    }

    _onStoreChange() {
        const state = this.store.getState();
    }

}

document.registerElement(CUSTOM_TAG_NAME, InboxSampleTask);

export default function (store) {
    const elem = document.createElement(CUSTOM_TAG_NAME);
    elem.store = store;

    return elem;
};
