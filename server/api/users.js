const router = require('express').Router()
const { User, TaskItem } = require('../db/models')
module.exports = router

router.param('userId', async (req, res, next, userId) => {
  try {
    req.user = await User.findById(userId, {
      include: [TaskItem]
    })
    next()
  }
  catch (err) {
    next(err)
  }
})

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'firstName', 'lastName'],
    include: [TaskItem]
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
  res.json(req.user)
})

router.put('/:userId', async (req, res, next) => {
  try {
    console.log('req.body',req.body)
    const { firstName, lastName, email, communityId, imgUrl, pushToken, hasSeenTutorials} = req.body
    const updatedUser = await req.user.update({ firstName, lastName, email, communityId, imgUrl, pushToken, hasSeenTutorials})
    console.log('updated user', updatedUser)
    res.json(updatedUser)
  }
  catch (err) {
    next(err)
  }
})
