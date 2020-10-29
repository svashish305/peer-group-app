import React, {useState, useEffect} from 'react';
import { API } from '../../api-service';
import { useCookies } from 'react-cookie';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import EditStudent from '../Edit Student/edit-student';
import MeetingList from '../Meeting List/meeting-list';
import './edit-group.scss';

function EditGroup(props) {

  const [token] = useCookies(['pg-token']);

  const [groupToEdit, setGroupToEdit] = useState(null);
  const [usersInGroup, setUsersInGroup] = useState([]);
  const [timings, setTimings] = useState([]);
  const [editUserClicked, setEditUserClicked] = useState(false);
  const [userIdToEdit, setUserIdToEdit] = useState(null);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [isCreateUserButtonClicked, setIsCreateUserButtonClicked] = useState(false);
  const [showMeetingsClicked, setShowMeetingsClicked] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const groupToEdit = await API.getGroupById(props.groupId, token['pg-token'])
      .catch(err => console.log(err))
      setGroupToEdit(groupToEdit)
      const users = await API.getUsersInGroup(props.groupId, token['pg-token'])
      .catch(err => console.log(err))
      setUsersInGroup(users)
      setTimings(users.map(user => user.availability))
    }
    fetchData()
  }, 
  // eslint-disable-next-line
  [])

  function setEditClicked(value) {
    props.onEditClickedChange(value)
  }

  function setGroups(groups) {
    props.onGroupsChange(groups)
  }

  const updateGroupName = (newName) => {
    if(newName !== groupToEdit.name) {
      API.updateGroup(props.groupId, {name: newName}, token['pg-token'])
      .then((g) => {
        setGroupToEdit(g)
        let remGroups = props.groups.filter(group => group.id !== g.id)
        const newGroups = [...remGroups, g]
        setGroups(newGroups)
      })
      .catch(err => console.log(err))
    }
  }

  const createUserClicked = () => {
    setIsCreateUserButtonClicked(true)
  }

  const validateEmail = (email) => {
    let isValid;
    if ((!email) || (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))) {
      isValid = false;
    } else {
      isValid = true;
    }
    return isValid;  
  }

  const addUser = (newUserEmail) => {
    if(validateEmail(newUserEmail)) {
      API.updateOrCreateUser({email: newUserEmail, name: newUserEmail.split('@')[0], password: '123456', is_student: true, group_id: props.groupId}, token['pg-token'])
      .then(newUser => {
        const newUsersInGroup = [...usersInGroup, newUser];
        setUsersInGroup(newUsersInGroup)
      })
      .catch(err => console.log('failed to create user because', err))
    } else {
      toast.error('Invalid Email! Try Again')
    }
    setNewUserEmail('')
    setIsCreateUserButtonClicked(false)
  }

  const editUser = (userId) => {
    setEditUserClicked(true)
    setUserIdToEdit(userId)
  }

  const deleteUser = (userId) => {
    API.deleteUser(userId, token['pg-token'])
    .then(() => {
      const remUsers = usersInGroup.filter(u => u.id !== userId)
      setUsersInGroup(remUsers)
    })
    .catch(err => console.log(err))
  }

  const scheduleMeeting = () => {
    let slots = {
      start: [],
      end: []
    }
    for(let i=0; i< timings.length; i++) {
      let [timingStart, timingEnd] = timings[i].split('-')
      slots.start.push(parseInt(timingStart))
      slots.end.push(parseInt(timingEnd))
    }
    API.scheduleMeetingForGroup(props.groupId, slots, token['pg-token'])
      .then(meeting => {
        toast.success('Scheduled Meeting!')
      })
      .catch(err => console.log(err))
  }

  return (
    <React.Fragment>
      {props.editClicked ? (
        (editUserClicked ? (
          <EditStudent loggedInUser={props.loggedInUser} editUserClicked={editUserClicked} usersInGroup={usersInGroup} groups={props.groups}
            currGroup={groupToEdit} userId={userIdToEdit} onEditUserClickedChange={setEditUserClicked} onUsersInGroupChange={setUsersInGroup} />
        ) : (
          (showMeetingsClicked ? (
          <div>
            <MeetingList loggedInUser={props.loggedInUser} showMeetingsClicked={showMeetingsClicked} onShowMeetingsClickedChange={setShowMeetingsClicked}
            group={groupToEdit} />
          </div>
          ) : (
            <div className='edit-group-container'>
            {groupToEdit ? (
            <Container>
              <input className='group-name-input float-left' defaultValue={groupToEdit.name} onClick={evt => evt.target.select()}
              onKeyDown={evt => evt.key === 'Enter' && evt.preventDefault() && updateGroupName(evt.target.value)}
              onBlur={(evt) => updateGroupName(evt.target.value)} />
            </Container>) : null}
            <br />
            {usersInGroup ? (
            <Container className='mt-20'>
              <label className='heading-text float-left'>Members :</label>
              <br /><br />
              <div className='heading-text float-left'>Name</div>
              <div className='heading-text'>Availability</div>
              {usersInGroup.length > 0 && usersInGroup.map((user) => {
                return (
                  <div key={user && user.id}>
                    <Row className='user-list-item mb-20'>
                      <Col className='p-0 name-col'>
                        <div className='user-name'>
                          {(user.name && user.name !== 'New Student') ? user.name : (user.email && user.email.split('@')[0])}
                        </div>
                      </Col>
                      <Col className='p-0'>
                        <div className='user-availability'>{user.availability}</div>
                      </Col>
                      <div className='p-0'>
                        <Image className='edit-user-icon pointer' src='/assets/images/edit.svg' alt='edit' onClick={() => editUser(user.id)} fluid />
                        <Image className='delete-user-icon pointer' src='/assets/images/delete.svg' alt='delete' onClick={() => deleteUser(user.id)} fluid />
                      </div>
                    </Row>
                  </div>
                )
              })}
              {isCreateUserButtonClicked ? 
              (<Row>
                <Col className='user-list-item mb-20 p-0'>
                  <input autoFocus className='new-user-input' placeholder='Enter User Email' type='email' value={newUserEmail} onChange={(evt) => setNewUserEmail(evt.target.value)} />
                </Col>
                <div className='p-0'>
                  <FontAwesomeIcon icon={faPlus} className='pointer' onClick={() => addUser(newUserEmail)} />
                  <FontAwesomeIcon icon={faTimes} className='pointer' onClick={() => setIsCreateUserButtonClicked(false)} />
                </div>
              </Row>) : null}
            </Container>) : null}
              <div className='flex-center'>
                <footer className='action-btns'>
                  <Button className='custom-sized-btn' onClick={() => setEditClicked(false)}>Go Back</Button>
                  <Button className='custom-sized-btn' onClick={() => scheduleMeeting()}>Schedule Meeting</Button>
                  <Button className='custom-sized-btn' onClick={() => createUserClicked()}>Add Student</Button>
                  <Button className='custom-sized-btn' onClick={() => setShowMeetingsClicked(true)}>View Meetings</Button>
                </footer>
              </div>
            </div>
          ))
        ))
      ) : null}
    </React.Fragment>
  )
}

export default EditGroup;
