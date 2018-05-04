const router = require('express').Router()
const { Task, TaskItem } = require('../db/models')
module.exports = router

router.get('/community/:communityId', async (req, res, next) => {
  try {
    const communityId = req.params.communityId
    const tasks = await TaskItem.findAll({
      where: {
        communityId: communityId,
      },
      include: [Task],
    })
    res.json(tasks)
  }
  catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const task = req.body
    const createdTask = await TaskItem.create(task)
    res.json(createdTask)
  }
  catch (err) {
    next(err)
  }
})
