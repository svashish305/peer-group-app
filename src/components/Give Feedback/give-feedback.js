import React, { useState } from 'react';
import { API } from '../../api-service';
import { useCookies } from 'react-cookie';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './give-feedback.scss';
import { toast } from 'react-toastify';

function GiveFeedback(props) {

  const [token] = useCookies(['pg-token']);

  const [feedbackInput, setFeedbackInput] = useState(null)

  function setGiveFeedbackClicked(value) {
    props.onGiveFeedbackClickedChange(value)
  }

  const giveFeedback = () => {
    API.giveFeedback({remarks: feedbackInput, receiver_id: props.receiver.id}, token['pg-token'])
      .then(feedback => toast.success('Feedback Posted!'))
      .catch(err => console.log(err))
    setGiveFeedbackClicked(false)
  }

  return (
    <div className='give-feedback-container'>
      <label className='header-text'>
        Write feedback for "{props.receiver.name !== 'New Student' ? props.receiver.name : props.receiver.email.split('@')[0]}" :  
      </label>
      <Container>
        <Row>
          <label className='mt-34 label-text'>Remarks : </label>
        </Row>
        <Row>
          <Col className='p-0'>
            <textarea className='float-left feedback-input' autoFocus rows='10' cols='25' onChange={(evt) => setFeedbackInput(evt.target.value)}></textarea>
          </Col>
        </Row>
      </Container>
      <div className='flex-center'>
        <footer className='give-feedback-action-btns'>
          <Button className='custom-feedback-btn' onClick={() => giveFeedback()}>Submit</Button>
          <Button className='custom-feedback-btn' onClick={() => setGiveFeedbackClicked(false)}>Cancel</Button>
        </footer>
      </div>
    </div>
  )
}

export default GiveFeedback;
