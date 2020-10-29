import React, {useState, useEffect} from 'react';
import { API } from '../../api-service';
import { useCookies } from 'react-cookie';
import { useMediaQuery } from 'react-responsive';
import { Image, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import './dashboard.scss';
import EditGroup from '../Edit Group/edit-group';
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
  const [editClicked, setEditClicked] = useState(false);
  const [groupIdToEdit, setGroupIdToEdit] = useState(null);

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
    setEditClicked(true)
    setGroupIdToEdit(groupId)
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
        (editClicked ? (
          <EditGroup loggedInUser={props.loggedInUser} editClicked={editClicked} groups={groups}
           groupId={groupIdToEdit} onEditClickedChange={setEditClicked} onGroupsChange={setGroups} />
        ) : (
          <div className='dashboard-container'>
          <div className='search-container'>
            <input placeholder="Search Groups" className='search-input' onChange={(evt) => filterGroups(evt.target.value)} />
            <Button onClick={() => createClicked()}>+ Add</Button> 
          </div>

          <div className={`${isTabletOrMobile || isTabletOrMobileDevice ? 'mt-42' : 'mt-42'}`}>
            {groups && groups.length > 0 && 
            // eslint-disable-next-line
            groups.filter(g => {
              if(search == null) {
                return g
              } else if (g.name.toLowerCase().includes(search.toLowerCase())) {
                return g
              }
            })
            .map((group) => {
              return (
                <div key={group && group.id} className='group-row'>
                  <div className={`group-list-item ${isTabletOrMobile || isTabletOrMobileDevice ? 'mb-20' : 'mb-32'}`}>
                    {group.name}
                  </div>
                  <Image className='edit-icon pointer' src='/assets/images/edit.svg' alt='edit' onClick={() => editGroup(group.id)} fluid />
                  <Image className='delete-icon pointer' src='/assets/images/delete.svg' alt='delete' onClick={() => deleteGroup(group.id)} fluid />
                </div>
              ) 
            })}
            {isCreateButtonClicked ? 
            (<div className='group-row'>
              <div className={`group-list-item ${isTabletOrMobile || isTabletOrMobileDevice ? 'mb-20' : 'mb-32'}`}>
                <input autoFocus className='new-group-input' placeholder='Enter Group Name' value={newGroupName} onChange={(evt) => setNewGroupName(evt.target.value)} />
              </div>
              <FontAwesomeIcon icon={faPlus} className='pointer' onClick={() => addGroup(newGroupName)} />
              <FontAwesomeIcon icon={faTimes} className='pointer' onClick={() => setIsCreateButtonClicked(false)} />
            </div>) : null}
          </div>
        </div>
        ))
    ) : (
      <StudentDashboard loggedInUser={props.loggedInUser} />
    )}  
    </React.Fragment>
  )
}

export default Dashboard;
