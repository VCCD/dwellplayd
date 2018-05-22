const router = require('express').Router()
const { Community, User, TaskItem } = require('../../db/models')
const sendEmail = require('../../mailer')
module.exports = router

router.get(`/`, async (req, res, next) => {
  try {
    const communities = await Community.findAll()
    res.send(communities)
  }
  catch (err) {
    next(err)
  }
})

router.param('communityId', async (req, res, next, communityId) => {
  try {
    req.community = await Community.findById(communityId, {
      include: [User, TaskItem]
    })
    next()
  }
  catch (err) {
    next(err)
  }
})

router.use('/:communityId/tasks', require('./tasks'))
router.use('/:communityId/users', require('./users'))
router.use('/:communityId/task-items', require('./task-items'))


router.get('/:communityId', (req, res, next) => {
  res.json(req.community)
})

router.post('/', async (req, res, next) => {
  try {
    const name = req.body.name
    const newCommunity = await Community.create({ name })
    res.json(newCommunity)
  }
  catch (err) {
    next(err)
  }
})

router.post('/:communityId/inviteUsers', (req, res, next) => {
  const user = req.body.user
  const emails = req.body.emails
  emails.forEach(email => {
    sendEmail(email, user, req.community, 'invite')
  })
})

const score = (userId, taskItems, month) => {
  const roundToTenths = num => {
    return Math.round(num * 10) / 10
  }
  let totalScore = 0;
  const completedTaskItems = taskItems.filter(taskItem => taskItem.completed)
  completedTaskItems.forEach(taskItem => {
    const monthCompleted = taskItem.completed.getMonth()
    if (taskItem.userId === userId && month === monthCompleted) {
      totalScore += taskItem.points
    }
  })
  return roundToTenths(totalScore)
}

router.get(`/:communityId/scores/:month`, (req, res, next) => {
  const month = +req.params.month
  const { taskItems, users } = req.community
  const usersWithScores = users.map(user => {
    user.dataValues.score = score(user.id, taskItems, month)
    return user
  })
  res.json(usersWithScores)
})

