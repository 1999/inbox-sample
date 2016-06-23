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
    for (const group of state.menu.groups) {
        for (const item of group.items) {
            if (item.active) {
                output = item;
                break stuff;
            }
        }
    }

    return output;
};
