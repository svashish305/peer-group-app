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
    return fetch(`${process.env.REACT_APP_API_URL}/api/groups/${group_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then(resp => resp.json())
  }
}