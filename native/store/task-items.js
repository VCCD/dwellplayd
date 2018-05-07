import axios from 'axios'
import CONFIG from '../api-routes'

const apiURL = CONFIG.API_URL

const SELECT_TASK_COMPLETE = 'SELECT_TASK_COMPLETE'
const GET_ALL_INCOMEPLETE_COMMUNITY_TASKS = 'GET_ALL_INCOMEPLETE_COMMUNITY_TASKS'

//action creators


export const selectTaskComplete = (task) => ({
  type: EDIT_TASK_ITEM,
  task,
})

export const getAllIncompleteCommunityTasks = (tasks) => ({
  type: GET_ALL_INCOMEPLETE_COMMUNITY_TASKS,
  tasks
})



//thunks

export const getAllTaskItemsFromServerThunkerator = (communityId) => {
  return async (dispatch) => {
    try {
      const tasks = await axios.get(`${apiURL}/community-tasks/${communityId}`)
      dispatch(getAllIncompleteCommunityTasks(tasks.data))
    }
    catch (err) {
      console.log(err)
    }
  }
}

//reducer
export default (prevState = [], action) => {
  switch (action.type) {
    case SELECT_TASK_COMPLETE:
        return prevState.map(task => {
          if (task.id === action.task.id) return action.task
          else return task
        })
    case GET_ALL_INCOMEPLETE_COMMUNITY_TASKS:
      return action.tasks
   
    default: return prevState
  }
}
