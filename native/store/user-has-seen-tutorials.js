import axios from 'axios'
import CONFIG from '../api-routes'
import store from '../store'

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

const userHasSeenAllTutorialsThunkerator = (user) => async dispatch => {
  try {
    await axios.put(`${apiURL}/users/${user.id}`, user)
    dispatch(userHasSeenAllTutorials())
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
    console.log('vlaues', updatedStateValues)
    const isTrue = (element) => {
      return element
    }
    const check = updatedStateValues.every(isTrue)
    console.log('check', action.user)
    action.user.hasSeenTutorials = true
    if (check) store.dispatch(userHasSeenAllTutorialsThunkerator(action.user))
  }

  if (action.user) checkAllTutorials()

  switch (action.type) {
    case USER_HAS_SEEN_ALL_TUTORIALS:
      return userSeenAllState
    case RESET_USER_HAS_SEEN_TUTORIALS:
      return initialState
    case USER_HAS_SEEN_TUTORIAL:
      return {...prevState, [action.tutorial]: true}
    default: return prevState
  }
}
