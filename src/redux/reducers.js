const initialState = {
    users: JSON.parse(localStorage.getItem('users')) || {},
    tasks: JSON.parse(localStorage.getItem('tasks')) || {},
    currentUser: localStorage.getItem('currentUser') || null
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_USER':
            const newUser = { ...state.users, [action.payload.username]: action.payload.password };
            localStorage.setItem('users', JSON.stringify(newUser));
            return { ...state, users: newUser };

        case 'LOGIN_USER':
            localStorage.setItem('currentUser', action.payload);
            return { ...state, currentUser: action.payload };

        case 'LOGOUT_USER':
            localStorage.removeItem('currentUser');
            return { ...state, currentUser: null };

        case 'ADD_TASK':
            const userTasks = state.tasks[state.currentUser] || [];
            const updatedTasks = [...userTasks, action.payload];
            const tasksForUser = { ...state.tasks, [state.currentUser]: updatedTasks };
            console.log("userTasks:", userTasks, "ggggg", action.payload)
            localStorage.setItem('tasks', JSON.stringify(tasksForUser));
            return { ...state, tasks: tasksForUser };

        case 'DELETE_TASK':
            const tasksAfterDelete = state.tasks[state.currentUser].filter(task => task.id !== action.payload);
            const updatedTasksAfterDelete = { ...state.tasks, [state.currentUser]: tasksAfterDelete };
            localStorage.setItem('tasks', JSON.stringify(updatedTasksAfterDelete));
            return { ...state, tasks: updatedTasksAfterDelete };

        case 'EDIT_TASK':
            const tasksAfterEdit = state.tasks[state.currentUser].map(task => 
                task.id === action.payload.id ? action.payload : task
            );
            const updatedTasksAfterEdit = { ...state.tasks, [state.currentUser]: tasksAfterEdit };
            localStorage.setItem('tasks', JSON.stringify(updatedTasksAfterEdit));
            return { ...state, tasks: updatedTasksAfterEdit };

        case 'REORDER_TASKS':
            const reorderedTasks = { ...state.tasks, [state.currentUser]: action.payload };
            localStorage.setItem('tasks', JSON.stringify(reorderedTasks));
            return { ...state, tasks: reorderedTasks };

        default:
            return state;
    }
};

export default taskReducer;