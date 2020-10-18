import React from 'react';
import { Button } from 'react-bootstrap';

function GiveFeedback(props) {

  function setGiveFeedbackClicked(value) {
    props.onGiveFeedbackClickedChange(value)
  }

  return (
    <div className='give-feedback-container'>
      Write feedback for {props.receiver.name !== 'New Student' ? props.receiver.name : props.receiver.email.split('@')[0]}
      <Button onClick={() => setGiveFeedbackClicked(false)}>Go Back</Button>
    </div>
  )
}

export default GiveFeedback;
