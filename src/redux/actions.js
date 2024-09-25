// Action to register a new user
export const registerUser = (username, password) => ({
    type: 'REGISTER_USER',
    payload: { username, password }
});

// Action to log in a user
export const loginUser = (username) => ({
    type: 'LOGIN_USER',
    payload: username
});

// Action to log out a user
export const logoutUser = () => ({
    type: 'LOGOUT_USER'
});

// Action to add a new task
export const addTask = (task) => ({
    type: 'ADD_TASK',
    payload: task
});

// Action to delete a task by its id
export const deleteTask = (taskId) => ({
    type: 'DELETE_TASK',
    payload: taskId
});

// Action to edit an existing task
export const editTask = (task) => ({
    type: 'EDIT_TASK',
    payload: task
});

// Action to reorder tasks (drag and drop functionality)
export const reorderTasks = (reorderedTasks) => ({
    type: 'REORDER_TASKS',
    payload: reorderedTasks
});
