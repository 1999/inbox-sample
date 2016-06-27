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

export function toggleSelectTask(id) {
    return {
        type: 'TOGGLE_SELECT_TASK',
        payload: {id}
    };
}

export function uncheckAllTasks() {
    return {
        type: 'UNCHECK_TASKS_ALL'
    };
}
