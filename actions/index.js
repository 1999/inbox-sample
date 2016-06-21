'use strict';

export function selectNavTag(groupId, itemId) {
    return {
        type: 'SELECT_NAV_TAG',
        payload: {groupId, itemId}
    };
}

export function toggleNavMenu() {
    return {
        type: 'TOGGLE_NAV_MENU'
    };
}
