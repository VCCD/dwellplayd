import axios from 'axios'
import CONFIG from '../api-routes'
import { editCommunityTask } from '../store'

const apiURL = CONFIG.API_URL

const SET_ACTIVE_COMMUNITY_TASK = 'SET_ACTIVE_COMMUNITY_TASK'
const CLEAR_ACTIVE_COMMUNITY_TASK = 'CLEAR_ACTIVE_COMMUNITY_TASK'

//action creators

export const setActiveCommunityTask = (task) => ({
  type: SET_ACTIVE_COMMUNITY_TASK,
  task,
})
export const clearActiveCommunityTask = () => ({
  type: CLEAR_ACTIVE_COMMUNITY_TASK,
})

//thunks

export const saveEditedCommunityTaskThunkerator = (communityId, task) => {
  return async (dispatch) => {
    try {
      const updatedTask = await axios.put(`${apiURL}/community-tasks/${communityId}`, task)
      dispatch(editCommunityTask(updatedTask))
    }
    catch (err) {
      console.log(err)
    }
  }
}

//reducer
export default (prevState = {}, action) => {
  switch (action.type) {
    case SET_ACTIVE_COMMUNITY_TASK:
      return action.task
    case CLEAR_ACTIVE_COMMUNITY_TASK:
      return {}
    default: return prevState
  }
}
