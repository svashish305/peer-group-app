import React, {useState, useEffect} from 'react';
import { API } from '../../api-service';
import { useCookies } from 'react-cookie';
import { useMediaQuery } from 'react-responsive';
import { Image, Button } from 'react-bootstrap';
import './student-dashboard.scss'

function StudentDashboard(props) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)',
  });

  const [token] = useCookies(['pg-token']);
  const [groupOfStudent, setGroupOfStudent] = useState(null)
  const [usersInGroup, setUsersInGroup] = useState([])

  useEffect(() => {
    async function fetchData() {
      const groupOfStudent = await API.getGroupOfUser(props.loggedInUser.id, token['pg-token'])
      .catch(err => console.log(err))
      setGroupOfStudent(groupOfStudent)
    
      const usersInGroup = await API.getUsersInGroup(groupOfStudent.id, token['pg-token'])
      .catch(err => console.log(err))
      setUsersInGroup(usersInGroup)
    }
    fetchData()
  }, 
  // eslint-disable-next-line
  [groupOfStudent])

  return (
    <div className='dashboard-container'>
      Hello Student this is your dashboard!
    </div>
  )
}

export default StudentDashboard;