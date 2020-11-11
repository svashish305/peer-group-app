import React, { useState, useEffect } from 'react';
import { API } from '../../api-service';
import { useCookies } from 'react-cookie';
import { Container, Row, Col, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { UserType } from '../../role';
import './edit-student.scss';

function EditStudent(props) {

  const [token] = useCookies(['pg-token']);

  const [userToEdit, setUserToEdit] = useState(null);
  const [userToSave, setUserToSave] = useState(null);
  const [userRole, setUserRole] = useState(false)
  const [userGroup, setUserGroup] = useState('')

  useEffect(() => {
    async function fetchData() {
      const userToEdit = await API.getUserById(props.userId, token['pg-token'])
      .catch(err => console.log(err))
      setUserToEdit(userToEdit)
      setUserToSave(userToEdit)
      setUserRole(!!userToEdit.is_student ? UserType.User : UserType.Admin)
      setUserGroup(props.currGroup.name)
    }
    fetchData()
  }, 
  // eslint-disable-next-line
  [])

  function setEditUserClicked(value) {
    props.onEditUserClickedChange(value)
  }

  function setUsersInGroups(users) {
    props.onUsersInGroupChange(users)
  }

  const selectRole = (eventKey) => {
    setUserRole(UserType[eventKey])
    if(UserType[eventKey] === UserType.Admin) {
      setUserToSave({...userToSave, is_student: false})
    } else if(UserType[eventKey] === UserType.User) {
      setUserToSave({...userToSave, is_student: true})
    }
  }

  const selectGroup = (eventKey) => {
    // eslint-disable-next-line
    setUserGroup((props.groups.find(g => g.id == eventKey))['name'])
    setUserToSave({...userToSave, group_id: eventKey})
  }

  const saveUser = () => {
    API.updateOrCreateUser(userToSave, token['pg-token'])
      .then(savedUser => {
        if(savedUser.group_id !== userToEdit.group_id) {
          const updatedUsersInGroup = props.usersInGroup.filter(u => u.id !== savedUser.id)
          setUsersInGroups(updatedUsersInGroup)
        }
      })
      .catch(err => console.log(err))
    setUserToEdit(userToSave)
    setEditUserClicked(false)
  }

  return (
    <React.Fragment>
      <div className='edit-student-container'>
        <Container className='p-0 d-flex flex-column'>
          <label className='student-name'>{userToEdit && (userToEdit.name ? userToEdit.name : userToEdit.email.split('@')[0])}</label>
          <Row className='mt-66'>
            <Col>
              <label className='d-flex dropdown-label'>Role</label>
            </Col>
            <Col>
              <DropdownButton className='custom-dd' title={userRole}
                 onSelect={(eventKey) => selectRole(eventKey)}>
                  {Object.entries(UserType).map(([key, value]) => {
                    return (
                      <Dropdown.Item key={key} eventKey={key}>{value}</Dropdown.Item>
                    )
                  })}
              </DropdownButton>
            </Col>
          </Row>
          <Row className='mt-34'>
            <Col>
              <label className='d-flex dropdown-label'>Group</label>
            </Col>
            <Col>
              <DropdownButton className='custom-dd' title={userGroup} onSelect={(eventKey) => selectGroup(eventKey)}>
                {props.groups && props.groups.length > 0 && props.groups.map(grp => {
                  return (
                    <Dropdown.Item key={grp && grp.id} eventKey={grp.id}>{grp.name}</Dropdown.Item>
                  )
                })}
              </DropdownButton>
            </Col>
          </Row>
        </Container>
        <div className='flex-center'>
          <footer className='student-action-btns'>
            <Button className='custom-sized-user-btn' onClick={() => setEditUserClicked(false)}>Go Back</Button>
            <Button className='custom-sized-user-btn' onClick={() => saveUser()}>Save</Button>
          </footer>
        </div>
      </div>
    </React.Fragment>
  )
}

export default EditStudent;
