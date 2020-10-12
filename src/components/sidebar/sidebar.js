import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './sidebar.scss';
import {useCookies} from 'react-cookie';

function Sidebar(props) {
  // eslint-disable-next-line
  const [token, setToken, deleteToken] = useCookies(['pg-token']);

  const logoutUser = () => {
    deleteToken(['pg-token']);
  }

  return (
    <div id='outer-container'>
      <Menu right disableAutoFocus outerContainerId={'outer-container'}>
        <label className='username' onClick={(e) => e.preventDefault()}>
          Hi {(props.loggedInUser.name && props.loggedInUser.name!== 'New Student') ? props.loggedInUser.name : props.loggedInUser.email.split('@')[0]}!
        </label>
        <a id='logout' className='menu-item' href='.' onClick={() => logoutUser()}>
          Log Out
        </a>
      </Menu>
    </div>
  );
}

export default Sidebar;
