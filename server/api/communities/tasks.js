const router = require('express').Router()
const { CommunityTask, Task, TaskItem } = require('../../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const communityId = req.community.id
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
      CommunityTask.update(task, {
        where: {
          id: task.id,
        }
      })
    })
    await Promise.all(communityTaskPromises)
    res.json(201)
  }
  catch (err) {
    next(err)
  }
})
