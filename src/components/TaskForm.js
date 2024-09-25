import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions';
import { Button, TextField, Box, Grid, MenuItem } from '@mui/material';

const TaskForm = () => {
    const [task, setTask] = useState({ name: '', description: '', priority: 'low' });
    const dispatch = useDispatch();

    const handleAddTask = (e) => {
        e.preventDefault();
        dispatch(addTask({ ...task, id: Date.now(), completed: false }));
        setTask({ name: '', description: '', priority: 'low' });
    };

    return (
        <Box
            component="form"
            onSubmit={handleAddTask}
            sx={{ mt: 2, mx: 'auto', maxWidth: 600, p: 2 }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Task Name"
                        value={task.name}
                        onChange={(e) => setTask({ ...task, name: e.target.value })}
                        required
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Task Description"
                        value={task.description}
                        onChange={(e) => setTask({ ...task, description: e.target.value })}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        select
                        fullWidth
                        label="Priority"
                        value={task.priority}
                        onChange={(e) => setTask({ ...task, priority: e.target.value })}
                        variant="outlined"
                    >
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" fullWidth>
                        Add Task
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TaskForm;
