import React, {useState, useEffect} from 'react';
import { API } from '../../api-service';
import { useCookies } from 'react-cookie';
import { useMediaQuery } from 'react-responsive';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
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
  [])

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
          <Button>Add +</Button> {/* button to add new group */}
        </div>

        <div className='group-list'>
          {groups && groups.length && groups.map((group) => {
            return (
              <div key={group && group.id} className='group-item'>
                {group.name}
              </div>
              // edit and remove icons
            ) 
          })}
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
