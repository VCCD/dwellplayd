const Sequelize = require('sequelize')
const db = require('../db')

const TaskItem = db.define('taskItem', {
  completed: {
    type: Sequelize.DATE,
  },
  completedById: {
    type: Sequelize.INTEGER,
  },
  pointsAwarded: {
    type: Sequelize.INTEGER,
    get: function () {
      return this.getDataValue('price') / 10;
    },
    set: function (price) {
      this.setDataValue('price', price * 10);
    },
  },
})

module.exports = TaskItem
