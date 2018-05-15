
const router = require('express').Router()
const { Task, TaskItem } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.query.popular) {
      const popularTasks = await Task.findAll({
        order: [['count', 'DESC']],
        limit: req.query.popular,
      })
      res.json(popularTasks)
    }
    else {
      const tasks = await Task.findAll()
      res.json(tasks)
    }
  }
  catch (err) {
    next(err)
  }
})


router.post('/', async (req, res, next) => {
  try {
    // make the first letter lowercase for the DB search
    const name = req.body.name[0].toLowerCase() + req.body.name.slice(1)
    // find or create a task with the name
    const createdTask = await Task.findOrCreate({
      where: {
        name: name
      }
    })
    // if we are creating it, send that back
    if (createdTask[1]){
      res.json(createdTask[0])
    }
    // else increment the count of the one you found and send it
    else {
      await createdTask[0].increment('count')
      res.json(createdTask[0])
    }
  }
  catch (err) {
    next(err)
  }
})
