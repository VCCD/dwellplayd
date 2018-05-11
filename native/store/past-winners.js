import axios from 'axios'

import CONFIG from '../api-routes'
const apiURL = CONFIG.API_URL

const defaultPastWinners = []

/*--------actions-------*/

const GET_PAST_WINNERS = 'GET_PAST_WINNERS'
const CLEAR_PAST_WINNERS = 'CLEAR_PAST_WINNERS'

/*--------action creators-------*/

const getPastWinners = users => ({ type: GET_PAST_WINNERS, users })
export const clearPastWinners = () => ({ type: CLEAR_PAST_WINNERS })

/*--------thunk creators-------*/

export const fetchPastWinners = communityId => dispatch => {
  const thisMonth = new Date().getMonth()
  const months = []
  for (let i = 11; i > 0; i--) {
    months.push((thisMonth + i) % 12)
  }
  const monthRequests = months.map(month => {
    return axios.
      get(`${apiURL}/communities/${communityId}/scores/${month}`)
  })
  Promise.all(monthRequests)
    .then(months => {
      const monthlyUsers = months.map(month => month.data)
      const sortedMonthlyUsers = monthlyUsers.map(month => month.sort((a, b) => b.score - a.score))
      const monthlyWinners = sortedMonthlyUsers.map(users => users[0])
      const monthlyWinnersWithMonths = monthlyWinners.map((winner, idx) => winner.month = thisMonth - (idx + 1))
      const filteredMonthlyWinners = monthlyWinners.filter(winner => winner.score > 0)
      dispatch(getPastWinners(filteredMonthlyWinners || defaultPastWinners))
    })
    .catch(err => console.log(err))
}

/*--------reducer-------*/

export default function (state = defaultPastWinners, action) {
  switch (action.type) {
    case GET_PAST_WINNERS:
      return action.users;
    case CLEAR_PAST_WINNERS:
      return []
    default:
      return state;
  }
}
