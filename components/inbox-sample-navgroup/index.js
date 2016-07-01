'use strict';

import store from '../../store';
import NavGroupItem from '../inbox-sample-navgroupitem';
import style from './style.scss';

const CUSTOM_TAG_NAME = 'inbox-sample-navgroup';

class InboxSampleNavGroup extends HTMLElement {

    attachedCallback() {
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

}

document.registerElement(CUSTOM_TAG_NAME, InboxSampleNavGroup);
