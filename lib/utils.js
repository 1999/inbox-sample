'use strict';

export function generateSrcset(objSrcset) {
    return Object.keys(objSrcset).reduce((memo, key) => {
        memo.push(`${objSrcset[key]} ${key}`);
        return memo;
    }, []).join(',');
};
