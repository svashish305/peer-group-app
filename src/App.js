import React, {useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {useFetch} from './hooks/useFetch';
import Sidebar from './components/sidebar/sidebar';
import Dashboard from './components/dashboard';
import './App.scss';

function App() {
  // eslint-disable-next-line
  const [token, setToken] = useCookies(['pg-token']);
  const [loggedInUser, isAdmin, loading, error] = useFetch();

  useEffect(() => {
    if (!token['pg-token']) window.location.href = '/';
  }, [token])

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error loading dashboard</h1>

  return (
    <div className='App'>
      <header className='App-header'>Peer Group App</header>
      <Sidebar loggedInUser={loggedInUser} />
      <Dashboard loggedInUser={loggedInUser} isAdmin={isAdmin} />
    </div>
  );
}

export default App;
