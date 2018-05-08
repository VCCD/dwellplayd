import axios from 'axios'
import CONFIG from '../api-routes'

const apiURL = CONFIG.API_URL

const GET_COMMUNITY_TASK_ITEMS = 'GET_COMMUNITY_TASK_ITEMS'

//action creators

export const getCommunityTaskItems = taskItems => ({
  type: GET_COMMUNITY_TASK_ITEMS,
  taskItems
})


//thunks

export const fetchCommunityTaskItems = communityId => {
  return async (dispatch) => {
    try {
      const taskItems = await axios.get(`${apiURL}/communities/${communityId}/task-items`)
      dispatch(getCommunityTaskItems(taskItems.data))
    }
    catch (err) {
      console.log(err)
    }
  }
}

//reducer
export default (prevState = [], action) => {
  switch (action.type) {
    case GET_COMMUNITY_TASK_ITEMS:
      return action.taskItems
    default: return prevState
  }
}
