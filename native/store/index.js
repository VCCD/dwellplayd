import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './auth'
import users from './users'
import community from './community'
import communityTasks from './community-tasks'
import taskItems from './task-items'
import userScores from './scores'
import pastWinners from './past-winners'
import isNewUser from './is-new-user'


const reducer = combineReducers({
  user,
  users,
  community,
  communityTasks,
  taskItems,
  userScores,
  pastWinners,
  isNewUser,
})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))
const store = createStore(reducer, middleware)

export default store
export * from './auth'
export * from './users'
export * from './community'
export * from './community-tasks'
export * from './task-items'
export * from './scores'
export * from './push'
export * from './past-winners'
export * from './is-new-user'
