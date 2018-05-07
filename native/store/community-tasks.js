import axios from 'axios'
import CONFIG from '../api-routes'

const apiURL = CONFIG.API_URL

const ADD_COMMUNITY_TASK = 'ADD_COMMUNITY_TASK'
const REMOVE_COMMUNITY_TASK = 'REMOVE_COMMUNITY_TASK'
const EDIT_COMMUNITY_TASK = 'EDIT_COMMUNITY_TASK'
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
  type: EDIT_COMMUNITY_TASK,
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
export const getAllCommunityTasksFromServerThunkerator = (communityId) => {
  return async (dispatch) => {
    try {
      if (!communityId) communityId = 1
      const tasks = await axios.get(`${apiURL}/community/${communityId}/tasks`)
      dispatch(getAllCommunityTasks(tasks.data))
    }
    catch (err) {
      console.log(err)
    }
  }
}

export const addCommunityTasksThunkerator = (communityId, taskIds) => {
  return async (dispatch) => {
    try {
      await axios.post(`${apiURL}/community-tasks/${communityId}`, taskIds)
      dispatch(clearCommunityTasks())
    }
    catch (err) {
      console.log(err)
    }
  }
}

export const submitCommunityTaskFrequenciesThunkerator = (communityId, tasks) => {
  return async (dispatch) => {
    try {
      await axios.put(`${apiURL}/community-tasks/frequencies/${communityId}`, tasks)
      dispatch(clearCommunityTasks())
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
    case EDIT_COMMUNITY_TASK:
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
