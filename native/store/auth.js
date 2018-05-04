import axios from 'axios'
import CONFIG from '../api-routes'

const authURL = CONFIG.AUTH_URL

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

const defaultUser = {}


/*--------action creators-------*/


const loginUser = user => ({type: LOGIN_USER, user})
const logoutUser = () => ({type: LOGOUT_USER})

/*--------thunk creators-------*/

export const me = () => dispatch => {

    axios. 
    get('/auth/me')
    .then(res => dispatch(loginUser(res.data || defaultUser)))
    .catch(err => console.log(err))


}

export const auth = (email, password) => (dispatch) => {
    axios
    .post(`${authURL}/auth/login`,  { email, password })
    .then(
        res => {
            dispatch(loginUser(res.data))
            console.log('Logging in');
            //history.push('/home');
            console.log(res)
        },

        authError => {
        // rare example: a good use case for parallel (non-catch) error handler
        dispatch(loginUser({ error: authError }));
      }
        
    )
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr));


}
export const logout = () => dispatch =>
  axios
    .post('/auth/logout' )
    .then(_ => {
      dispatch(logoutUser());
      
      //history.push('/login');
    })
    .catch(err => console.log(err));

export default function(state = defaultUser, action) {
    switch (action.type) {
      case LOGIN_USER:
        return action.user;
      case LOGOUT_USER:
        return defaultUser;
      default:
        return state;
    }
  }
