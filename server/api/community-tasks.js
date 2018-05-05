const router = require('express').Router()
const { Community, Task } = require('../db/models')
module.exports = router

router.get('/:communityId', async (req, res, next) => {
  try {
    const community = await Community.findById(req.params.communityId)
    const tasks = await community.getTasks()
    res.json(tasks)
  }
  catch (err) {
    console.log(err)
  }
})

router.post('/:communityId', async (req, res, next) => {
  try {
    const taskIds = req.body
    const communityId = req.params.communityId
    const community = await Community.findById(communityId)
    await community.setTasks(taskIds)
    res.json(201)
  }
  catch (err) {
    next(err)
  }
})
