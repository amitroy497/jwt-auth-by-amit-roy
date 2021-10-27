import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = ({ setLogoutUser }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	let history = useHistory();

	const login = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:5000/api/auth/login', {
				email,
				password,
			})
			.then((response) => {
				console.log('response', response);
				localStorage.setItem(
					'login',
					JSON.stringify({
						userLogin: true,
						token: response.data.access_token,
					})
				);
				setError('');
				setEmail('');
				setPassword('');
				setLogoutUser(false);
				history.push('/');
			})
			.catch((error) => setError(error.response.data.message));
	};
	return (
		<div style={{ marginTop: '100px' }}>
			<h2>Login Page</h2>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<Box
				component='form'
				sx={{
					'& > :not(style)': { m: 1, width: '45ch' },
				}}
				noValidate
				autoComplete='off'
				onSubmit={login}
			>
				<TextField
					id='username'
					label='Username'
					variant='standard'
					type='text'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<br />
				<TextField
					id='password'
					label='Password'
					variant='standard'
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />
				<br />
				<Button variant='contained' style={{ width: '100px' }} type='submit'>
					Login
				</Button>
			</Box>
			<p>
				Don't have an account then please do{' '}
				<Link to='/register'>Register</Link> yourself
			</p>
		</div>
	);
};

export default Login;
