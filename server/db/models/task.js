const Sequelize = require('sequelize')
const db = require('../db')

const Task = db.define('task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  }
})

module.exports = Task
