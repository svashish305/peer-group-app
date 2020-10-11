import React from 'react';
import Sidebar from './components/sidebar/sidebar';
import Dashboard from './components/dashboard';
import './App.scss';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>Peer Group App</header>
      <Sidebar />
      {/* <Dashboard /> */}
    </div>
  );
}

export default App;
