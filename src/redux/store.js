import { createStore } from 'redux';
import taskReducer from './reducers'; // Import the reducer

const store = createStore(
    taskReducer, // Pass the reducer to the store
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Add Redux dev tools support (optional)
);

export default store;
