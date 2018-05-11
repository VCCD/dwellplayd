import axios from 'axios'
import CONFIG from '../api-routes'
const apiURL = CONFIG.API_URL



const SEND_PUSH_NOTIFICATIONS = 'SEND_PUSH_NOTIFICATIONS'

export const pushNotifications = (pushObj) => ({type: SEND_PUSH_NOTIFICATIONS, pushObj})

export const sendPushNotifications = (pushObj) => dispatch => {
  axios.
  post(`${apiURL}/push`)
    .then(res => {
      dispatch(pushNotifications(pushObj))})
    .catch(err => console.log(err))
}