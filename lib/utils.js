'use strict';

export function generateSrcset(objSrcset) {
    return Object.keys(objSrcset).reduce((memo, key) => {
        memo.push(`${objSrcset[key]} ${key}`);
        return memo;
    }, []).join(',');
};

export function calcActiveNavGroupItem(state) {
    let output;

    stuff:
    for (let group of state.menu.groups) {
        for (let item of group.items) {
            if (item.active) {
                output = item;
                break stuff;
            }
        }
    }

    return output;
};

export function calcIsAction(state) {
    return state.tasks.some(task => task.checked);
};
