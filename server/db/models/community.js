const Sequelize = require('sequelize')
const db = require('../db')

const Community = db.define('community', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
})

module.exports = Community
