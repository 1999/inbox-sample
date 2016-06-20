'use strict';

export function selectNavTag(groupId, itemId) {
    return {
        type: 'SELECT_NAV_TAG',
        payload: {groupId, itemId}
    };
}
