import axios from 'axios'
import CONFIG from '../api-routes'

const apiURL = CONFIG.API_URL

const ADD_TASK_FROM_SERVER = 'ADD_TASK_FROM_SERVER'
const REMOVE_TASK_FROM_SERVER = 'REMOVE_TASK_FROM_SERVER'
const GET_ALL_TASKS_FROM_SERVER = 'GET_ALL_TASKS_FROM_SERVER'
const CLEAR_TASKS = 'CLEAR_TASKS'

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

export const clearTasks = () => ({
  type: CLEAR_TASKS,
})

//thunks
export const getAllTasksFromServerThunkerator = () => {
  return async (dispatch) => {
    try {
      const tasks = await axios.get(`${apiURL}/tasks`)
      dispatch(getAllTasksFromServer(tasks.data))
    }
    catch (err) {
      console.log(err)
    }
  }
}

export const addTasksToCommunityThunkerator = (communityId, taskIds) => {
  return async (dispatch) => {
    try {
      await axios.post(`${apiURL}/community-tasks/${communityId}`, taskIds)
      dispatch(clearTasks())
    }
    catch (err) {
      console.log(err)
    }
  }
}

export const addTaskFromServerThunkerator = (task, addedFlag) => {
  return async (dispatch) => {
    try {
      const newTask = await axios.post(`${apiURL}/tasks`, task)
      //if this was added from the select-task cmoponent, we will add a 'selected prop
      //so that it shows up immediately checked
      if (addedFlag) {
        newTask.data.selected = true
      }
      dispatch(addTaskFromServer(newTask.data))
    }
    catch (err) {
      console.log(err)
    }
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
    case CLEAR_TASKS:
      return []
    default: return prevState
  }
}