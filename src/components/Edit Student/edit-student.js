import React, { useState, useEffect } from 'react';
import { API } from '../../api-service';
import { useCookies } from 'react-cookie';
import { Container, Row, Col, Dropdown, Button } from 'react-bootstrap';
import { UserType } from '../../role';
import './edit-student.scss';

function EditStudent(props) {

  const [token] = useCookies(['pg-token']);

  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const userToEdit = await API.getUserById(props.userId, token['pg-token'])
      .catch(err => console.log(err))
      setUserToEdit(userToEdit)
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

  const saveUser = () => {
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
              <Dropdown className='custom-dropdown'>
                <Dropdown.Toggle id="role-dropdown-basic">
                  {userToEdit && userToEdit.is_student ? UserType.User : UserType.Admin}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {Object.entries(UserType).map(([key, value]) => {
                    return (
                      <Dropdown.Item key={key}>{value}</Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row className='mt-34'>
            <Col>
              <label className='d-flex dropdown-label'>Group</label>
            </Col>
            <Col>
              <Dropdown className='custom-dropdown'>
                <Dropdown.Toggle id="group-dropdown-basic">
                  {props.currGroup.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {props.groups && props.groups.length && props.groups.map(grp => {
                    return (
                      <Dropdown.Item key={grp && grp.id}>{grp.name}</Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
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
