import axios from 'axios'
import CONFIG from '../api-routes'
const apiURL = CONFIG.API_URL



const SEND_PUSH_NOTIFICATIONS = 'SEND_PUSH_NOTIFICATIONS'

export const pushNotifications = () => ({type: SEND_PUSH_NOTIFICATIONS})

export const sendPushNotifications = () => dispatch => {
  axios.
  post(`${apiURL}/push`)
    .then(res => {
      dispatch(pushNotifications())})
    .catch(err => console.log(err))
}