const Sequelize = require('sequelize')
const db = require('../db')

const TaskItem = db.define('taskItem', {
  completed: {
    type: Sequelize.DATE,
  }
})

module.exports = TaskItem
