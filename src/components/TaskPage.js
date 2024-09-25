import React from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const TaskPage = () => {
    return (
        <div>
            <TaskForm />
            <TaskList />
        </div>
    );
};

export default TaskPage;
