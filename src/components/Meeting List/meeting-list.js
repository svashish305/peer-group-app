import React, { useState, useEffect } from 'react';
import { API } from '../../api-service';
import { useCookies } from 'react-cookie';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { parseISO, format, addHours } from 'date-fns';
import './meeting-list.scss';

function MeetingList(props) {

  const [token] = useCookies(['pg-token']);

  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if(props.group) {
        const meetingsOfGroup = await API.getMeetingsOfGroup(props.group.id, token['pg-token'])
        .catch(err => console.log(err))
        setMeetings(meetingsOfGroup)
      } else if (props.userId) {
        const meetingsOfUser = await API.getMeetingsOfUser(props.userId, token['pg-token'])
        .catch(err => console.log(err))
        setMeetings(meetingsOfUser)
      }
      
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
        {props.group ? <label className='meeting-text'>{props.group.name} Meetings</label>
         : (props.userId ? <label className='meeting-text'>My Meetings</label> : null)}
        <Row className='mt-20'>
          <Col>
            <label className='float-left heading-text'>Date</label>
          </Col>
          <Col>
            <label className='float-left heading-text'>Time</label>
          </Col>
        </Row>
        {meetings && meetings.length > 0 && meetings.map(meeting => {
          return (
            <Row key={meeting && meeting.id} className='mt-20'>
              <Col>
                <div className='flex-center read-only-field'>{format(parseISO(meeting.time), "MMM d yyyy")}</div>
              </Col>
              <Col>
                <div className='flex-center read-only-field'>{format(parseISO(meeting.time), "h:mm aa")} - {format(addHours(parseISO(meeting.time), 1), "h:mm aa")}</div>
              </Col>
            </Row>
          )
        })}
      </Container>
      <div className='flex-center'>
        <footer>
          <Button className='custom-meeting-list-btn' onClick={() => setShowMeetingsClicked(false)}>Go Back</Button>
        </footer>
      </div>
    </div>
  )
}

export default MeetingList;