import React, { useState, useEffect } from 'react';
import { API } from '../../api-service';
import { useCookies } from 'react-cookie';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { parseISO, format } from 'date-fns';
import './feedback-list.scss';

function FeedbackList(props) {

  const [token] = useCookies(['pg-token']);

  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const feedbacks = await API.getFeedbacksOfUser(props.userId, token['pg-token'])
      .catch(err => console.log(err))
      setFeedbacks(feedbacks)
    }
    fetchData()
  }, 
  // eslint-disable-next-line
  [])

  function setShowFeedbackClicked(value) {
    props.onShowFeedbackClickedChange(value)
  }

  return (
    <div className='feedback-list-container'>
      <Container className='p-0 d-flex flex-column'>
        <label className='feedback-text'>My Feedbacks</label>
        <Row className='mt-20'>
          <Col>
            <label className='float-left feedback-heading-text'>Remarks</label>
          </Col>
          <Col>
            <label className='float-left feedback-heading-text'>Date</label>
          </Col>
        </Row>
        {feedbacks && feedbacks.length > 0 && feedbacks.map(feedback => {
          return (
            <Row key={feedback && feedback.id} className='mt-20'>
              <Col>
                <div className='flex-center feedback-read-only'>{feedback.remarks}</div>
              </Col>
              <Col>
                <div className='flex-center feedback-read-only'>{format(parseISO(feedback.created_at), "MMM d yyyy")}</div>
              </Col>
            </Row>
          )
        })}
      </Container>
      <div className='flex-center'>
        <footer>
          <Button className='custom-feedback-list-btn' onClick={() => setShowFeedbackClicked(false)}>Go Back</Button>
        </footer>
      </div>
    </div>
  )
}

export default FeedbackList;