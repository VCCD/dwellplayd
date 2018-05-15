const router = require('express').Router()
const { TaskItem, Task, CommunityTask } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const tasks = await TaskItem.findAll()
    res.json(tasks)
  }
  catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { communityId, taskId } = req.body
    const existingCommTask = await CommunityTask.findOne({
      where: { taskId, communityId }
    })
    if (existingCommTask) {
      const taskItem = req.body
      taskItem.value = existingCommTask.value
      await TaskItem.create(taskItem)
      res.status(201).send(`TaskItem created`)
    }
    else {
      res.status(200).send(`No existing community task`)
    }
  }
  catch (err) {
    next(err)
  }
})

router.get('/:taskItemId', async (req, res, next) => {
  try {
    const { taskItemId } = req.params
    const taskItem = await TaskItem.findById(taskItemId)
    res.json(taskItem)
  }
  catch (err) {
    console.log(err)
  }
})

router.put('/:taskItemId', async (req, res, next) => {
  try {
    const { taskItemId } = req.params
    const taskItem = req.body
    taskItem.completed = new Date()
    const updatedTaskItem = await TaskItem.update(taskItem, {
      where: { id: taskItemId },
      returning: true,
    })
    res.json(updatedTaskItem[1])
  }
  catch (err) {
    console.log(err)
  }
})