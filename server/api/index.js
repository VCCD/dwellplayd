const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/communities', require('./communities'))
router.use('/tasks', require('./tasks'))
router.use('/community-tasks', require('./community-tasks'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
