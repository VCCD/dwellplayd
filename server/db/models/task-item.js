const Sequelize = require('sequelize')
const db = require('../db')

const TaskItem = db.define('taskItem', {
  completed: {
    type: Sequelize.DATE,
  },
  completedById: {
    type: Sequelize.INTEGER,
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
      if (completed) return (completed - created) / 86400000
      else return (now - created) / 86400000
    }
  },
  points: {
    type: Sequelize.VIRTUAL,
    get: function () {
      const now = new Date()
      const created = this.getDataValue(`createdAt`)
      const completed = this.getDataValue(`completed`)
      const value = this.getDataValue(`value`)
      const days = completed ? completed - created : now - created
      return days / (value * 864000)
    }
  },
})

module.exports = TaskItem
