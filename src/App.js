import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useFetch } from './hooks/useFetch';
import Sidebar from './components/Sidebar/sidebar';
import Dashboard from './components/Dashboard/dashboard';
import './App.scss';
import Spinner from 'react-bootstrap/Spinner';

function App() {
	// eslint-disable-next-line
	const [token, setToken] = useCookies(['pg-token']);
	const [loggedInUser, isAdmin, loading, error] = useFetch();

	useEffect(() => {
		if (!token['pg-token']) window.location.href = '/';
	}, [token]);

	if (error) return <h1>Error loading dashboard</h1>;

	return (
		<div className='App'>
			<header className='App-header'>Peer Group App</header>
			{loading ? (
				<div className='mt-66 flex-center'>
					<Spinner animation='border' role='status' variant='primary'>
						<span className='sr-only'>Loading...</span>
					</Spinner>
				</div>
			) : (
				<React.Fragment>
					<Sidebar loggedInUser={loggedInUser} />
					<Dashboard loggedInUser={loggedInUser} isAdmin={isAdmin} />
				</React.Fragment>
			)}
		</div>
	);
}

export default App;
