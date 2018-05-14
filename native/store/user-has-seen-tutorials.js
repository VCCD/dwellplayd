import axios from 'axios'
import CONFIG from '../api-routes'
import store, { updateUser } from '../store'

const apiURL = CONFIG.apiURL

const USER_HAS_SEEN_ALL_TUTORIALS = 'USER_HAS_SEEN_ALL_TUTORIALS'
const USER_HAS_SEEN_TUTORIAL = 'USER_HAS_SEEN_TUTORIAL'
const RESET_USER_HAS_SEEN_TUTORIALS = 'RESET_USER_HAS_SEEN_TUTORIALS'

//action creators
const initialState = {
  selectTasks: false,
  currentTasks: false,
}

const userSeenAllState = {
  selectTasks: true,
  currentTasks: true,
}

export const userHasSeenAllTutorials = () => ({
  type: USER_HAS_SEEN_ALL_TUTORIALS
})

export const resetUserHasSeenTutorials = () => ({
  type: RESET_USER_HAS_SEEN_TUTORIALS
})

export const userHasSeenTutorial = (user, tutorial) => ({
  type: USER_HAS_SEEN_TUTORIAL,
  user,
  tutorial,
})

export const userHasSeenAllTutorialsThunkerator = (user) => async dispatch => {
  try {
    user.hasSeenTutorials = true
    dispatch(updateUser(user.id, user))
  }
  catch (err) {
    console.log(err)
  }
}

//reducer
export default (prevState = initialState, action) => {
  const checkAllTutorials = () => {
    const updatedState = {...prevState, [action.tutorial]: true}
    const updatedStateValues = Object.values(updatedState)
    const isTrue = (element) => {
      return element
    }
    const check = updatedStateValues.every(isTrue)
    return check
  }

  switch (action.type) {
    case USER_HAS_SEEN_ALL_TUTORIALS:
      return userSeenAllState
    case RESET_USER_HAS_SEEN_TUTORIALS:
      return initialState
    case USER_HAS_SEEN_TUTORIAL:
      if (checkAllTutorials()) {
        store.dispatch(userHasSeenAllTutorialsThunkerator(action.user))
      }
      return {...prevState, [action.tutorial]: true}
    default: return prevState
  }
}
