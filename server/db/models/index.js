const User = require('./user')
const Community = require('./community')
const TaskItem = require('./task-item')
const Task = require('./task')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Community.belongsToMany(User, {through: 'CommunityUser'})
User.belongsToMany(Community, {through: 'CommunityUser'})

TaskItem.belongsTo(Community)
Community.hasMany(TaskItem)

Task.hasMany(TaskItem)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Community,
  TaskItem,
  Task,
}
