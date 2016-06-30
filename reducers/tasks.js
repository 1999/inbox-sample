'use strict';

export default function (state = [], action) {
    switch (action.type) {
        case 'TOGGLE_SELECT_TASK':
            return state.map(task => {
                return task.id === action.payload.id
                    ? {...task, checked: !task.checked}
                    : task;
            });

        case 'UNCHECK_TASKS_ALL':
            return state.map(task => ({...task, checked: false}));

        case 'TOGGLE_OPEN_CLOSE_TASK':
            return state.map(task => {
                return (task.id === action.payload.id)
                    ? {...task, open: !task.open}
                    : {...task, open: false};
            });

        default:
            return state;
    }
};
