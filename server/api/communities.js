const router = require('express').Router()
const { Community, User, CommunityTask, Task, TaskItem } = require('../db/models')
const sendEmail = require('../mailer')
module.exports = router

//mailer takes --> email, user, community, status

router.param('communityId', async (req, res, next, communityId) => {
  try {
    req.community = await Community.findById(communityId, {
      include: [User, TaskItem]
    })
    next()
  }
  catch (err) {
    next(err)
  }
})

router.get('/:communityId/tasks', async (req, res, next) => {
  try {
    const communityId = req.params.communityId
    const communityTasks = await CommunityTask.findAll({
      where: {
        communityId
      },
      include: [Task],
    })
    res.json(communityTasks)
  }
  catch (err) {
    console.log(err)
  }
})

router.get('/:communityId', (req, res, next) => {
  res.json(req.community)
})

router.post('/:communityId/inviteUsers', (req, res, next) => {
  try {
    const user = req.body.user
    const emails = req.body.emails
    emails.forEach(email => {
      sendEmail(email, user, req.community, 'invite')
    })
  }
  catch (err) {
    next(err)
  }
})


router.put('/:communityId/tasks', async (req, res, next) => {
  try {
    const tasks = req.body
    
    const communityTaskPromises = tasks.map(task => {
      CommunityTask.update({
        value: task.value
      }, {
        where: {
          id: task.id,
        }
      })
    })
    const taskItemPromises = tasks.map(task => {
      TaskItem.findOrCreate({
        where: {
          taskId: task.taskId,
          communityId: req.params.communityId,
          completed: null,
        }
      })
    })
    await Promise.all(communityTaskPromises)
    await Promise.all(taskItemPromises)
    res.json(201)
  }
  catch (err) {
    next(err)
  }
})
