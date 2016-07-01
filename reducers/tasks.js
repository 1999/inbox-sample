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

        case 'SELECT_NAV_TAG':
            return state.map(task => ({...task, open: false}));

        case 'TOGGLE_OPEN_MESSAGE':
            return state.map(task => {
                if (task.id !== action.payload.taskId) {
                    return task;
                }

                const messages = task.messages.map(message => {
                    return (message.id === action.payload.messageId)
                        ? {...message, open: !message.expanded, active: message.expanded}
                        : {...message, open: false, active: message.expanded};
                });

                return {...task, messages};
            });

        default:
            return state;
    }
};
