import axios from 'axios'

import CONFIG from '../api-routes'
const apiURL = CONFIG.API_URL

const defaultCommunity = {}

/*--------actions-------*/

const GET_COMMUNITY = 'GET_COMMUNITY'

/*--------action creators-------*/

const getCommunity = community => ({ type: GET_COMMUNITY, community })

/*--------thunk creators-------*/

export const fetchCommunity = id => dispatch => {
  axios.
  get(`${apiURL}/communities/${id}`)
  .then(res => {
      dispatch(getCommunity(res.data || defaultCommunity))})
    .catch(err => console.log(err))
}

export const sendInvitations = (emails, communityId) => {
  return async (dispatch) => {
    try {
      await axios.post(`${apiURL}/communities/${communityId}/inviteUsers`, emails)
    }
    catch (err) {
      console.log(err)
    }
  }
}

/*--------reducer-------*/

export default function (state = defaultCommunity, action) {
  switch (action.type) {
    case GET_COMMUNITY:
      return action.community;
    default:
      return state;
  }
}
