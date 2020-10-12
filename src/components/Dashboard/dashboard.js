import React from 'react'

function Dashboard(props) {
  return (
    <React.Fragment>
      {props.isAdmin ? (
      <div>
        Welcome to Dashboard! <br />
        You are {props.loggedInUser && ((props.loggedInUser.name && props.loggedInUser.name!== 'New Student') ? props.loggedInUser.name : props.loggedInUser.email.split('@')[0])}! <br /> 
        Admin status : True
      </div>
    ) : (
      <div>
        Welcome to Dashboard! <br />
        You are {props.loggedInUser && ((props.loggedInUser.name && props.loggedInUser.name!== 'New Student') ? props.loggedInUser.name : props.loggedInUser.email.split('@')[0])}! <br /> 
        Admin status : False
      </div>
    )}  
    </React.Fragment>
  )
}

export default Dashboard;
