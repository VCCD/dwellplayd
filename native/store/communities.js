import axios from 'axios'
import CONFIG from '../api-routes'
const apiURL = CONFIG.API_URL

/*--------actions-------*/

const GET_COMMUNITIES = 'GET_COMMUNITIES'

/*--------action creators-------*/

const getCommunities = communities => ({ type: GET_COMMUNITIES, communities })

/*--------thunk creators-------*/

export const fetchCommunities = () => dispatch => {
  axios.
    get(`${apiURL}/communities/`)
    .then(res => {
      dispatch(getCommunities(res.data))
    })
    .catch(err => console.log(err))
}

/*--------reducer-------*/

export default function (state = {}, action) {
  switch (action.type) {
    case GET_COMMUNITIES:
      return action.communities;
    default:
      return state;
  }
}
