
const router = require('express').Router()
const { User, Community, TaskItem, Task } = require('../db/models')
module.exports = router

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
  // console.log(messages)
  const res = await axios.post(`https://exp.host/--/api/v2/push/send`,
    [
      // {
      //   "to": "ExponentPushToken[rL6zOCOO_WcbhzsDaK2jQA]",
      //   "sound": "default",
      //   "body": "test"
      // },
      {
        "to": "ExponentPushToken[K9C1u6HwmglBjUVAhX1kwJ]",
        "sound": "default",
        "body": "test"
      },
      {
        "to": "ExponentPushToken[rL6zOCOO_WcbhzsDaK2jQA]",
        "sound": "default",
        "body": "test"
      },
    ],
    {
      headers: {
        accept: 'application/json',
        'accept-encoding': 'gzip, deflate',
        'content-type': 'application/json',
      }
    },
  )
  console.log(res.data)
}

// router.post(`/`, async (req, res, next) => {
//   try {
//     const notification = await push(req.body)
//     res.json(notification)
//   }
//   catch (err) {
//     next(err)
//   }
// })

const test = { id: 24 }
push(test)
