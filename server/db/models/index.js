const User = require('./user')
const Community = require('./community')
const TaskItem = require('./task-item')
const Task = require('./task')
const CommunityTask = require('./community-task')

Community.belongsToMany(Task, {through: CommunityTask})
Task.belongsToMany(Community, {through: CommunityTask})

Community.hasMany(User)
User.belongsTo(Community)

TaskItem.belongsTo(Community)
Community.hasMany(TaskItem)

Task.hasMany(TaskItem)
TaskItem.belongsTo(Task)


module.exports = {
  User,
  Community,
  TaskItem,
  Task,
  CommunityTask,
}
