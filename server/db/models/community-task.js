const Sequelize = require('sequelize')
const db = require('../db')
const TaskItem = require('./task-item')

const CommunityTask = db.define('communityTask', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  value: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 15,
  },
})

module.exports = CommunityTask
