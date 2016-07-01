'use strict';

function saveState(store) {
    return next => action => {
        const result = next(action);
        const state = store.getState();

        sessionStorage.setItem('state', JSON.stringify(state));
        return result;
    };
};

export default saveState;
