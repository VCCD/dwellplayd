import axios from 'axios'
import CONFIG from '../api-routes'

const apiURL = CONFIG.API_URL

const EDIT_TASK_ITEM = 'EDIT_TASK_ITEM'
const GET_ALL_COMMUNITY_TASKS = 'GET_ALL_COMMUNITY_TASKS'
const CLEAR_COMMUNITY_TASKS = 'CLEAR_COMMUNITY_TASKS'

//action creators

export const addCommunityTask = (task) => ({
  type: ADD_COMMUNITY_TASK,
  task,
})

export const removeCommunityTask = (task) => ({
  type: REMOVE_COMMUNITY_TASK,
  task,
})

export const editCommunityTask = (task) => ({
  type: EDIT_TASK_ITEM,
  task,
})

export const getAllCommunityTasks = (tasks) => ({
  type: GET_ALL_COMMUNITY_TASKS,
  tasks
})

export const clearCommunityTasks = () => ({
  type: CLEAR_COMMUNITY_TASKS,
})

//thunks

export const getAllTaskItemsFromServerThunkerator = (communityId) => {
  return async (dispatch) => {
    try {
      const tasks = await axios.get(`${apiURL}/community-tasks/${communityId}`)
      dispatch(getAllCommunityTasks(tasks.data))
    }
    catch (err) {
      console.log(err)
    }
  }
}

//reducer
export default (prevState = [], action) => {
  switch (action.type) {
    case ADD_COMMUNITY_TASK:
      return [...prevState, action.task]
    case REMOVE_COMMUNITY_TASK:
    return prevState.filter(task => task.id !== action.task.id)
    case EDIT_TASK_ITEM:
        return prevState.map(task => {
          if (task.id === action.task.id) return action.task
          else return task
        })
    case GET_ALL_COMMUNITY_TASKS:
      return action.tasks
    case CLEAR_COMMUNITY_TASKS:
      return []
    default: return prevState
  }
}
