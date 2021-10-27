import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Header = ({ logoutUser, setLogoutUser }) => {
	const [login, setLogin] = useState('');
	const hydrateStateWithLocalStorage = () => {
		if (localStorage.hasOwnProperty('login')) {
			let value = localStorage.getItem('login');
			try {
				value = JSON.parse(value);
				setLogin(value);
			} catch (e) {
				setLogin('');
			}
		}
	};

	const logout = () => {
		localStorage.removeItem('login');
		setLogoutUser(true);
	};

	useEffect(() => {
		hydrateStateWithLocalStorage();
	}, [logoutUser]);
	return (
		<div>
			<header style={{ marginTop: '20px' }}>
				{!logoutUser && login.userLogin ? (
					<Button
						variant='contained'
						style={{ width: '100px' }}
						type='submit'
						color='secondary'
						onClick={logout}
					>
						Logout
					</Button>
				) : (
					<Link to='/login'>
						<Button
							variant='contained'
							style={{ width: '100px' }}
							type='submit'
						>
							Login
						</Button>
					</Link>
				)}
			</header>
		</div>
	);
};

export default Header;
