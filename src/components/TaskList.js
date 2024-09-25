import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, editTask, reorderTasks } from '../redux/actions.js';
import { Checkbox, IconButton, List, ListItem, ListItemText, Box, Typography, Card, CardContent, Button, TextField } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const TaskList = () => {
    const tasks = useSelector(state => state.tasks[state.currentUser] || []);
    const dispatch = useDispatch();

    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskData, setEditTaskData] = useState({ name: '', description: '', priority: '' });
    const [selectedTasks, setSelectedTasks] = useState([]);

    const handleDelete = (id) => {
        dispatch(deleteTask(id));
    };

    const handleCompleteToggle = (task) => {
        dispatch(editTask({ ...task, completed: !task.completed }));
    };

    const handleEditTask = (task) => {
        setEditTaskId(task.id);
        setEditTaskData({ name: task.name, description: task.description, priority: task.priority });
    };

    const handleSaveTask = () => {
        dispatch(editTask({ ...editTaskData, id: editTaskId }));
        setEditTaskId(null);
    };

    const handleTaskSelection = (taskId) => {
        if (selectedTasks.includes(taskId)) {
            setSelectedTasks(selectedTasks.filter(id => id !== taskId));
        } else {
            setSelectedTasks([...selectedTasks, taskId]);
        }
    };

    const handleDeleteSelectedTasks = () => {
        selectedTasks.forEach(id => dispatch(deleteTask(id)));
        setSelectedTasks([]); // Clear the selected tasks after deletion
    };

    const onDragEnd = (result) => {
        const { destination, source } = result;
        if (!destination) return;

        const reorderedTasks = Array.from(tasks);
        const [movedTask] = reorderedTasks.splice(source.index, 1);
        reorderedTasks.splice(destination.index, 0, movedTask);
        dispatch(reorderTasks(reorderedTasks));
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Task List
            </Typography>

            {selectedTasks.length > 0 && (
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteSelectedTasks}
                    sx={{ mb: 2 }}
                >
                    Delete Selected ({selectedTasks.length})
                </Button>
            )}

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="taskList">
                    {(provided) => (
                        <List {...provided.droppableProps} ref={provided.innerRef}>
                            {tasks.map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                    {(provided) => (
                                        <ListItem
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            sx={{ mb: 2 }}
                                        >
                                            <Card sx={{ width: '100%' }}>
                                                <CardContent
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        backgroundColor: task.completed ? '#d3f9d8' : '#fff',
                                                    }}
                                                >
                                                    <Checkbox
                                                        checked={selectedTasks.includes(task.id)}
                                                        onChange={() => handleTaskSelection(task.id)}
                                                    />

                                                    {editTaskId === task.id ? (
                                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                            <TextField
                                                                label="Task Name"
                                                                value={editTaskData.name}
                                                                onChange={(e) =>
                                                                    setEditTaskData({ ...editTaskData, name: e.target.value })
                                                                }
                                                                fullWidth
                                                                variant="outlined"
                                                                size="small"
                                                                sx={{ mb: 1 }}
                                                            />
                                                            <TextField
                                                                label="Description"
                                                                value={editTaskData.description}
                                                                onChange={(e) =>
                                                                    setEditTaskData({
                                                                        ...editTaskData,
                                                                        description: e.target.value,
                                                                    })
                                                                }
                                                                fullWidth
                                                                variant="outlined"
                                                                size="small"
                                                                sx={{ mb: 1 }}
                                                            />
                                                        </Box>
                                                    ) : (
                                                        <Box sx={{ flexGrow: 1 }}>
                                                            <ListItemText
                                                                primary={
                                                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                                        {task.name}
                                                                    </Typography>
                                                                }
                                                                secondary={task.description}
                                                            />
                                                        </Box>
                                                    )}

                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <Checkbox
                                                            checked={task.completed}
                                                            onChange={() => handleCompleteToggle(task)}
                                                        />
                                                        {editTaskId === task.id ? (
                                                            <IconButton onClick={handleSaveTask}>
                                                                <SaveIcon />
                                                            </IconButton>
                                                        ) : (
                                                            <IconButton onClick={() => handleEditTask(task)}>
                                                                <EditIcon />
                                                            </IconButton>
                                                        )}
                                                        <IconButton edge="end" onClick={() => handleDelete(task.id)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </ListItem>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </List>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    );
};

export default TaskList;
