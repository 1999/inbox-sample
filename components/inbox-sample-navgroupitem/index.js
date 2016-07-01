'use strict';

import store from 'store';
import style from './style.scss';
import {selectNavTag} from 'actions';
import {generateSrcset} from 'lib/utils';

const CUSTOM_TAG_NAME = 'inbox-sample-navgroupitem';

const findCurrentNavItem = (groupId, itemId) => {
    const state = store.getState();
    const groupIndex = state.menu.groups.findIndex(group => (group.id === groupId));
    const item = state.menu.groups[groupIndex].items.find(item => (item.id === itemId));

    return item;
}

class InboxSampleNavGroupItem extends HTMLElement {

    createdCallback() {
        this._onStoreChange = this._onStoreChange.bind(this);
        this._onClick = this._onClick.bind(this);
    }

    attachedCallback() {
        this._unStoreChange = store.subscribe(this._onStoreChange);

        // populate HTML
        const item = findCurrentNavItem(this.group, this.item);
        const template = document.querySelector(`#${CUSTOM_TAG_NAME}`);
        const cloneFragment = document.importNode(template.content, true);

        const icon = cloneFragment.querySelector('.icon');
        icon.srcset = generateSrcset(item.icon);
        icon.width = icon.height = 24;
        icon.src = item.icon['1x'];
        icon.alt = item.title;

        const text = cloneFragment.querySelector('.text');
        text.innerHTML = item.title;

        this.appendChild(cloneFragment);

        if (item.active) {
            this.classList.add('active');
        }

        this.addEventListener('click', this._onClick, false);
    }

    detachedCallback() {
        this._unStoreChange();
        this.removeEventListener('click', this._onClick);
    }

    // update UI (set text to bold) on state change
    _onStoreChange() {
        const item = findCurrentNavItem(this.group, this.item);
        this.classList.toggle('active', item.active);
    }

    _onClick() {
        store.dispatch(
            selectNavTag(this.group, this.item)
        );
    }

}

document.registerElement(CUSTOM_TAG_NAME, InboxSampleNavGroupItem);
