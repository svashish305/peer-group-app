import React, {useState, useEffect} from 'react';
import { API } from '../../api-service';
import { useCookies } from 'react-cookie';
import { useMediaQuery } from 'react-responsive';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import MeetingList from '../Meeting List/meeting-list';
import './student-dashboard.scss'

function StudentDashboard(props) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)',
  });

  const [token] = useCookies(['pg-token']);
  const [groupOfUser, setGroupOfUser] = useState(null);
  const [usersInGroup, setUsersInGroup] = useState([]);
  const [writeFeedbackClicked, setWriteFeedbackClicked] = useState(false);
  const [showFeedbackClicked, setShowFeedbackClicked] = useState(false);
  const [showMeetingClicked, setShowMeetingClicked] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const groupOfUser = await API.getGroupOfUser(props.loggedInUser.id, token['pg-token'])
      .catch(err => console.log(err))
      setGroupOfUser(groupOfUser)

      const usersInGroup = await API.getUsersInGroup(groupOfUser.id, token['pg-token'])
      .catch(err => console.log(err))
      setUsersInGroup(usersInGroup)
    }
    fetchData()
  }, 
  // eslint-disable-next-line
  [])

  const giveFeedback = (receiverId) => {
    
  }

  const saveAvailability = () => {
    // API.saveUserAvailability(props.loggedInUser.id, , token['pg-token'])
  }

  return (
    <React.Fragment>
      {showFeedbackClicked ? (
        <h1>Load feedbacklist component</h1>
      ) : (
        (showMeetingClicked ? (
          <MeetingList user={props.loggedInUser} showMeetingClicked={showMeetingClicked} onShowMeetingsClickedChange={setShowMeetingClicked} />
        ) : (
          <div className='user-dashboard-container'>
            <Container className='mt-34 d-flex'>
              <Row>
                <Col className='p-0'>
                  <label className='label-text'>My Group : </label>
                </Col>
                <Col>
                  <div className='flex-center read-only'>{groupOfUser && groupOfUser.name}</div>                
                </Col>
              </Row>            
            </Container>
            <label className='mt-8 float-left label-text'>My Peers : </label><br />
            {usersInGroup && usersInGroup.length && usersInGroup.filter(user => user.id !== props.loggedInUser.id).map(peer => {
              return (
              <Row key={peer && peer.id} className='mt-20'>
                <Col>
                  <div className='flex-center read-only'>{peer.name !== 'New Student' ? peer.name : peer.email.split('@')[0]}</div>                
                </Col>
                <Col>
                  <Image src='/assets/images/feedback.svg' alt='feedback' className='feedback-icon' onClick={() => giveFeedback(peer.id)} />
                </Col>
              </Row>
              )
            })}
            <div className='flex-center'>
              <footer className='user-action-btns'>
                <br />
                <Button className='custom-sized-btn' onClick={() => saveAvailability()}>Save</Button>
                <Button className='custom-sized-btn' onClick={() => setShowFeedbackClicked(true)}>My Feedbacks</Button>
                <Button className='custom-sized-btn' onClick={() => setShowMeetingClicked(true)}>My Meetings</Button>
              </footer>
            </div>
          </div>
        ))
      )}
    </React.Fragment>
  )
}

export default StudentDashboard;