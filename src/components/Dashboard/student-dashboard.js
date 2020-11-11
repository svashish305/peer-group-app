import React, {useState, useEffect} from 'react';
import { useMediaQuery } from 'react-responsive';
import { API } from '../../api-service';
import { useCookies } from 'react-cookie';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import MeetingList from '../Meeting List/meeting-list';
import FeedbackList from '../Feedback List/feedback-list';
import GiveFeedback from '../Give Feedback/give-feedback';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import './student-dashboard.scss'
import { toast } from 'react-toastify';

function StudentDashboard(props) {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1220px)'
  })

  const [token] = useCookies(['pg-token']);
  const [groupOfUser, setGroupOfUser] = useState(null);
  const [usersInGroup, setUsersInGroup] = useState([]);
  const [feedbackReceiver, setFeedbackReceiver] = useState(null);
  const [giveFeedbackClicked, setGiveFeedbackClicked] = useState(false);
  const [showFeedbackClicked, setShowFeedbackClicked] = useState(false);
  const [showMeetingClicked, setShowMeetingClicked] = useState(false)
  const [timeRange, setTimeRange] = useState(null);
  const [slot, setSlot] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const groupOfUser = await API.getGroupOfUser(props.loggedInUser.id, token['pg-token'])
      .catch(err => console.log(err))
      setGroupOfUser(groupOfUser)

      const usersInGroup = await API.getUsersInGroup(groupOfUser.id, token['pg-token'])
      .catch(err => console.log(err))
      setUsersInGroup(usersInGroup)

      const oldStart = [props.loggedInUser.availability.split('-')[0].slice(0, 2), ':', props.loggedInUser.availability.split('-')[0].slice(2)].join('')
      const oldEnd = [props.loggedInUser.availability.split('-')[1].slice(0, 2), ':', props.loggedInUser.availability.split('-')[1].slice(2)].join('')
      setTimeRange([oldStart, oldEnd])
    }
    fetchData()
  }, 
  // eslint-disable-next-line
  [])

  const giveFeedback = (receiver) => {
    setFeedbackReceiver(receiver)
    setGiveFeedbackClicked(true)
  }

  const changeAvailability = (timeRange) => {
    setTimeRange(timeRange)
    const slot = {
      start: timeRange[0].replace(':', ''),
      end: timeRange[1].replace(':', '')
    }
    setSlot(slot)
  }

  const saveAvailability = () => {
    API.saveUserAvailability(props.loggedInUser.id, slot, token['pg-token'])
      .then(res => toast.success('Saved Availability!'))
      .catch(err => console.log(err)) 
  }

  return (
    <React.Fragment>
      {showFeedbackClicked ? (
        <FeedbackList userId={props.loggedInUser.id} showFeedbackClicked={showFeedbackClicked} onShowFeedbackClickedChange={setShowFeedbackClicked} />
      ) : (
        showMeetingClicked ? (
          <MeetingList userId={props.loggedInUser.id} showMeetingClicked={showMeetingClicked} onShowMeetingsClickedChange={setShowMeetingClicked} />
        ) : ( 
          giveFeedbackClicked ? (
            <GiveFeedback userId={props.loggedInUser.id} receiver={feedbackReceiver} giveFeedbackClicked={giveFeedbackClicked} onGiveFeedbackClickedChange={setGiveFeedbackClicked} />
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
            {usersInGroup && usersInGroup.length > 0 && usersInGroup.filter(user => user.id !== props.loggedInUser.id).map(peer => {
              return (
              <Row key={peer && peer.id} className='mt-20'>
                <Col>
                  <div className='flex-center read-only'>{peer.name !== 'New Student' ? peer.name : peer.email.split('@')[0]}</div>                
                </Col>
                <Col>
                  <Image src='/assets/images/feedback.svg' alt='feedback' className='feedback-icon pointer' onClick={() => giveFeedback(peer)} />
                </Col>
              </Row>
              )
            })}
            <div>
              <label className='mt-34 float-left label-text'>My Preferred Meeting Slot : </label>
              <TimeRangePicker className={isDesktopOrLaptop ? 'mt-34' : 'mt-20'} minTime='18:00:00' maxTime='23:59:00' format='H mm' rangeDivider=' to '
              disableClock={true} clearIcon={null} value={timeRange} onChange={(value) => changeAvailability(value)} /> <br/>  
              <span className='hint'>Select min. 2 hours apart slots</span>
            </div>
            
            <div className='flex-center'>
              <footer className='user-action-btns'>
                <br />
                <Button className='custom-sized-btn' onClick={() => saveAvailability()}>Save</Button>
                <Button className='custom-sized-btn' onClick={() => setShowFeedbackClicked(true)}>My Feedbacks</Button>
                <Button className='custom-sized-btn' onClick={() => setShowMeetingClicked(true)}>My Meetings</Button>
              </footer>
            </div>
          </div>
          )
        )
      )}
    </React.Fragment>
  )
}

export default StudentDashboard;