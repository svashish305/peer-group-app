import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './sidebar.scss';
 
class Sidebar extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }
 
  render () {
    return (
    <div id="outer-container">
				<Menu right disableAutoFocus outerContainerId={ "outer-container" }>
						<a id="logout" className="menu-item" href=".">LOG OUT</a>
				</Menu>
			</div>
    );
  }
}

export default Sidebar;