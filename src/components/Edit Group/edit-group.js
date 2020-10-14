import React, {useState, useEffect} from 'react';
import { API } from '../../api-service';
import { useCookies } from 'react-cookie';
import { useMediaQuery } from 'react-responsive';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import './edit-group.scss';

function EditGroup(props) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)',
  });

  const [token] = useCookies(['pg-token']);

  const [groupToEdit, setGroupToEdit] = useState(null);
  const [usersInGroup, setUsersInGroup] = useState([]);
  const [editUserClicked, setEditUserClicked] = useState(false);
  const [userIdToEdit, setUserIdToEdit] = useState(null);


  useEffect(() => {
    async function fetchData() {
      const groupToEdit = await API.getGroupById(props.groupId, token['pg-token'])
      .catch(err => console.log(err))
      setGroupToEdit(groupToEdit)
      const users = await API.getUsersInGroup(props.groupId, token['pg-token'])
      .catch(err => console.log(err))
      setUsersInGroup(users)
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


  return (
    <React.Fragment>
      {props.editClicked ? (
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
            {usersInGroup.length && usersInGroup.map((user) => {
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
                    <div className='p-0 user-actions'>
                      <Image className='edit-user-icon pointer' src='/assets/images/edit.svg' alt='edit' onClick={() => editUser(user.id)} fluid />
                      <Image className='delete-user-icon pointer' src='/assets/images/delete.svg' alt='delete' onClick={() => deleteUser(user.id)} fluid />
                    </div>
                  </Row>
                </div>
              )
            })}
          </Container>) : null}
          <div className='flex-center'>
            <footer className='action-btns'>
              <Button className='custom-sized-btn' onClick={() => setEditClicked(false)}>Go Back</Button>
              <Button className='custom-sized-btn'>Schedule Meeting</Button>
              <Button className='custom-sized-btn'>Add Student</Button>
              <Button className='custom-sized-btn'>View Meetings</Button>
            </footer>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  )
}

export default EditGroup;
