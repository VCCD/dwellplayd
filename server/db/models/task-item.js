const Sequelize = require('sequelize')
const db = require('../db')

const roundToTenths = num => {
  return Math.round(num * 10) / 10
}

const calcPoints = (days, value) => {
  const points = (days / value) * 100
  return roundToTenths(points)
}

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
      const now = new Date()
      const created = this.getDataValue(`createdAt`)
      const completed = this.getDataValue(`completed`)
      const days = completed ? (completed - created) / 86400000 : (now - created) / 86400000
      return roundToTenths(days)
    }
  },
  points: {
    type: Sequelize.VIRTUAL,
    get: function () {
      const now = new Date()
      const created = this.getDataValue(`createdAt`)
      const completed = this.getDataValue(`completed`)
      const value = this.getDataValue(`value`)
      const days = completed ? (completed - created) / 86400000 : (now - created) / 86400000
      return calcPoints(days, value)
    }
  },
})

module.exports = TaskItem
