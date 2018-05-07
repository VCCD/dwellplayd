const router = require('express').Router()
const { Task, TaskItem } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.findAll()
    res.json(tasks)
  }
  catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const task = req.body
    const createdTask = await Task.create(task)
    res.json(createdTask)
  }
  catch (err) {
    next(err)
  }
})
