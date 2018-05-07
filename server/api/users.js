const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'firstName', 'lastName', 'score']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.put('/:userId', (req, res, next) => {
  const { userId } = req.params
  const { firstName, lastName, email } = req.body
  User.findById(userId)
    .then(user => user.update({ firstName, lastName, email }))
    .then(user => res.json(user))
    .catch(next)
})
