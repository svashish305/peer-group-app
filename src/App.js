import React, {useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {useFetch} from './hooks/useFetch';
import Sidebar from './components/Sidebar/sidebar';
import Dashboard from './components/Dashboard/dashboard';
import './App.scss';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer />
    </div>
  );
}

export default App;
