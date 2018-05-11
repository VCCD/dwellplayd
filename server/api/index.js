const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/communities', require('./communities'))
router.use('/tasks', require('./tasks'))
router.use('/task-items', require('./task-items'))
router.use('/cloud', require('./cloud'))
router.use('/push', require('./push'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
