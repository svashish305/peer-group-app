import React, { useState, useEffect } from 'react';
import { API } from '../../api-service';
import { useCookies } from 'react-cookie';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { parseISO, format, addHours } from 'date-fns';
import './meeting-list.scss';

function MeetingList(props) {

  const [token] = useCookies(['pg-token']);

  const [meetingsOfGroup, setMeetingsOfGroup] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const meetingsOfGroup = await API.getMeetingsOfGroup(props.group.id, token['pg-token'])
      .catch(err => console.log(err))
      setMeetingsOfGroup(meetingsOfGroup)
    }
    fetchData()
  }, 
  // eslint-disable-next-line
  [])

  function setShowMeetingsClicked(value) {
    props.onShowMeetingsClickedChange(value)
  }

  return (
    <div className='group-meeting-container'>
      <Container className='p-0 d-flex flex-column'>
        <label className='meeting-text'>{props.group.name} Meetings</label>
        <Row className='mt-20'>
          <Col>
            <label className='float-left heading-text'>Date</label>
          </Col>
          <Col>
            <label className='float-left heading-text'>Time</label>
          </Col>
        </Row>
        {meetingsOfGroup && meetingsOfGroup.length && meetingsOfGroup.map(meeting => {
          return (
            <Row>
              <Col className=''>
                <div className='flex-center read-only'>{format(parseISO(meeting.time), "MMM d yyyy")}</div>
              </Col>
              <Col>
                <div className='flex-center read-only'>{format(parseISO(meeting.time), "h:mm aa")} - {format(addHours(parseISO(meeting.time), 1), "h:mm aa")}</div>
              </Col>
            </Row>
          )
        })}
      </Container>
      <div className='d-flex'>
        <footer>
          <Button onClick={() => setShowMeetingsClicked(false)}>Go Back</Button>
        </footer>
      </div>
    </div>
  )
}

export default MeetingList;