import axios from 'axios'
import { addUserToCommunity } from '../store'
import CONFIG from '../api-routes'
const apiURL = CONFIG.API_URL

/*--------actions-------*/

const GET_COMMUNITY = 'GET_COMMUNITY'
const CLEAR_COMMUNITY = 'CLEAR_COMMUNITY'

/*--------action creators-------*/

const getCommunity = community => ({ type: GET_COMMUNITY, community })
export const clearCommunity = () => ({ type: CLEAR_COMMUNITY })

/*--------thunk creators-------*/

export const fetchCommunity = id => dispatch => {
  axios.
  get(`${apiURL}/communities/${id}`)
  .then(res => {
      dispatch(getCommunity(res.data))})
    .catch(err => console.log(err))
}

export const createCommunityThunkerator = (name, user) => async dispatch => {
  try {
    const newCommunity = await axios.post(`${apiURL}/communities`, {name})
    console.log('adding user to community and getting community')
    await dispatch(addUserToCommunity(newCommunity.data.id, user))
    await dispatch(getCommunity(newCommunity.data))
  }
  catch (err) {
    console.log(err)
  }
}

export const sendInvitations = (emails, user, communityId) => {
  return async (dispatch) => {
    try {
      const payload = {
        user,
        emails,
      }
      await axios.post(`${apiURL}/communities/${communityId}/inviteUsers`, payload)
    }
    catch (err) {
      console.log(err)
    }
  }
}

/*--------reducer-------*/

export default function (state = {}, action) {
  switch (action.type) {
    case GET_COMMUNITY:
      return action.community;
    case CLEAR_COMMUNITY:
      return {}
    default:
      return state;
  }
}
