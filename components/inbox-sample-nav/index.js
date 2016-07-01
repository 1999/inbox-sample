'use strict';

import store from 'store';
import NavGroupElement from 'components/inbox-sample-navgroup';
import style from './style.scss';

const CUSTOM_TAG_NAME = 'inbox-sample-nav';

class InboxSampleNav extends HTMLElement {

    createdCallback() {
        this._onStoreChange = this._onStoreChange.bind(this);

        // pre-build HTML
        const state = store.getState();
        const templateNavGroup = document.querySelector(`#${CUSTOM_TAG_NAME}`);

        this._updateVisibility();

        state.menu.groups.forEach((group, index) => {
            const cloneFragment = document.importNode(templateNavGroup.content, true);
            const navGroup = cloneFragment.querySelector('inbox-sample-navgroup');

            navGroup.id = group.id;
            navGroup.last = (index + 1 === state.menu.groups.length);

            this.appendChild(cloneFragment);
        });
    }

    attachedCallback() {
        this._unStoreChange = store.subscribe(this._onStoreChange);
    }

    detachedCallback() {
        this._unStoreChange();
    }

    _onStoreChange() {
        this._updateVisibility();
    }

    _updateVisibility() {
        const state = store.getState();
        this.classList.toggle('hidden', !state.menu.show);
    }

}

document.registerElement(CUSTOM_TAG_NAME, InboxSampleNav);
