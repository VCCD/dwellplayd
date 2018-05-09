const router = require('express').Router()
const { CommunityTask, Task, TaskItem } = require('../../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const communityId = req.community.id
    console.log(communityId)
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


router.post('/', async (req, res, next) => {
  try {
    const taskIds = req.body
    console.log(req.community)
    await req.community.setTasks(taskIds)
    res.json(201)
  }
  catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
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
          communityId: req.community.id,
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