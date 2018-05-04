import axios from 'axios'

const defaultUsers = {}

/*--------actions-------*/

const GET_USERS = 'GET_USERS'

/*--------action creators-------*/

const getUsers = users => ({ type: GET_USERS, users })

/*--------thunk creators-------*/

export const fetchUsers = () => dispatch => {
  axios.
    get('/users')
    .then(res => dispatch(getUsers(res.data || defaultUsers)))
    .catch(err => console.log(err))
}

/*--------reducer-------*/

export default function (state = defaultUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.scores;
    default:
      return state;
  }
}
