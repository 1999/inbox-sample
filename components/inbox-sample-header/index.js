'use strict';

import store from '../../store';
import style from './style.scss';
import {toggleNavMenu, uncheckAllTasks} from '../../actions';
import {calcActiveNavGroupItem, calcIsAction} from '../../lib/utils';
import HeaderActionsElement from '../inbox-sample-headeractions';

const CUSTOM_TAG_NAME = 'inbox-sample-header';

class InboxSampleHeader extends HTMLElement {

    createdCallback() {
        this._onStoreChange = this._onStoreChange.bind(this);

        // pre-build HTML
        const template = document.querySelector(`#${CUSTOM_TAG_NAME}`);
        const cloneFragment = document.importNode(template.content, true);

        this.appendChild(cloneFragment);

        this._menuTogglerElem = this.querySelector('.menu-toggler');
        this._mainActionElem = this.querySelector('.mainaction');
        this._titleElem = this.querySelector('.title');

        this._onMenuToggleClick = this._onMenuToggleClick.bind(this);
        this._onBackClick = this._onBackClick.bind(this);
        this._reRender();
    }

    attachedCallback() {
        this._unStoreChange = store.subscribe(this._onStoreChange);

        this._menuTogglerElem.addEventListener('click', this._onMenuToggleClick, false);
        this._mainActionElem.addEventListener('click', this._onBackClick, false);
    }

    detachedCallback() {
        this._unStoreChange();

        this._menuTogglerElem.removeEventListener('click', this._onMenuToggleClick);
        this._mainActionElem.removeEventListener('click', this._onBackClick);
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

        this._updateServicesIcons(isAction);
    }

    _onMenuToggleClick() {
        store.dispatch(toggleNavMenu());
    }

    _onBackClick() {
        const state = store.getState();
        const isAction = calcIsAction(state);

        if (isAction) {
            store.dispatch(uncheckAllTasks());
        }
    }

    _updateServicesIcons(useDark) {
        const from = useDark ? /white/g : /black/g;
        const to = useDark ? 'black' : 'white';

        // probably it's a bit early to use for..of for NodeLists
        [].forEach.call(this.querySelectorAll('.services__service img'), serviceImg => {
            serviceImg.srcset = serviceImg.srcset.replace(from, to);
            console.log(serviceImg.srcset)
        });
    }

}

document.registerElement(CUSTOM_TAG_NAME, InboxSampleHeader);
