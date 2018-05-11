const Sequelize = require('sequelize')
const db = require('../db')

const calcPoints = (days, value) => {
  return (days / value) * 100
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
      const days = completed ? (completed - created) / 86400000 : (now - created) / 86400000
      return calcPoints(days, value)
    }
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Power_Clean_Ico.png'
  },
})

module.exports = TaskItem
