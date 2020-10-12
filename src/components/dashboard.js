import React from 'react'

function Dashboard(props) {
  return (
    <div>
      Welcome to Dashboard! <br />
      You are {props.loggedInUser && props.loggedInUser.email.split('@')[0]}! <br /> 
      Admin status : {props.isAdmin ? 'True' : 'False'}
    </div>
  )
}

export default Dashboard;
