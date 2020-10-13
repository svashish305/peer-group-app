import {useState, useEffect} from 'react'
import {API} from '../api-service';
import {useCookies} from 'react-cookie';

function useFetch() {
  const [loggedInUser, setLoggedInUser] = useState([]);
  const [isAdmin, setIsAdmin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [token, deleteToken] = useCookies(['pg-token']);

  useEffect(() => {
      async function fetchData() {
          setLoading(true);
          setError();
          const loggedInUser = await API.getLoggedInUser(token['pg-token'])
          .catch(err => {
            deleteToken(['pg-token'])
            setLoggedInUser(null)
            setError(err)
          })
          setLoggedInUser(loggedInUser)
          if(loggedInUser.is_student) {
            setIsAdmin(false)
          } else {
            setIsAdmin(true)
          }
          setLoading(false);
      }
      fetchData();    
  },
  // eslint-disable-next-line 
  []);
  return [loggedInUser, isAdmin, loading, error] 
}

export {useFetch}