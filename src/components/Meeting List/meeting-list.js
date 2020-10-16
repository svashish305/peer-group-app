import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import './meeting-list.scss';

function MeetingList(props) {

  const history = useHistory()
  const location = useLocation()

  const routeParams = useParams()

  return (
    <div>
      This is meeting list component, route params caught: {routeParams.groupId} <br />
      the current route is {location.pathname}
      <Button onClick={() => history.goBack()}>Go Back</Button>
    </div>
  )
}

export default MeetingList;