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
