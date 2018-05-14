const Sequelize = require('sequelize')
const db = require('../db')

const roundToTenths = num => {
  return Math.round(num * 10) / 10
}

const calcPoints = (days, value) => {
  const points = (days / value) * 100
  return roundToTenths(points)
}

const calcDays = (endDate, startDate) => {
  const days = (endDate - startDate) / 86400000
  return roundToTenths(days)
}

const now = new Date()

const TaskItem = db.define('taskItem', {
  completed: {
    type: Sequelize.DATE,
  },
  value: {
    type: Sequelize.INTEGER,
  },
  days: {
    type: Sequelize.VIRTUAL,
    get: function () {
      const created = this.getDataValue(`createdAt`)
      const completed = this.getDataValue(`completed`)
      const days = completed ? calcDays(completed, created) : calcDays(now - created)
      return days
    }
  },
  points: {
    type: Sequelize.VIRTUAL,
    get: function () {
      const created = this.getDataValue(`createdAt`)
      const completed = this.getDataValue(`completed`)
      const value = this.getDataValue(`value`)
      const days = completed ? calcDays(completed, created) : calcDays(now - created)
      return calcPoints(days, value)
    }
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Power_Clean_Ico.png'
  },
})

module.exports = TaskItem
