import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser } from '../redux/actions';
import { TextField, Button, Box, Typography, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault();
//         let names =  JSON.parse(localStorage.getItem('users')) 
//         names = Object.keys(names)
// console.log("ffffff", users) 
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        // if (names.includes(username)) {
        if(users[username]){
            setError('User already exists');
            return;
        }
        dispatch(registerUser(username, password));
        dispatch(loginUser(username));
        navigate("/login")
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh', padding: '0 20px' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper elevation={3} style={{ padding: '20px', borderRadius: '8px' }}>
                    <Typography variant="h5" align="center">Register</Typography>
                    <Box component="form" onSubmit={handleRegister} noValidate>
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
                        <TextField
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                        />
                        {error && <Typography color="error">{error}</Typography>}
                        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
                            Register
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Register;
