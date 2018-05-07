const router = require('express').Router()
const { Community, Task, CommunityTask, TaskItem } = require('../db/models')
module.exports = router

router.param('communityId', async (req, res, next, communityId) => {
  try {
    req.community = await Community.findById(communityId)
    next()
  }
  catch (err) {
    next(err)
  }
})

router.param('communityTaskId', async (req, res, next, communityTaskId) => {
  try {
    req.communityTask = await CommunityTask.findById(communityTaskId)
    next()
  }
  catch (err) {
    next(err)
  }
})

router.post('/:communityId', async (req, res, next) => {
  try {
    const taskIds = req.body
    await req.community.setTasks(taskIds)
    res.json(201)
  }
  catch (err) {
    next(err)
  }
})

router.put('/frequencies/:communityId', async (req, res, next) => {
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
