'use strict';

import store from '../../store';
import style from './style.scss';

const CUSTOM_TAG_NAME = 'inbox-sample-header';

class InboxSampleHeader extends HTMLElement {

    createdCallback() {
        this._onStoreChange = this._onStoreChange.bind(this);

        // pre-build HTML
        const state = store.getState();
        const template = document.querySelector(`#${CUSTOM_TAG_NAME}`);
        const cloneFragment = document.importNode(template.content, true);

        this.appendChild(cloneFragment);
    }

    attachedCallback() {
        this._unStoreChange = store.subscribe(this._onStoreChange);
    }

    detachedCallback() {
        this._unStoreChange();
    }

    _onStoreChange() {
        const state = store.getState();
    }

}

document.registerElement(CUSTOM_TAG_NAME, InboxSampleHeader);
