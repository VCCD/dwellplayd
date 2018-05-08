const router = require('express').Router()
const { Task, TaskItem } = require('../../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const communityTaskItems = await TaskItem.findAll({
      where: {
        communityId: req.community.id,
      },
      include: [Task]
    })
    res.json(communityTaskItems)
  }
  catch (err) {
    next(err)
  }
})
