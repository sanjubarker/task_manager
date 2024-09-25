import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import { Container, Box } from '@mui/material';
import TaskPage from './components/TaskPage';

const App = () => {
    const currentUser = useSelector(state => state.currentUser);

    return (
        <Router>
            <Navbar />  
            <Container>
                <Box mt={0}>
                    <Routes>
                        <Route path="/register" element={currentUser ? <Navigate to="/tasks" /> : <Register />} />
                        <Route path="/login" element={currentUser ? <Navigate to="/tasks" /> : <Login />} />
                        <Route path="/tasks" element={currentUser ? <TaskPage /> : <Navigate to="/login" />} />
                        <Route path="*" element={<Navigate to={currentUser ? "/tasks" : "/login"} />} />
                    </Routes>
                </Box>
            </Container>
        </Router>
    );
};

export default App;
