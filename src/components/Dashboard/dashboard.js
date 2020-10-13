import React, {useState, useEffect} from 'react';
import { API } from '../../api-service';
import { useCookies } from 'react-cookie';
import { useMediaQuery } from 'react-responsive';
import { Image, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import './dashboard.scss';
import StudentDashboard from './student-dashboard';

function Dashboard(props) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)',
  });

  const [token] = useCookies(['pg-token']);

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if(props.isAdmin) {
        const groups = await API.getAllGroups(token['pg-token'])
        .catch(err => console.log(err))
        setGroups(groups)
      } 
    }
    fetchData()
  }, 
  // eslint-disable-next-line
  [])

  const [isCreateButtonClicked, setIsCreateButtonClicked] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [search, setSearch] = useState(null)

  const filterGroups = (textInput) => {
    setSearch(textInput) 
  }

  const createClicked = () => {
    setIsCreateButtonClicked(true)
  }

  const addGroup = (newGroupName) => {
    API.createGroup({name: newGroupName}, token['pg-token'])
    .then(newGroup => {
      const newGroups = [...groups, newGroup];
      setGroups(newGroups)
    })
    .catch(err => console.log(err))

    setNewGroupName('')
    setIsCreateButtonClicked(false)
  }

  const editGroup = (groupId) => {
    // redirect to group details component
  }

  const deleteGroup = (groupId) => {
    API.deleteGroup(groupId, token['pg-token'])
    .then(() => {
      const newGroups = groups.filter(g => g.id !== groupId)
      setGroups(newGroups)
    })
    .catch(err => console.log(err))
  }

  return (
    <React.Fragment>
      {props.isAdmin ? (
      <div className='dashboard-container'>
        <div className='search-container'>
          <input placeholder="Search Groups" className='search-input' onChange={(evt) => filterGroups(evt.target.value)} />
          <Button onClick={() => createClicked()}>+ Add</Button> 
        </div>

        <div className={`group-list ${isTabletOrMobile || isTabletOrMobileDevice ? 'mt-42' : null}`}>
          {groups && groups.length && 
          groups.filter(g => {
            if(search == null) {
              return g
            } else if (g.name.toLowerCase().includes(search.toLowerCase())) {
              return g
            }
          })
          .map((group) => {
            return (
              <div className='group-row'>
                <div key={group && group.id} className={`group-list-item ${isTabletOrMobile || isTabletOrMobileDevice ? 'mb-20' : null}`}>
                  {group.name}
                </div>
                <Image className='edit-icon' src='/assets/images/edit.svg' alt='edit' onClick={() => editGroup(group.id)} fluid />
                <Image className='delete-icon' src='/assets/images/delete.svg' alt='delete' onClick={() => deleteGroup(group.id)} fluid />
              </div>
            ) 
          })}
          {isCreateButtonClicked ? 
          (<div className='group-row'>
            <div className={`group-list-item ${isTabletOrMobile || isTabletOrMobileDevice ? 'mb-20' : null}`}>
              <input autoFocus className='new-group-input' placeholder='Enter Group Name' value={newGroupName} onChange={(evt) => setNewGroupName(evt.target.value)} />
            </div>
            <FontAwesomeIcon icon={faPlus} className='pointer' onClick={() => addGroup(newGroupName)} />
            <FontAwesomeIcon icon={faTimes} className='pointer' onClick={() => setIsCreateButtonClicked(false)} />
          </div>) : null}
        </div>
      </div>
    ) : (
      <StudentDashboard loggedInUser={props.loggedInUser} />
    )}  
    </React.Fragment>
  )
}

export default Dashboard;
