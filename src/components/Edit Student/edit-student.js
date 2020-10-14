import React, { useState, useEffect } from 'react';
import { API } from '../../api-service';
import { useCookies } from 'react-cookie';
import { Dropdown, Button } from 'react-bootstrap';
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

  return (
    <div>
      edit user called for {userToEdit && (userToEdit.name ? userToEdit.name : userToEdit.email.split('@')[0])}! <br/>
      <Button className='custom-sized-btn' onClick={() => setEditUserClicked(false)}>Go Back</Button>

    </div>
  )
}

export default EditStudent;
