const router = require('express').Router()
const { User } = require('../../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const communityUsers = await User.findAll({
      where: {
        communityId: req.community.id,
      }
    })
    res.json(communityUsers)
  }
  catch (err) {
    next(err)
  }
})
