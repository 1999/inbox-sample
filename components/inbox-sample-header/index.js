'use strict';

import store from '../../store';
import style from './style.scss';
import {toggleNavMenu} from '../../actions';
import {calcActiveNavGroupItem} from '../../lib/utils';

const CUSTOM_TAG_NAME = 'inbox-sample-header';

const calcIsAction = state => {
    return state.tasks.some(task => task.checked);
};

class InboxSampleHeader extends HTMLElement {

    createdCallback() {
        this._onStoreChange = this._onStoreChange.bind(this);

        // pre-build HTML
        const template = document.querySelector(`#${CUSTOM_TAG_NAME}`);
        const cloneFragment = document.importNode(template.content, true);

        this.appendChild(cloneFragment);

        this._menuToggler = this.querySelector('.menu-toggler');
        this._titleElem = this.querySelector('.title');

        this._onMenuToggleClick = this._onMenuToggleClick.bind(this);
        this._reRender();
    }

    attachedCallback() {
        this._unStoreChange = store.subscribe(this._onStoreChange);

        this._menuToggler.addEventListener('click', this._onMenuToggleClick, false);
    }

    detachedCallback() {
        this._unStoreChange();

        this._menuToggler.removeEventListener('click', this._onMenuToggleClick);
    }

    _onStoreChange() {
        this._reRender();
    }

    _reRender() {
        const state = store.getState();
        const isAction = calcIsAction(state);

        this.classList.toggle('action', isAction);

        if (isAction) {
            this._titleElem.innerHTML = 'Back';
            this.style.background = 'none';
        } else {
            const activeNavGroupItem = calcActiveNavGroupItem(state);

            this.style.background = `#${activeNavGroupItem.color}`;
            this._titleElem.innerHTML = activeNavGroupItem.title;
        }
    }

    _onMenuToggleClick() {
        store.dispatch(toggleNavMenu());
    }

}

document.registerElement(CUSTOM_TAG_NAME, InboxSampleHeader);
