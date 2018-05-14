
import { updateUser } from '../store'


const USER_HAS_SEEN_TUTORIAL = 'USER_HAS_SEEN_TUTORIAL'
const RESET_USER_HAS_SEEN_TUTORIALS = 'RESET_USER_HAS_SEEN_TUTORIALS'

//action creators

export const resetUserHasSeenTutorials = () => ({
  type: RESET_USER_HAS_SEEN_TUTORIALS
})

export const userHasSeenTutorial = (user, tutorial) => ({
  type: USER_HAS_SEEN_TUTORIAL,
  user,
  tutorial,
})

export const userHasSeenAllTutorialsThunkerator = (user) => dispatch => {
  try {
    console.log('thunk', user)
    user.hasSeenTutorials = true
    console.log('thunkafter', user)
    dispatch(updateUser(user.id, user))
  }
  catch (err) {
    console.log(err)
  }
}

//reducer
export default (prevState = false, action) => {
  switch (action.type) {
    case RESET_USER_HAS_SEEN_TUTORIALS:
      return false
    case USER_HAS_SEEN_TUTORIAL:
      return true
    default: return prevState
  }
}
