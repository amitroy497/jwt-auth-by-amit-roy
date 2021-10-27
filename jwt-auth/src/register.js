import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

const Register = ({ setLogoutUser }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	let history = useHistory();

	const register = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:5000/api/auth/register', {
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
			<h2>Register Page</h2>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<Box
				component='form'
				sx={{
					'& > :not(style)': { m: 1, width: '45ch' },
				}}
				noValidate
				autoComplete='off'
				onSubmit={register}
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
					Register
				</Button>
			</Box>
			<p>
				Already have an account the please <Link to='/login'>Login</Link>{' '}
				yourself
			</p>
		</div>
	);
};

export default Register;
