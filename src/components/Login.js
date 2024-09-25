import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions';
import { TextField, Button, Box, Typography, Paper, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();
        let names =  JSON.parse(localStorage.getItem('users')) 
        names = Object.values(names)
        // if (!users[username] || users[username] !== password) {
        if (!names.includes(password)) {
            setError('Invalid credentials');
            return;
        }
        setError('')
        dispatch(loginUser(username));
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh', padding: '0 20px' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper elevation={3} style={{ padding: '20px', borderRadius: '8px' }}>
                    <Typography variant="h5" align="center">Login</Typography>
                    <Box component="form" onSubmit={handleLogin} noValidate>
                        <TextField
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                        />
                        {error && <Typography color="error">{error}</Typography>}
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Login
                        </Button>
                    </Box>
                    <Typography align="center" style={{ marginTop: '10px' }}>
                        Don't have an account? <Link to="/register">Register</Link>
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;
