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
    const { communityId } = req.body
    const { value } = await CommunityTask.findById(communityId)
    const taskItem = req.body
    taskItem.value = value
    await TaskItem.create(taskItem)
    res.send(`Created new taskItem`)
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
    await TaskItem.update(taskItem, {
      where: { id: taskItemId }
    })
    res.send(`${taskItem.id} updated`)
  }
  catch (err) {
    console.log(err)
  }
})