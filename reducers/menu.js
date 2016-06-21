'use strict';

export default function (state = [], action) {
    switch (action.type) {
        case 'SELECT_NAV_TAG':
            const {groupId, itemId} = action.payload;
            const groups = state.groups.map(group => {
                group.items = group.items.map(item => {
                    item.active = (group.id === groupId && item.id === itemId);
                    return item;
                });

                return group;
            });

            return Object.assign({}, state, {groups});

        case 'TOGGLE_NAV_MENU':
            return {
                ...state,
                show: !state.show
            };

        default:
            return state;
    }
};
