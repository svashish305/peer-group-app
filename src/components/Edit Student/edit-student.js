import React from 'react';
import { Button } from 'react-bootstrap';
import './edit-student.scss';

function EditStudent(props) {

  function setEditUserClicked(value) {
    props.onEditUserClickedChange(value)
  }

  function setUsersInGroups(users) {
    props.onUsersInGroupChange(users)
  }

  return (
    <div>
      edit user called for {props.userId}
      <Button className='custom-sized-btn' onClick={() => setEditUserClicked(false)}>Go Back</Button>

    </div>
  )
}

export default EditStudent;
