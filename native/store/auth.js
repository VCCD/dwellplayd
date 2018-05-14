import axios from 'axios'
import CONFIG from '../api-routes'
import {
  fetchCommunity,
  clearCommunityTasks,
  clearCommunity,
  clearPastWinners,
  clearUserScores,
  clearCommunityTaskItems,
  userHasSeenAllTutorials,
  resetUserHasSeenTutorials,
} from '../store'

const authURL = CONFIG.AUTH_URL
const apiURL = CONFIG.API_URL

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'
//const UPDATE_USER = 'UPDATE_USER'


const defaultUser = {}
const initialUsersState = [];


/*--------action creators-------*/


const loginUser = user => ({type: LOGIN_USER, user})
export const logoutUser = () => ({type: LOGOUT_USER})
//const update = user => ({ type: UPDATE_USER, user });

/*--------thunk creators-------*/

export const me = () => dispatch => {
    axios.
    get('/auth/me')
    .then(res => dispatch(loginUser(res.data || defaultUser)))
    .catch(err => console.log(err))
}

export const updateUser = (userId, form) => dispatch => {
  console.log('axios getting called')
    axios.
    put(`${apiURL}/users/${userId}`, form)
    .then(res => {
      if (res.data.hasSeenTutorials) dispatch(userHasSeenAllTutorials())
      dispatch(loginUser(res.data || defaultUser))
    })
    .catch(err => console.log(err))
}

export const addUserToCommunity = (communityId, user) => dispatch => {
    user.communityId = communityId
    axios.
    put(`${apiURL}/users/${user.id}`, user)
    .then(res => dispatch(loginUser(res.data || defaultUser)))
    .catch(err => console.log(err))
}

export const auth = (body) => (dispatch) => {
    return axios
    .post(`${authURL}/login`, body)
    .then(
        res => {
          if (res.data.hasSeenTutorials) dispatch(userHasSeenAllTutorials())
          dispatch(loginUser(res.data))
          console.log('Logging in');
          //history.push('/home');
        },

        authError => {
        // rare example: a good use case for parallel (non-catch) error handler
        dispatch(loginUser({ error: authError }));
      }
    )
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr));
}

export const signup = (body) => (dispatch) => {
  return axios
  .post(`${authURL}/signup`, body)
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
    .post(`${authURL}/logout` )
    .then(_ => {
      dispatch(clearCommunityTasks())
      dispatch(clearCommunity())
      dispatch(clearPastWinners())
      dispatch(clearUserScores())
      dispatch(clearCommunityTaskItems())
      dispatch(resetUserHasSeenTutorials())
      dispatch(logoutUser());

      //history.push('/login');
    })
    .catch(err => console.log(err));

export const joinCommunityThunkerator = (communityId, user) => {
  return (dispatch) => {
    user.communityId = communityId
    axios.put(`${authURL}/users/${user.id}`, user)
  }
}

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
