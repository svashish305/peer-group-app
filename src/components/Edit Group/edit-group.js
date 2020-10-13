import React, {useState, useEffect} from 'react';
import { API } from '../../api-service';
import { useCookies } from 'react-cookie';
import { useMediaQuery } from 'react-responsive';
import {Button} from 'react-bootstrap';
import './edit-group.scss';

function EditGroup(props) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)',
  });

  const [token] = useCookies(['pg-token']);

  const [groupToEdit, setGroupToEdit] = useState(null);
  const [usersInGroup, setUsersInGroup] = useState([]);
  const [updatedName, setUpdatedName] = useState('')


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

  return (
    <div>
      {props.editClicked ? (
        <div className='main-container'>
          {groupToEdit ? <input className='group-name-input' defaultValue={groupToEdit.name} onClick={evt => evt.target.select()}
          onKeyDown={evt => evt.key === 'Enter' && evt.preventDefault() && updateGroupName(evt.target.value)}
          onBlur={(evt) => updateGroupName(evt.target.value)}
           /> : null}
          <label className='members-text'>Members :</label><br />

          <Button className='back-btn' onClick={() => setEditClicked(false)}>Go Back</Button>
        </div>
      ) : null}
    </div>
  )
}

export default EditGroup;
