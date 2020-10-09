import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './sidebar.scss';
 
class Sidebar extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }
 
  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
    <div id="outer-container">
				<Menu right outerContainerId={ "outer-container" }>
						<a id="logout" className="menu-item" href="/logout">LOG OUT</a>
				</Menu>
			</div>
    );
  }
}

export default Sidebar;