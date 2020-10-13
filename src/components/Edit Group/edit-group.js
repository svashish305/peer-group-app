import React, {useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';

function EditGroup(props) {

  function setEditClicked(value) {
    props.onChange(value)
  }

  return (
    <div>
      {props.editClicked ? (
        <div>
          <Button onClick={() => setEditClicked(false)}>Cancel editing {props.groupId} and Go Back</Button>
        </div>
      ) : null}
    </div>
  )
}

export default EditGroup;
