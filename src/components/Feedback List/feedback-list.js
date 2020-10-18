import React from 'react';
import { Button } from 'react-bootstrap';

function FeedbackList(props) {

  function setShowFeedbackClicked(value) {
    props.onShowFeedbackClickedChange(value)
  }

  return (
    <div className='feedback-list-container'>
      Feedback list component
      <Button onClick={() => setShowFeedbackClicked(false)}>Go Back</Button>
    </div>
  )
}

export default FeedbackList;