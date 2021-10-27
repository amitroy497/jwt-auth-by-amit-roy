import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './login';
import Home from './home';
import Header from './header';
import Register from './register';

function App() {
	const [logoutUser, setLogoutUser] = useState(false);
	return (
		<div className='App'>
			<h2>JWT Authentication using JSON Fake Server</h2>
			<Router>
				<Switch>
					<Route exact path='/'>
						<Header logoutUser={logoutUser} setLogoutUser={setLogoutUser} />
						<Home logoutUser={logoutUser} />
					</Route>
					<Route path='/login'>
						<Login setLogoutUser={setLogoutUser} />
					</Route>
					<Route path='/register'>
						<Register setLogoutUser={setLogoutUser} />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
