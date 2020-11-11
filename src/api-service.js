export class API {
  static loginUser(body) {
      return fetch(`${process.env.REACT_APP_API_URL}/api/login/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
      }).then(resp => resp.json())
  }

  static registerUser(body) {
      return fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
      }).then(resp => resp.json())
  }
 
  static getLoggedInUser(token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/loggedinuser/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then(resp => resp.json())
  }

  static getAllUsers(token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then(resp => resp.json())
  }

  static getUserById(user_id, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/users/${user_id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then(resp => resp.json())
  }

  static updateOrCreateUser(body, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/update_or_create_user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }).then(resp => resp.json())
  }

  static deleteUser(user_id, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/users/${user_id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getAllGroups(token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/groups/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then(resp => resp.json())
  }

  static getGroupById(group_id, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/groups/${group_id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then(resp => resp.json())
  }

  static createGroup(body, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/groups/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }).then(resp => resp.json())
  }

  static updateGroup(group_id, body, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/groups/${group_id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }).then(resp => resp.json())
  }

  static deleteGroup(group_id, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/groups/${group_id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getGroupOfUser(user_id, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/users/${user_id}/group/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then(resp => resp.json())
  }

  static getFeedbacksOfUser(user_id, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/users/${user_id}/feedbacks/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then(resp => resp.json())
  }

  static getMeetingsOfUser(user_id, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/users/${user_id}/meetings/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then(resp => resp.json())
  }

  static saveUserAvailability(user_id, body, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/users/${user_id}/set_availability/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body)
    }).then(resp => resp.json())
  }

  static getUsersInGroup(group_id, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/groups/${group_id}/users/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then(resp => resp.json())
  }

  static getMeetingsOfGroup(group_id, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/groups/${group_id}/meetings/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then(resp => resp.json())
  }

  static scheduleMeetingForGroup(group_id, body, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/groups/${group_id}/set_meeting/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body)
    }).then(resp => resp.json())
  }

  static giveFeedback(body, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/give_feedback/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body)
    }).then(resp => resp.json())
  }
}