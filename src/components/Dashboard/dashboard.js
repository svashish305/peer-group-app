import React, {useState, useEffect} from 'react';
import { API } from '../../api-service';
import { useCookies } from 'react-cookie';
import { useMediaQuery } from 'react-responsive';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.scss';
import './dashboard.scss';

function Dashboard(props) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)',
  });

  const [token] = useCookies(['pg-token']);

  const [groups, setGroups] = useState([]);
  const [selectedTypeaheadGroup, setSelectedTypeaheadGroup] = useState([]);
  const [groupOfStudent, setGroupOfStudent] = useState(null);
  const [usersInGroup, setUsersInGroup] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if(props.isAdmin) {
        const groups = await API.getAllGroups(token['pg-token'])
        .catch(err => console.log(err))
        setGroups(groups)
      } else {
        const groupOfStudent = await API.getGroupOfUser(props.loggedInUser.id, token['pg-token'])
        .catch(err => console.log(err))
        setGroupOfStudent(groupOfStudent)

        const usersInGroup = await API.getUsersInGroup(groupOfStudent.id, token['pg-token'])
        .catch(err => console.log(err))
        setUsersInGroup(usersInGroup)
      }
    }
    fetchData()
  }, 
  // eslint-disable-next-line
  [groups])

  const [isCreateButtonClicked, setIsCreateButtonClicked] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const createClicked = () => {
    setIsCreateButtonClicked(true);
  }

  const addGroup = (newGroupName) => {
    API.createGroup({name: newGroupName}, token['pg-token'])
    .then(newGroup => {
      const newGroups = [...groups, newGroup];
      setGroups(newGroups)
    })
    .catch(err => console.log(err))
    // after successful addition
    setNewGroupName('')
    setIsCreateButtonClicked(false)
  }

  const editGroup = (groupId) => {
    // redirect to group details component
  }

  const deleteGroup = (groupId) => {
    API.deleteGroup(groupId, token['pg-token'])
    .then(() => {
      console.log('Group deleted successfully')
    })
    .catch(err => console.log(err))
  }

  return (
    <React.Fragment>
      {props.isAdmin ? (
      <div className='dashboard-container'>
        <div className='search-container'>
          <Typeahead
            id="basic-group-typeahead-single"
            className='group-typeahead'
            labelKey="name"
            onChange={setSelectedTypeaheadGroup}
            options={groups}
            placeholder="Search Groups"
            selected={selectedTypeaheadGroup}
          />
          <Button onClick={() => createClicked()}>Add +</Button> 
        </div>

        <div className={`group-list ${isTabletOrMobile || isTabletOrMobileDevice ? 'mt-42' : null}`}>
          {groups && groups.length && groups.map((group) => {
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
      <div className='dashboard-container'>
        
      </div>
    )}  
    </React.Fragment>
  )
}

export default Dashboard;
