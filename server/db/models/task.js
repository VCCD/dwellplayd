const Sequelize = require('sequelize')
const db = require('../db')

const Task = db.define('task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    get () {
      const name = this.getDataValue('name')
      return name[0].toUpperCase() + name.slice(1)
    }
  },
  count: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  }
})

module.exports = Task
