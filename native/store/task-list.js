import axios from 'axios'
import CONFIG from '../api-routes'

const apiURL = CONFIG.API_URL

const ADD_TASK_FROM_SERVER = 'ADD_TASK_FROM_SERVER'
const REMOVE_TASK_FROM_SERVER = 'REMOVE_TASK_FROM_SERVER'
const GET_ALL_TASKS_FROM_SERVER = 'GET_ALL_TASKS_FROM_SERVER'

//action creators

export const addTaskFromServer = (task) => ({
  type: ADD_TASK_FROM_SERVER,
  task,
})

export const removeTaskFromServer = (task) => ({
  type: REMOVE_TASK_FROM_SERVER,
  task,
})

export const getAllTasksFromServer = (tasks) => ({
  type: GET_ALL_TASKS_FROM_SERVER,
  tasks
})

//thunks
export const getAllTasksFromServerThunkerator = (communityId) => {
  return async (dispatch) => {
    const tasks = await axios.get(`${apiURL}/tasks/community/${communityId}`)
    dispatch(getAllTasksFromServer(tasks.data))
  }
}

export const addTaskFromServerThunkerator = (task) => {
  return async (dispatch) => {
    const newTask = await axios.post(`${apiURL}/tasks`, task)
    dispatch(addTaskFromServer(newTask.data))
  }
}

//reducer
export default (prevState = [], action) => {
  switch (action.type) {
    case ADD_TASK_FROM_SERVER:
      return [...prevState, action.task]
    case REMOVE_TASK_FROM_SERVER:
      return prevState.filter(task => task.id !== action.task.id)
    case GET_ALL_TASKS_FROM_SERVER:
      return action.tasks
    default: return prevState
  }
}
