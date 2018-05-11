const router = require('express').Router()
const { User, Community, TaskItem, Task } = require('../db/models')

const axios = require(`axios`)

const push = async taskItem => {
  const completedTask = await TaskItem.findById(taskItem.id,
    {
      include: [User, Task]
    })
  const community = await Community.findById(completedTask.communityId,
    {
      include: [User]
    })
  const message = `${completedTask.user.firstName} completed '${completedTask.task.name}' for ${completedTask.points} points!`
  const recipients = community.users.filter(user => user.id !== completedTask.userId).map(user => user.pushToken)
  const messages = recipients.map(recipient => {
    return {
      to: recipient,
      sound: 'default',
      body: message
    }
  })
  const res = await axios.post(`https://exp.host/--/api/v2/push/send`,
    messages,
    {
      headers: {
        accept: 'application/json',
        'accept-encoding': 'gzip, deflate',
        'content-type': 'application/json',
      }
    },
  )
  res.json(res.data)
}

router.post(`/`, async (req, res, next) => {
  const taskItem = req.body
  try {
    const notification = await push(taskItem)
    res.json(notification)
  }
  catch (err) {
    next(err)
  }
})

module.exports = router
