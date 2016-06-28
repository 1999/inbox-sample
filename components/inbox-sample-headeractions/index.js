'use strict';

import store from '../../store';
import style from './style.scss';
import {calcActiveNavGroupItem, calcIsAction} from '../../lib/utils';

const CUSTOM_TAG_NAME = 'inbox-sample-headeractions';

class InboxSampleHeaderActions extends HTMLElement {

    createdCallback() {
        this._onStoreChange = this._onStoreChange.bind(this);
    }

    attachedCallback() {
        this._unStoreChange = store.subscribe(this._onStoreChange);

        const template = document.querySelector(`#${CUSTOM_TAG_NAME}`);
        const cloneFragment = document.importNode(template.content, true);
        this.appendChild(cloneFragment);

        this._counterElem = this.querySelector('.counter');

        this._reRender();
    }

    detachedCallback() {
        this._unStoreChange();
    }

    _onStoreChange() {
        this._reRender();
    }

    _reRender() {
        const state = store.getState();
        const {id: activeNavItemId} = calcActiveNavGroupItem(state);
        const isAction = calcIsAction(state);

        if (isAction) {
            const tasksChecked = state.tasks.reduce((memo, task) => {
                if (task.checked && task.menuItem === activeNavItemId) {
                    memo++;
                }

                return memo;
            }, 0);

            this._counterElem.innerHTML = `${tasksChecked} selected`;
            this.classList.toggle('hide', tasksChecked === 0);
        } else {
            this.classList.add('hide');
        }
    }

}

document.registerElement(CUSTOM_TAG_NAME, InboxSampleHeaderActions);
