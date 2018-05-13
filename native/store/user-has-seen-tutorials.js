import axios from 'axios'
import CONFIG from '../api-routes'

const apiURL = CONFIG.apiURL

const USER_HAS_SEEN_ALL_TUTORIALS = 'USER_HAS_SEEN_ALL_TUTORIALS'
const USER_HAS_SEEN_TUTORIAL = 'USER_HAS_SEEN_TUTORIAL'

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
    console.log('check', check)
    if (check) userHasSeenAllTutorialsThunkerator({...action.user, hasSeenTutorials: true})
  }

  if (action.user) checkAllTutorials()

  switch (action.type) {
    case USER_HAS_SEEN_ALL_TUTORIALS:
      return userSeenAllState
    case USER_HAS_SEEN_TUTORIAL:
      return {...prevState, [action.tutorial]: true}
    default: return prevState
  }
}
