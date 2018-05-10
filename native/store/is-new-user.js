import axios from 'axios'

const SET_TO_NEW_USER = 'SET_TO_NEW_USER'
const SET_TO_NOT_NEW_USER = 'SET_TO_NOT_NEW_USER'

//action creators

export const setToNewUser = () => ({
  type: SET_TO_NEW_USER
})
export const setToNotNewUser = () => ({
  type: SET_TO_NOT_NEW_USER,
})

//reducer
export default (prevState = false, action) => {
  switch (action.type) {
    case SET_TO_NEW_USER:
      return true
    case SET_TO_NOT_NEW_USER:
      return false
    default: return prevState
  }
}
