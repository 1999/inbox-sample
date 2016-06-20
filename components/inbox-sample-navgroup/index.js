'use strict';

import store from '../../store';
import NavGroupItem from '../inbox-sample-navgroupitem';
import style from './style.scss';

const CUSTOM_TAG_NAME = 'inbox-sample-navgroup';

class InboxSampleNavGroup extends HTMLElement {

    createdCallback() {
        this._onStoreChange = this._onStoreChange.bind(this);

        // pre-build HTML


        // console.log(this.id)
        // console.log(this.last)
        // const templateNavGroup = document.querySelector(`#${CUSTOM_TAG_NAME}`);

        // for (const group of state.menu.groups) {
        //     const cloneFragment = document.importNode(templateNavGroup.content, true);
        //     const navGroup = cloneFragment.querySelector('inbox-sample-navgroup');

        //     navGroup.id = group.id;
        //     this.appendChild(cloneFragment);
        // }
    }

    attachedCallback() {
        this._unStoreChange = store.subscribe(this._onStoreChange);

        // populate HTML
        const state = store.getState();
        const group = state.menu.groups.find(group => (group.id === this.id));

        for (const item of group.items) {
            const navItemElem = document.createElement('inbox-sample-navgroupitem');
            navItemElem.group = this.id;
            navItemElem.item = item.id;

            this.appendChild(navItemElem);
        }

        if (this.last) {
            this.classList.add('last');
        }
    }

    detachedCallback() {
        this._unStoreChange();
    }

    _onStoreChange() {
        const state = store.getState();
    }

}

document.registerElement(CUSTOM_TAG_NAME, InboxSampleNavGroup);
