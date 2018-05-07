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

router.get('/:communityId', async (req, res, next) => {
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
